require("dotenv").config();

const initDB = require("./database");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const app = express();
const upload = multer({
    storage: multer.memoryStorage()
});

const FormData = require("form-data");
const crypto = require("crypto");

let db;

(async () => {
    db = await initDB();
})();

app.use(cors());
app.use(express.json());


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

// Chat AI
app.post("/chat", async (req, res) => {

    const { question, sessionId } = req.body;
    //kiem tra dữ liệu gửi lên
    if (!question) {
        return res.status(400).json({
            success: false,
            message: "Thiếu câu hỏi."
        });
    }
    try {
        console.log("Token ID:", process.env.TOKEN_ID);
        console.log("Token KEY:", process.env.TOKEN_KEY);
        console.log("Access Token:", process.env.ACCESS_TOKEN?.substring(0, 20) + "...");
        const result = await axios.post(

            process.env.SMARTBOT_URL,

            {
                bot_id: process.env.BOT_ID,
                sender_id: "web-user",
                text: question,
                input_channel: "livechat",
                session_id: sessionId,
                metadata: {
                    button_variables: []
                }
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

        console.log("SmartBot Response:");
        console.log(result.data);

        res.json(result.data);

    } catch (err) {

        console.error("===== SMARTVOICE ERROR =====");
        console.error("Status:", err.response?.status);

        console.error("Headers:");
        console.error(err.response?.headers);

        console.error("Data:");
        console.error(JSON.stringify(err.response?.data, null, 2));

        console.error("Message:");
        console.error(err.message);

        res.status(500).json({
            success: false,
            message: "Không gọi được SmartBot."
        });

    }

});

app.post("/speech-to-text", upload.single("audioFile"), async (req, res) => {
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

        const form = new FormData();

        form.append("audioFile", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        form.append("clientSession", sessionId);

        console.log("===== GỬI LÊN VNPT =====");
        console.log("URL:", process.env.STT_URL);
        console.log("Session:", sessionId);
        console.log("Mime:", req.file.mimetype);
        console.log("Size:", req.file.size);
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

        console.log("SmartVoice Response:");
        console.log(result.data);

        res.json(result.data);

    } catch (err) {

        console.error("SmartVoice Error:");
        console.error(err.response?.status);
        console.error(err.response?.data);
        console.error(err.message);

        res.status(500).json({
            success: false,
            message: "Không gọi được SmartVoice STT"
        });
    }
});

app.get("/users", async (req, res) => {

    const users = await db.all("SELECT * FROM users");

    res.json(users);

});

console.log("Đã nạp route /users");
const server = app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});

server.on("close", () => {
    console.log("Server đã đóng!");
});

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