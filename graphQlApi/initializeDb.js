const boards = require('./boards.json')
const emojis = require('./emojis.json')
require('dotenv').config({ path: './.env.local'})

conn = Mongo(`${process.env.MONGODB_HOST_NAME}:27017`);
db = conn.getDB("guesstimoji")

try {
    db.createCollection("emojis")
} catch {
    console.log('Error creating emojis collection. Is it already created?')
}

try {
    db.createCollection("boards")
} catch {
    console.log('Error creating boards collection. Is it already created?')
}

try {
    db.createCollection("games")
} catch {
    console.log('Error creating games collection. Is it already created?')
}

if (db.emojis.countDocuments() === 0) {
    db.emojis.insertMany(emojis)
}

if (db.boards.countDocuments() === 0) {
    db.boards.insertMany(boards)
}
