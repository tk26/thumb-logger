function config(){
  const APP_NAME = 'Thumb Worker';
  switch(process.env.NODE_ENV){
      case 'dev':
          return {
            'LOGGER_DATABASE': 'mongodb://localhost/thumb-logs'
          };

      case 'test':
          return {
            'LOGGER_DATABASE': 'mongodb://localhost/thumb-logs_test'
          };

      case 'prod':
          var DB_USER = process.env.DB_USER;
          var DB_PASSWORD = process.env.DB_PASSWORD;

          return {
              'LOGGER_DATABASE': 'mongodb://'+DB_USER+':'+DB_PASSWORD+'@ds231245.mlab.com:31245/thumb-logs'
            };

      default:
          throw "Invalid configuration choice. NODE_ENV include ('dev', 'test', 'prod')";
  }
}

module.exports = config()
