const dbName = 'guesstimoji';
const hostName = 'mongo';
// TODO: define with environment variables
const connectionString = 'mongodb://' + hostName + '/' + dbName;

module.exports = {
    connectionString,
};
