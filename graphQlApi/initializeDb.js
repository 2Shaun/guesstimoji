const boards = require('./boards.json')
const emojis = require('./emojis.json')

conn = Mongo();
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

if (db.emojis.count() === 0) {
    db.emojis.insertMany(emojis)
}

if (db.boards.count() === 0) {
    db.boards.insertMany(boards)
}
