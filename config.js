//setup config file
var config = {};
//setup database config
config.db = {};
config.db.host = 'ds121716.mlab.com:21716/micro-services';
config.db.usr = 'tihawk';
config.db.pass = 'tihawk';

//setup server port
config.port = 1335;

config.webhost = 'http://localhost/:'+config.port + '/l/';

module.exports = config;
