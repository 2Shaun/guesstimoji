const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./types.js');
const { resolvers } = require('./resolvers.js');
const mongoose = require("mongoose");

// data layer
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :'));

db.once('open', async () => {

    // api layer
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: {
            endpoint: '/graphql',
            settings: {
                'editor.theme': 'dark',
            }
        }
    })

    const app = express();
    server.applyMiddleware({ app });

    app.listen({
        port: process.env.GRAPHQL_API_PORT,
    }, () => console.log(`Starting server on port ${process.env.GRAPHQL_API_PORT}`))
});