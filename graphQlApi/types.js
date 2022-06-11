const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Emoji {
        _id: String!
        emoji: String!
        name: String!
        group: String!
        subgroup: String
        codepoints: String
    }
    type ObjectId {
        oid: String!
    }
    type Board {
        emojis: [String!]!
    }

    type Player {
        username: String!
        socketID: String!
        pick: Emoji!
    }

    type Message {
        time: String!
        username: String!
        message: String!
    }

    # I may be able to receive gameLog with a subscription
    # instead of socket.io listeners
    type Game {
        _id: ID!
        roomId: String!
        board: Board!
        players: [Player]!
        gameLog: [Message!]!
        game: Int!
    }

    type Query {
        getEmojis(group: String, subgroup: String): [Emoji]
        getEmojiByID(id: String!): Emoji
        getEmojisByGroup(group: String!): [Emoji]!
        getBoards: [Board]!
    }

    type Mutation {
        createBoard(emojis: [String!]!): Board!
    }
`;

module.exports = {
    typeDefs,
};
