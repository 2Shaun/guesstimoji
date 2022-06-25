const express = require('express');
const cors = require('cors');
const { gql, ApolloServer, graphiqlExpress } = require('apollo-server-express');
const { typeDefs } = require('./types.js');
const { resolvers } = require('./resolvers.js');
const Vault = require('hashi-vault-js');
const mongoose = require('mongoose');

const startup = async () => {
    const vault = new Vault({
        https: true,
        baseUrl: process.env.VAULT_BASE_URL,
        rootPath: 'v1/auth/approle',
        timeout: 2000,
        proxy: false,
        namespace: 'admin',
        cacert: './vault_cluster_root_cert.pem',
    });

    const { client_token } = await vault.loginWithAppRole(
        process.env.VAULT_ROLE_ID,
        process.env.VAULT_SECRET_ID
    );

    return await vault.readKVSecret(
        client_token,
        'azure/cosmos-db',
        1,
        'v1/kv'
    );
};

// data layer
startup().then((secret) => {
    mongoose.connect(secret.data.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'guesstimoji',
    });

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
                },
            },
        });

        const app = express();
        app.options(
            '*',
            cors({ origin: process.env.ALLOWED_ORIGINS.split(', ') })
        );
        server.applyMiddleware({ app });

        app.listen(
            {
                port: 3005,
            },
            () => console.log('Starting server on port 3005')
        );
    });
});
