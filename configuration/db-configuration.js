const environmentVariables = process.env;

const DEFAULT_MONGO_HOST = 'localhost';
const DEFAULT_MONGO_PORT = 27017;

const MONGO_HOST = environmentVariables['MONGO_HOST'] || DEFAULT_MONGO_HOST;
const MONGO_PORT = environmentVariables['MONGO_PORT'] || DEFAULT_MONGO_PORT;

const DB_NAME = 'crmsystemdb';

const DEFAULT_MONGO_CONNECTION_STRING = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;

const MONGO_CONNECTION_STRING = environmentVariables['MONGO_CONNECTION_STRING'] || DEFAULT_MONGO_CONNECTION_STRING;

module.exports = {
    MONGO_CONNECTION_STRING
};
