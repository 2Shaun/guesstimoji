const { Schema, ObjectId } = require('mongoose');

const emojiSchema = new Schema({
    _id: ObjectId,
    emoji: String,
    name: String,
    group: String,
    subgroup: String,
    codepoints: String,
});

const boardSchema = new Schema({
    _id: ObjectId,
    emojis: [emojiSchema],
})

module.exports = {
    emojiSchema,
    boardSchema,
}