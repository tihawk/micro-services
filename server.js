var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');
var validator = require('validator');

//specify static files folder
app.use(express.static(path.join(__dirname, '/client')));

//use body-parser middleware for POST
app.use(bodyParser.json());
//setup bodyparser to handle URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect('mongodb://' + config.db.usr + ':' + config.db.pass + '@' + config.db.host, {useMongoClient: true});

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

//HEADER PARSER
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

//URL SHORTENER
var url = require('./models/url');
var base58 = require('./js/base58');
//handle post request to shorten url
app.post('/api/shorten', function(req, res){
	var longUrl = req.body.url;
	var shortUrl = '';
	var currentId;
	//check if valid url
	if(validator.isURL(longUrl, {require_protocol: true})){
			//check if longUrl already exists in database and act accordingly
			url.Url.findOne({long_url: longUrl}, function(err, found){
				if(found){
					shortUrl = config.webhost + base58.encode(found._id);
					res.send({'shortUrl': shortUrl});
				} else {
					
					url.Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(err, updated){
						currentId = updated.seq;
						//res.send({'id': currentId});

						url.Url.create({
							_id: currentId,
							long_url: longUrl,
							created_at: new Date()
						}, function(err, posted){
							if(err) {throw err;}
							shortUrl = config.webhost + base58.encode(currentId);

							res.send({'shortUrl': shortUrl})

						})
					});

				}

			});

	} else {
		res.send({'shortUrl': 'Invalid URL'})
	}
});

//handle get request to unshorten and redirect
app.get('/l/:encoded', function(req, res){
	var id = base58.decode(req.params.encoded);

	url.Url.findOne({_id: id}, function(err, link){
		if(link){
			res.redirect(link.long_url);
		} else {
			res.redirect(config.webhost.slice(0, config.webhost.length-2) + '#/urlshortener')
		}
	})

});

app.listen(config.port, function(){
	console.log('listening on port ' + config.port + '...');
});