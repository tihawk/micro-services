//setup config file
var config = {};
//setup database config
config.db = {};
config.db.host = '';
config.db.usr = '';
config.db.pass = '';

//setup server port
config.port = 1335;

config.webhost = 'http://localhost/:' + config.port + '/l/';

module.exports = config;
