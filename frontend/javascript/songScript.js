// GET
fetch("http://localhost:5000/songs")
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById("songsTable");
        data.forEach(song => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${song.song_id}</td>
                <td>${song.song_name}</td>
                <td>${song.release_year}</td>
                <td>${song.album_id}</td>
                <td><button onclick="editSong(${song.song_id}, '${song.song_name}', ${song.release_year}, ${song.album_id})">Edit</button></td>
                <td><button onclick="deleteSong(${song.song_id})">Delete</button></td>
            `;
            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));

//TODO: Post
document.getElementById("songForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const song_name = document.getElementById("songName").value;
    const release_year = document.getElementById("songYear").value;
    const album_id = document.getElementById("albumID").value;
    
    fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ song_name, release_year, album_id })
    })
        .then(res => res.json())
        .then(() => location.reload())
        .catch(err => console.error(err));
});

//TODO: Patch/Put
function editSong(id, name, year, albumid) {
    document.getElementById("updateSongID").value = id;
    document.getElementById("updateSongName").value = name;
    document.getElementById("updateReleaseYear").value = year;
    document.getElementById("updateAlbumID").value = albumid;
    document.getElementById("songUpdateForm").style.display = "block";
}

document.getElementById("songUpdateForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("updateSongID").value;
    const song_name = document.getElementById("updateSongName").value;
    const release_year = document.getElementById("updateReleaseYear").value;
    const album_id = document.getElementById("updateAlbumID").value;
    
    fetch(`http://localhost:5000/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ song_name, release_year, album_id })
    })
        .then(res => res.json())
        .then(() => location.reload())
        .catch(err => console.error(err));
});

//Delete
function deleteSong(id) {
    fetch(`http://localhost:5000/songs/${id}`, {
        method: "DELETE",
    })
        .then(() => location.reload())
        .catch(err => console.error(err));
}