
const { emojiSchema, boardSchema } = require('./schemas.js');
const { model } = require('mongoose');
// model layer

const Emoji = model('Emoji', emojiSchema);
const Board = model('Board', boardSchema);

module.exports = {
    Emoji,
    Board,
} 