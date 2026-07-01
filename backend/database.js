const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function initDB() {

    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });
    //bảng người dùng   
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
    
    console.log("SQLite đã kết nối.");

    return db;
}

module.exports = initDB;

