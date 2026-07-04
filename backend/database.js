const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function initDB() {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`PRAGMA foreign_keys = ON;`);

    // Bảng người dùng
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);


    // Bảng hồ sơ
    await db.exec(`
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            procedure_name TEXT NOT NULL,
            status TEXT DEFAULT 'Đã nộp',
            file_path TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    // Bảng cuộc trò chuyện
    await db.exec(`
        CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            title TEXT NOT NULL DEFAULT 'Cuộc trò chuyện mới',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
        )
    `);

    // Bảng tin nhắn
    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversation_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (conversation_id)
                REFERENCES conversations(id)
                ON DELETE CASCADE
        )
    `);

    console.log("SQLite đã kết nối.");

    return db;
}

module.exports = initDB;