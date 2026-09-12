const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./data/app.db");
const sql = fs.readFileSync("model.sql").toString();

db.exec(sql, (err) => {
    if (err) {
        console.error("Create table failed:", err.message);
        return;
    }
    console.log("Music tables initialised (or already exists)");
})

module.exports = db;