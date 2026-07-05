require("dotenv").config();

let initDB = null;

if (process.env.DISABLE_DB !== "true") {
    initDB = require("./database");
}
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const app = express();
const upload = multer({
    storage: multer.memoryStorage()
});
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const crypto = require("crypto");
const chatRouter = require("./routers/chat");
const conversationsRouter =
    require("./routers/conversations");

ffmpeg.setFfmpegPath(ffmpegPath);

let db;
let server;

app.use(cors());
app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use("/chat", chatRouter);
app.use(
    "/conversations",
    conversationsRouter
);

// Test server
app.get("/", (req, res) => {
    res.send("Backend hoạt động!");
});

// Đăng ký
app.post("/register", async (req, res) => {

    const { fullName, email, phone, password } = req.body;

    try {

        const exist = await db.get(
            "SELECT * FROM users WHERE email = ? OR phone = ?",
            [email, phone]
        );

        if (exist) {
            return res.json({
                success: false,
                message: "Email hoặc số điện thoại đã được đăng ký."
            });
        }

        await db.run(
            "INSERT INTO users(fullName, email, phone, password) VALUES (?, ?, ?, ?)",
            [fullName, email, phone, password]
        );

        res.json({
            success: true,
            message: "Đăng ký thành công!"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Lỗi server."
        });

    }

});

// Đăng nhập
app.post("/login", async (req, res) => {

    const { account, password } = req.body;

    try {

        const user = await db.get(
            `SELECT * FROM users
             WHERE (email = ? OR phone = ?)
             AND password = ?`,
            [account, account, password]
        );

        if (!user) {
            return res.json({
                success: false,
                message: "Sai tài khoản hoặc mật khẩu."
            });
        }

        res.json({
            success: true,
            message: "Đăng nhập thành công!",
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Lỗi server."
        });

    }

});


//Speech to text
app.post("/speech-to-text", upload.single("audioFile"), async (req, res) => {

    let webmPath = "";
    let wavPath = "";

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Chưa có file audio."
            });
        }

        const sessionId = crypto.randomUUID();

        console.log("===== STT REQUEST =====");
        console.log("Session:", sessionId);
        console.log("Tên file:", req.file.originalname);
        console.log("Mime:", req.file.mimetype);
        console.log("Kích thước:", req.file.size);

        // Đường dẫn file tạm
        webmPath = path.join(os.tmpdir(), `${sessionId}.webm`);
        wavPath = path.join(
            os.tmpdir(),
            `${sessionId}.wav`
        );

        // Lưu file webm
        fs.writeFileSync(webmPath, req.file.buffer);

        console.log("Đã lưu:", webmPath);

        // Convert webm -> wav
        await new Promise((resolve, reject) => {

            ffmpeg(webmPath)
                .noVideo()
                .audioCodec("pcm_s16le")
                .audioFrequency(16000)
                .audioChannels(1)
                .audioFilters([
                    "highpass=f=80",
                    "lowpass=f=7600",
                    "loudnorm"
                ])
                .format("wav")
                .on("end", () => {

                    console.log("Convert WAV thành công");
                    resolve();

                })
                .on("error", (err) => {

                    console.error("FFmpeg Error:", err);
                    reject(err);

                })
                .save(wavPath);

        });

        // Đọc file wav
        const wavBuffer = fs.readFileSync(wavPath);

        console.log("Kích thước WAV:", wavBuffer.length);
        const duration = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(wavPath, (err, metadata) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(metadata.format.duration);
            });
        });
        console.log("⏱️ THỜI LƯỢNG WAV:", duration, "giây");

        const form = new FormData();

        form.append("audioFile", wavBuffer, {
            filename: "voice.wav",
            contentType: "audio/wav"
        });

        form.append("clientSession", sessionId);
        form.append("maxAlternatives", "1");
        form.append("audioChannelCount", "1");
        form.append("enableAutomaticPunctuation", "true");
        form.append("enableSeparateRecognitionPerChannel", "false");
        form.append("model", "offline");
        form.append("verbatimTranscripts", "true");

       //form.append(
            //"customConfiguration",
            //JSON.stringify({
               // invert_text: "1",
               // capt_punch_recovery: "1"
            //})
        //);

        const result = await axios.post(
            process.env.STT_URL,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Token-id": process.env.TOKEN_ID,
                    "Token-key": process.env.TOKEN_KEY
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            }
        );

        console.log("===== SMARTVOICE RESPONSE =====");
        const util = require("util");
        console.log(
            util.inspect(result.data, {
                depth: null,
                colors: true
            })
        );

        // Lấy TẤT CẢ các đoạn transcript SmartVoice trả về
        const results = result.data?.object?.results || [];

        const transcript = results
            .map(item => {
                return item?.alternatives?.[0]?.transcript || "";
            })
            .filter(text => text.trim() !== "")
            .join(" ")
            .trim();

        console.log("===== FULL TRANSCRIPT =====");
        console.log(transcript);

        if (!transcript) {
            console.log("VNPT không trả transcript:");
            console.log(JSON.stringify(result.data, null, 2));

            return res.json({
                success: false,
                message: "VNPT không trả transcript",
                raw: result.data
            });
        }

        return res.json({
            success: true,
            text: transcript
        });

    } catch (err) {

        console.error("===== SMARTVOICE ERROR =====");

        console.error("Status:");
        console.error(err.response?.status);

        console.error("Headers:");
        console.error(err.response?.headers);

        console.error("Data:");
        console.error(err.response?.data);

        console.error("Message:");
        console.error(err.message);

        res.status(500).json({
            success: false,
            message: "Không gọi được SmartVoice STT"
        });

    } finally {

        try {
            if (webmPath && fs.existsSync(webmPath)) {
                fs.unlinkSync(webmPath);
            }

            if (wavPath && fs.existsSync(wavPath)) {
                fs.unlinkSync(wavPath);
            }
        } catch (e) {
            console.log("Không xóa được file tạm:", e.message);
        }

    }

});

