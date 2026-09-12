const db = require("../db.js");

// GET all songs
const getAll = (req, res) => {
    db.all("SELECT * FROM songs", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET songs by id
const getById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM songs WHERE song_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        if (!row) return res.status(404).json({error: "No song found"});
        res.json(row);
    });
};

// POST songs
// 3 values needed = song_name, release_year, album_id 
const create = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    if (!song_name || !release_year || !album_id ) return res.status(400).json({ error: "song_name, release_year, and album_id required"});
    
    const sql = "INSERT INTO songs (song_name, release_year, album_id) VALUES (?, ?, ?)";

    db.run(sql, [song_name, release_year, album_id], function(err) {
        if (err) return res.status(500).json({error: err.message });
        res.status(201).json({id: this.lastID });
    });
};

// PUT songs
const update = (req, res) => {
    const { id } = req.params;
    const { song_name, release_year, album_id } = req.body;

    const sql = "UPDATE songs SET song_name = ?, release_year = ?, album_id = ? WHERE song_id = ?";

    db.run(sql, [song_name, release_year, album_id, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Song not found" });
        res.json({ message: "Song Updated" });
    });
};

// DELETE songs
const remove = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM songs WHERE song_id = ?";

    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Song not found" });
        res.json({ message: "Song Deleted" });
    });
};

module.exports = { getAll, getById, create, update, remove };