require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Test server
app.get("/", (req, res) => {
    res.send("Backend hoạt động!");
});

// API chat
app.post("/chat", async (req, res) => {

    const question = req.body.question;

    // Sau này sẽ gọi SmartBot ở đây
    const result = await axios.post(
        process.env.SMARTBOT_URL,
        {
            // body gửi cho VNPT
        },
        {
            headers: {
                // token sẽ để ở đây
            }
        }
    );

    res.json(result.data);

});

app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});