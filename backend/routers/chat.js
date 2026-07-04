const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    const { question, sessionId } = req.body;

    if (!question || !question.trim()) {
        return res.status(400).json({
            success: false,
            message: "Thiếu câu hỏi."
        });
    }

    try {
        console.log("===== CÂU HỎI GỬI SMARTBOT =====");
        console.log(question);

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
                    Authorization:
                        `Bearer ${process.env.ACCESS_TOKEN}`,

                    "Token-id":
                        process.env.TOKEN_ID,

                    "Token-key":
                        process.env.TOKEN_KEY,

                    "Content-Type":
                        "application/json"
                },

                responseType: "text"
            }
        );

        console.log("===== SMARTBOT RAW RESPONSE =====");
        console.log(result.data);

        const rawData = result.data;

        const events = rawData
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.startsWith("data:"))
            .map(line => line.slice(5).trim())
            .filter(Boolean)
            .map(jsonText => {
                try {
                    return JSON.parse(jsonText);
                } catch (error) {
                    console.warn(
                        "Không parse được event:",
                        jsonText
                    );

                    return null;
                }
            })
            .filter(Boolean);


        console.log("===== SMARTBOT EVENTS =====");
        console.log(events);

        const texts = events.flatMap(event => {
            const cardData =
                event?.object?.sb?.card_data || [];

            return cardData
                .map(card => card?.text)
                .filter(text =>
                    typeof text === "string" &&
                    text.trim()
                );
        });


        const reply =
            texts.length > 0
                ? texts[texts.length - 1]
                : "";


        console.log("===== SMARTBOT FULL TEXT =====");
        console.log(reply);


        return res.json({
            success: true,
            reply: reply,
        });

    } catch (error) {
        console.error("===== SMARTBOT ERROR =====");

        console.error(
            "Status:",
            error.response?.status
        );

        console.error(
            "Data:",
            error.response?.data
        );

        console.error(
            "Message:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Không gọi được SmartBot."
        });
    }
});

module.exports = router;