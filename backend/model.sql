PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT NOT NULL UNIQUE,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT NOT NULL UNIQUE,
    release_year INTEGER NOT NULL,
    num_listens INTEGER NOT NULL,
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT NOT NULL UNIQUE,
    release_year INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO artists (artist_name, genre, monthly_listeners) VALUES 
("Bladee", "Hip-Hop", 1500000), -- artist 1
("Lucy Bedroque", "Hip-Hop", 800000); -- artist 2

INSERT OR IGNORE INTO albums (album_name, release_year, num_listens, artist_id) VALUES
("Icedancer", 2018, 85000000, 1), -- album 1
("The Fool", 2021, 61000000, 1), -- album 2
("Gluee", 2014, 43000000, 1), -- album 3
("Sisterhood", 2023, 15000000, 2), -- album 4
("Unmusique", 2025, 32000000, 2); -- album 5

INSERT OR IGNORE INTO songs (song_name, release_year, album_id) VALUES
("Side By Side", 2018, 1),
("Waster", 2018, 1),
("egobaby", 2021, 2),
("Hotel Breakfast", 2021, 2),
("Deletee (Intro)", 2014, 3),
("Unreal", 2014, 3),
("TAKE ME BACK", 2023, 4),
("WALLS OF JERICHO", 2023, 4),
("Ultraviolet", 2025, 5),
("Oujia", 2025, 5);