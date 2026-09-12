// GET
fetch("http://localhost:5000/albums")
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById("albumsTable");
        data.forEach(album => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${album.album_id}</td>
                <td>${album.album_name}</td>
                <td>${album.release_year}</td>
                <td>${album.num_listens}</td>
                <td>${album.artist_id}</td>
                <td><button onclick="editAlbum(${album.album_id}, '${album.album_name}', '${album.release_year}', ${album.num_listens}, ${album.artist_id})">Edit</button></td>
                <td><button onclick="deleteAlbum(${album.album_id})">Delete</button></td>
            `;
            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));

document.getElementById("albumForm").addEventListener("submit", function(e) {
    console.log("form submitted");
    e.preventDefault();
    const album_name = document.getElementById("albumName").value;
    const release_year = document.getElementById("albumYear").value;
    const num_listens = document.getElementById("albumPlays").value;
    const artist_id = document.getElementById("artistID").value;
    
    fetch("http://localhost:5000/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ album_name, release_year, num_listens, artist_id })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .then(() => location.reload())
        .catch(err => console.error(err));
});

//Patch/Put
function editAlbum(id, name, year, plays, artistid) {
    document.getElementById("updateAlbumID").value = id;
    document.getElementById("updateAlbumName").value = name;
    document.getElementById("updateAlbumYear").value = year;
    document.getElementById("updateAlbumPlays").value = plays;
    document.getElementById("updateArtistID").value = artistid;
    document.getElementById("albumUpdateForm").style.display = "block";
}

document.getElementById("albumUpdateForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("updateAlbumID").value;
    const album_name = document.getElementById("updateAlbumName").value;
    const release_year = document.getElementById("updateAlbumYear").value;
    const num_listens = document.getElementById("updateAlbumPlays").value;
    const artist_id = document.getElementById("updateArtistID").value;
    
    fetch(`http://localhost:5000/albums/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ album_name, release_year, num_listens, artist_id })
    })
        .then(res => res.json())
        .then(() => location.reload())
        .catch(err => console.error(err));
});

//Delete
function deleteAlbum(id) {
    fetch(`http://localhost:5000/albums/${id}`, {
        method: "DELETE",
    })
        .then(() => location.reload())
        .catch(err => console.error(err));
}