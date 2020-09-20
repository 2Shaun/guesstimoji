const { Emoji, Board } = require("./models.js");
// service / data access layer

const resolvers = {
    Query: {
        /*
        async getEmojis() {
            try {
                const emojis = await Emoji.find({}).sort({ _id: 'asc' });
                return emojis;
            } catch (err) {
                throw new Error(err);
            }
        }
        */


        getEmojis(parent, args, context, info) {
            try {
                const emojis = Emoji.find({ ...args });
                Emoji.find({ ...args })
                    .distinct('subgroup', (err, subgroups) => {
                        console.log("getEmojis -> subgroups", subgroups)
                    });
                Emoji.count({ ...args })
                    .count({}, (err, count) => {
                        console.log("getEmojis -> count", count)
                    });
                return emojis;
            } catch (err) {
                console.error(err);
            }
        },

        async getEmojiByID(parent, args, context, info) {
            const retval = await Emoji.findById(args.id);
            return retval;
        },

        async getEmojisByGroup(parent, args, context, info) {
            const retval = await Emoji.find({ subgroup: args.group }).sort({ _id: 'asc' });
            return retval;
        }
    },
    Mutation: {
        createBoard(parent, { emojis }, { models: { Board } }, info) {
            try {
                const newBoard = Board.create({ emojis });
                return newBoard;
            } catch (err) {
                console.error(err);
            }
        },
    },
};

module.exports = {
    resolvers,
};