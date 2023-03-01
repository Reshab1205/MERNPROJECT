require('dotenv').config({ path: './variables.env' });
const config = require("config");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;
let dbName = config.get('DB_NAME');
let dbString = config.get('DB_STRING');
const options = {
  //NEW CONFIGURATION
  // keepAlive: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // serverSelectionTimeoutMS: 300000,
  // heartbeatFrequencyMS: 10000,
  // family: 4,
  // dbName: process.env.DB_NAME

  //OLD CONFIGURATION
  connectTimeoutMS: 200000,
  socketTimeoutMS: 2000000,
  keepAlive: true,
  useNewUrlParser: true,
  dbName: dbName
};


module.exports.connectToDatabase = () => {
  if (isConnected) {
    console.log('----DB----using existing connection----------------');
    return Promise.resolve();
  }
  console.log('----DB----creating new connection----------------');
  return mongoose.connect(dbString, options)
    .then(db => {
      isConnected = db.connections[0].readyState;
      console.log('----DB----connection created----------------');
  },
  err => {
    console.log('----DB----MONGOERROR----------------');
    console.log(err);
    }
  );
};