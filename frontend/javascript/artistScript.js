// GET
fetch("http://localhost:5000/artists")
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById("artistsTable");
        data.forEach(artist => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${artist.artist_id}</td>
                <td>${artist.artist_name}</td>
                <td>${artist.genre}</td>
                <td>${artist.monthly_listeners}</td>
                <td><button onclick="editArtist(${artist.artist_id}, '${artist.artist_name}', '${artist.genre}', ${artist.monthly_listeners})">Edit</button></td>
                <td><button onclick="deleteArtist(${artist.artist_id})">Delete</button></td>
            `;
            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));

// POST
document.getElementById("artistForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const artist_name = document.getElementById("artistName").value;
    const genre = document.getElementById("artistGenre").value;
    const monthly_listeners = document.getElementById("artistMonthly").value;
    
    fetch("http://localhost:5000/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ artist_name, genre, monthly_listeners })
    })
        .then(res => res.json())
        .then(() => location.reload())
        .catch(err => console.error(err));
});

//Patch/Put
function editArtist(id, name, genre, listeners) {
    document.getElementById("updateArtistId").value = id;
    document.getElementById("updateArtistName").value = name;
    document.getElementById("updateArtistGenre").value = genre;
    document.getElementById("updateArtistMonthly").value = listeners;
    document.getElementById("artistUpdateForm").style.display = "block";
}

document.getElementById("artistUpdateForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("updateArtistId").value;
    const artist_name = document.getElementById("updateArtistName").value;
    const genre = document.getElementById("updateArtistGenre").value;
    const monthly_listeners = document.getElementById("updateArtistMonthly").value;
    
    fetch(`http://localhost:5000/artists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ artist_name, genre, monthly_listeners })
    })
        .then(res => res.json())
        .then(() => location.reload())
        .catch(err => console.error(err));
});


//Delete
function deleteArtist(id) {
    fetch(`http://localhost:5000/artists/${id}`, {
        method: "DELETE",
    })
        .then(() => location.reload())
        .catch(err => console.error(err));
}