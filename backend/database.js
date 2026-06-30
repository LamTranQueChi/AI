const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function initDB() {

    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    console.log("SQLite đã kết nối.");

    return db;
}

module.exports = initDB;