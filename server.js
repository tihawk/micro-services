var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');

//specify static files folder
app.use(express.static(path.join(__dirname, '/client')));
/*<FOR LATER USE>
//use body-parser middleware for POST
app.use(bodyParser.json());
//setup bodyparser to handle URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect('mongodb://' + config.db.usr + ':' + config.db.pass + '@' + config.db.host, {useMongoClient: true});
</FOR LATER USE>*/
//handle lack of index.html
app.get('/', function(req, res){
	res.send('A collection of useless web micro services');
});

//TIMESTAMP
//import the timeservice tool from ./js
var timeService = require('./js/timestamp.js');
//handle api get request for timestamp
app.get('/api/timestamp/:date', function(req, res){
	var url = req.params.date;
	res.send(timeService.timeService(url));
});

//handle api get request for header parser
app.get('/api/whoami', function(req, res){
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	var info = {
         'ip': ip,
         'lang': req.headers["accept-language"].split(',')[0],
         'os': req.headers['user-agent'].split(') ')[0].split(' (')[1]
     };
	res.send(info);
})

app.listen(config.port, function(){
	console.log('listening on port ' + config.port + '...');
});