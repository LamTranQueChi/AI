const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// 1. TẠO CUỘC TRÒ CHUYỆN MỚI
// POST /conversations

router.post("/", async (req, res) => {
    try {
        const db = req.app.locals.db;

        const conversationId = crypto.randomUUID();

        await db.run(
            `
            INSERT INTO conversations (id, title)
            VALUES (?, ?)
            `,
            [conversationId, "Cuộc trò chuyện mới"]
        );

        res.json({
            success: true,
            conversationId
        });

    } catch (error) {
        console.error("Lỗi tạo conversation:", error);

        res.status(500).json({
            success: false,
            message: "Không thể tạo cuộc trò chuyện."
        });
    }
});


// 2. LẤY DANH SÁCH LỊCH SỬ
// GET /conversations
router.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db;

        const conversations = await db.all(`
            SELECT
                id,
                title,
                created_at,
                updated_at
            FROM conversations
            ORDER BY updated_at DESC
        `);

        res.json({
            success: true,
            conversations
        });

    } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy lịch sử trò chuyện."
        });
    }
});

// 3. LẤY TIN NHẮN CỦA MỘT CUỘC CHAT
// GET /conversations/:id/messages
router.get("/:id/messages", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { id } = req.params;

        const messages = await db.all(
            `
            SELECT
                id,
                role,
                content,
                created_at
            FROM messages
            WHERE conversation_id = ?
            ORDER BY id ASC
            `,
            [id]
        );

        res.json({
            success: true,
            messages
        });

    } catch (error) {
        console.error("Lỗi lấy messages:", error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy tin nhắn."
        });
    }
});

// 4. LƯU TIN NHẮN
// POST /conversations/:id/messages


router.post("/:id/messages", async (req, res) => {
    try {
        const db = req.app.locals.db;

        const { id } = req.params;
        const { role, content } = req.body;

        if (!role || !content) {
            return res.status(400).json({
                success: false,
                message: "Thiếu role hoặc content."
            });
        }

        await db.run(
            `
            INSERT INTO messages (
                conversation_id,
                role,
                content
            )
            VALUES (?, ?, ?)
            `,
            [id, role, content]
        );


        // Cập nhật thời gian conversation
        await db.run(
            `
            UPDATE conversations
            SET updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [id]
        );


        // Nếu đây là tin nhắn user đầu tiên
        // thì dùng nội dung làm title
        if (role === "user") {

            const conversation = await db.get(
                `
                SELECT title
                FROM conversations
                WHERE id = ?
                `,
                [id]
            );

            if (
                conversation &&
                conversation.title === "Cuộc trò chuyện mới"
            ) {
                const title =
                    content.length > 45
                        ? content.substring(0, 45) + "..."
                        : content;

                await db.run(
                    `
                    UPDATE conversations
                    SET title = ?
                    WHERE id = ?
                    `,
                    [title, id]
                );
            }
        }


        res.json({
            success: true
        });

    } catch (error) {
        console.error("Lỗi lưu message:", error);

        res.status(500).json({
            success: false,
            message: "Không thể lưu tin nhắn."
        });
    }
});


module.exports = router;