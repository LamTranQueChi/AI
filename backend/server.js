require("dotenv").config();

const initDB = require("./database");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

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

        console.error("SmartBot Error:");
        console.error("Status:", err.response?.status);
        console.error("Data:", err.response?.data);
        console.error("Message:", err.message);

        res.status(500).json({
            success: false,
            message: "Không gọi được SmartBot."
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