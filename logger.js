let winston = require('winston');
require('winston-mongodb').MongoDB;
let config = require('./config.js');

const loggerCollections = {
  WorkerLog: "worker_logs",
  APILog: "api_logs",
  WebAppLog: "webapp_logs",
  IOSLog: "ios_logs",
  AndroidLog: "android_logs",
  DBLog: "db_logs",
  MessageServiceLog: "messageservice_logs"
}

const addLogger = function(logger){
  const collection = loggerCollections[logger];
  if (!collection){
    throw new TypeError('Unknown logger.');
  }
  let transports = [];
  transports.push(new(winston.transports.MongoDB)({
            db : config.LOGGER_DATABASE,
            collection : collection,
            level : config.LOGGER_LEVEL,
            capped : true
        }));
  if(process.env.NODE_ENV === 'dev'){
    transports.push(new(winston.transports.Console)());
  }
  winston.loggers.add(logger,{
    transports : transports
  });
  return winston.loggers.get(logger);
}

exports.getLogger = function(loggerName){
  if(loggerName in winston.loggers.loggers){
    return winston.loggers.get(loggerName);
  } else {
    return addLogger(loggerName);
  }
}
