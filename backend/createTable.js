const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
const sql = `
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER,
    status TEXT CHECK (status IN ('to-read','reading','completed'))
);
`;

db.run(sql, (err) => {
    if (err) {
    console.error("Create table failed:", err.message);
    return;
}
    console.log("Book table created (or already exists).");
    db.close();
});