// Text To Speech
app.post("/text-to-speech", async (req, res) => {

    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({
            success: false,
            message: "Thiếu nội dung cần đọc."
        });
    }

    try {

        console.log("===== TTS REQUEST =====");
        console.log("Text:", text);

        const result = await axios.post(
            process.env.TTS_URL,
            {
                text: text,
                model: "news",
                region: "female_north",
                speed: "1",
                domain: "general"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Token-id": process.env.TOKEN_ID,
                    "Token-key": process.env.TOKEN_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("===== TTS RESPONSE =====");
        console.log(JSON.stringify(result.data, null, 2));

        const audioUrl =
            result.data?.object?.playlist?.[0]?.audio_link;

        if (!audioUrl) {
            return res.status(500).json({
                success: false,
                message: "SmartVoice không trả về audio.",
                raw: result.data
            });
        }

        return res.json({
            success: true,
            audioUrl: audioUrl
        });

    } catch (err) {

        console.error("===== TTS ERROR =====");
        console.error("Status:", err.response?.status);
        console.error("Data:", err.response?.data);
        console.error("Message:", err.message);

        return res.status(500).json({
            success: false,
            message: "Không gọi được SmartVoice TTS."
        });
    }

});

app.get("/users", async (req, res) => {

    const users = await db.all("SELECT * FROM users");

    res.json(users);

});

async function startServer() {
    try {
        if (process.env.DISABLE_DB !== "true") {
            db = await initDB();
            app.locals.db = db;

            console.log("Database đã sẵn sàng cho routes.");
        } else {
            console.log("SQLite đang tạm tắt trên môi trường deploy.");
        }

        const PORT = process.env.PORT || 3000;

        server = app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server đang chạy tại port ${PORT}`);
        });

        server.on("error", (err) => {
            console.error("SERVER ERROR:", err);
        });

        server.on("close", () => {
            console.log("Server đã đóng!");
        });

    } catch (error) {
        console.error("Không thể khởi động server:", error);
    }
}

startServer();


process.on("exit", (code) => {
    console.log("Node thoát với mã:", code);
});

process.on("SIGINT", () => {
    console.log("Đã nhấn Ctrl + C");
    process.exit();
});

process.on("uncaughtException", (err) => {
    console.error("Lỗi:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("Promise lỗi:", err);
});