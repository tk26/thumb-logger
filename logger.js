let winston = require('winston');
require('winston-mongodb').MongoDB;
let config = require('../config.js');

exports.createLogger = function(app){
  let logger = new winston.Logger({
    level: config.LOG_LEVEL,
    transports: [
      new(winston.transports.MongoDB)({
        db : config.LOGGER_DATABASE,
        collection: app + '-logs'
      })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'log/exceptions.log',
            humanReadableUnhandledException: true,
            timestamp: true
        })
    ]
  });

  logger.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1));
    }
  };

  if (process.env.NODE_ENV !== 'prod') {
    logger.add(winston.transports.Console);
  }
  return logger;
}
