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
    emojis: [String],
});

module.exports = {
    emojiSchema,
    boardSchema,
};
