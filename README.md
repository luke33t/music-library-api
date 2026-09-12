# Music Library API

A full-stack music library application with a REST API backend and SQLite database. Supports full CRUD operations across artists, albums, and songs.

## Stack

- **Backend:** Node.js, Express
- **Database:** SQLite
- **Frontend:** HTML, JavaScript

## Features

- RESTful API with resource-based routes for artists, albums, and songs
- Relational database schema with foreign key relationships (artists → albums → songs) and cascading deletes
- Full CRUD functionality (create, read, update, delete)

## Schema

- **Artists:** name, genre, monthly listeners
- **Albums:** name, release year, listens, linked to an artist
- **Songs:** name, release year, linked to an album

## Running locally

```bash
npm install
node createTable.js   # sets up the database
node server.js         # starts the server on localhost:5000
```

## API Endpoints

- `GET /artists` `POST /artists` `PUT /artists/:id` `DELETE /artists/:id`
- `GET /albums` `POST /albums` `PUT /albums/:id` `DELETE /albums/:id`
- `GET /songs` `POST /songs` `PUT /songs/:id` `DELETE /songs/:id`

## What I'd improve

- Input validation and parameterized queries to prevent SQL injection
- Basic authentication for write operations
- A proper frontend UI beyond the current bare-bones HTML/CSS
