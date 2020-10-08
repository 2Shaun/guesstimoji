const express = require("express");
const { gql, ApolloServer, graphiqlExpress } = require('apollo-server-express');
const { typeDefs } = require('./types.js');
const { resolvers } = require('./resolvers.js');
const { connectionString } = require('./connectionString.js');
const mongoose = require("mongoose");

// data layer
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
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
        port: 3005,
    }, () => console.log('Starting server on port 3005'))
});