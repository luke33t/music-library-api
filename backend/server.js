const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const artistsController = require("./routes/artists.js");
const albumsController = require("./routes/albums.js");
const songsController = require("./routes/songs.js");

app.use("/artists", artistsController);
app.use("/albums", albumsController);
app.use("/songs", songsController);

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(5000, () => {
    console.log("Listening on port 5000")
})