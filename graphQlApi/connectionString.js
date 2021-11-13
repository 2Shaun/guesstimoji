const dbName = 'guesstimoji';
// TODO: define with environment variables
const connectionString =
    'mongodb://' + process.env.MONGO_HOSTNAME + '/' + dbName;

module.exports = {
    connectionString,
};
