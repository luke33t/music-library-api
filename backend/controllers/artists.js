const db = require("../db.js");

// GET all artists
const getAll = (req, res) => {
    db.all("SELECT * FROM artists", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET artists by id
const getById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM artists WHERE artist_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        if (!row) return res.status(404).json({error: "No artist found"});
        res.json(row);
    });
};

// POST artist
const create = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    if (!artist_name || !genre || !monthly_listeners ) return res.status(400).json({ error: "artist_name, genre, and monthly_listeners required"});
    
    const sql = "INSERT INTO artists (artist_name, genre, monthly_listeners) VALUES (?, ?, ?)";

    db.run(sql, [artist_name, genre, monthly_listeners], function(err) {
        if (err) return res.status(500).json({error: err.message });
        res.status(201).json({id: this.lastID });
    });
};

// PUT artist
const update = (req, res) => {
    const { id } = req.params;
    const { artist_name, genre, monthly_listeners } = req.body;

    const sql = "UPDATE artists SET artist_name = ?, genre = ?, monthly_listeners = ? WHERE artist_id = ?";

    db.run(sql, [artist_name, genre, monthly_listeners, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Artist not found" });
        res.json({ message: "Artist Updated" });
    });
};

// DELETE artist
const remove = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM artists WHERE artist_id = ?";

    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Artist not found" });
        res.json({ message: "Artist Deleted" });
    });
};

module.exports = { getAll, getById, create, update, remove };