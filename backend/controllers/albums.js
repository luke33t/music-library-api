const db = require("../db.js");

// GET all albums
const getAll = (req, res) => {
    db.all("SELECT * FROM albums", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET albums by id
const getById = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM albums WHERE album_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        if (!row) return res.status(404).json({error: "No album found"});
        res.json(row);
    });
};

// POST album
// needed inputs = album_name, release_year, num_listens, artist_id
const create = (req, res) => {
    const { album_name, release_year, num_listens, artist_id } = req.body;

    if (!album_name || !release_year || !num_listens || !artist_id ) return res.status(400).json({ error: "album_name, release_year, num_listens, and artist_id required"});
    
    const sql = "INSERT INTO albums (album_name, release_year, num_listens, artist_id) VALUES (?, ?, ?, ?)";

    db.run(sql, [album_name, release_year, num_listens, artist_id], function(err) {
        if (err) return res.status(500).json({error: err.message });
        res.status(201).json({id: this.lastID });
    });
};

// PUT album
const update = (req, res) => {
    const { id } = req.params;
    const { album_name, release_year, num_listens, artist_id } = req.body;

    const sql = "UPDATE albums SET album_name = ?, release_year = ?, num_listens = ?, artist_id = ? WHERE album_id = ?";

    db.run(sql, [album_name, release_year, num_listens, artist_id, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Album not found" });
        res.json({ message: "Album Updated" });
    });
};

// DELETE album
const remove = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM albums WHERE album_id = ?";

    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Album not found" });
        res.json({ message: "Album Deleted" });
    });
};

module.exports = { getAll, getById, create, update, remove };