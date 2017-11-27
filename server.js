const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.js');
const validator = require('validator');


//connect to database
mongoose.connect('mongodb://' + (process.env.DB_USR || config.db.usr) + ':' + (process.env.DB_PASS || config.db.pass) + '@' + (process.env.DB_HOST || config.db.host), {useMongoClient: true});

//specify static files folder
app.use(express.static(path.join(__dirname, '/client')));
//use body-parser middleware for POST
app.use(bodyParser.json());
//setup bodyparser to handle URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//set up CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
//end TIMESTAMP

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
//end HEADER PARSER

//URL SHORTENER
var Url = require('./models/url');
var Counter = require('./models/counter');
var base58 = require('./js/base58');
//handle post request to shorten url
app.post('/api/shorten', function(req, res){
	var longUrl = req.body.url;
	var shortUrl = '';
	var currentId;
	//check if valid url
	if(validator.isURL(longUrl, {require_protocol: true})){
		//check if longUrl already exists in database and act accordingly
		Url.findOne({long_url: longUrl}, function(err, found){
			if(found){
				shortUrl = (process.env.WEBHOST || config.webhost) + base58.encode(found._id);
				res.send({'shortUrl': shortUrl});
			} else {
				
				Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(err, old){
					currentId = old.seq;

					Url.create({
						_id: currentId,
						long_url: longUrl,
						created_at: new Date()
					}, function(err, posted){
						if(err) {throw err;}
						shortUrl = (process.env.WEBHOST || config.webhost) + base58.encode(currentId);

						res.send({'shortUrl': shortUrl})

					})
				});

			}

		});

	} else {
		res.send({'shortUrl': '/l/Invalid URL'})
	}
});

//handle get request to unshorten and redirect
app.get('/l/:encoded', function(req, res){
	var id = base58.decode(req.params.encoded);

	url.Url.findOne({_id: id}, function(err, link){
		if(link){
			res.redirect(link.long_url);
		} else {
			res.redirect((process.env.WEBHOST || config.webhost).slice(0, (process.env.WEBHOST || config.webhost).length-2) + '#/urlshortener')
		}
	})

});
//end URL SHORTENER

//IMAGE SEARCH
var SearchTerm = require('./models/search');
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE || config.cse, process.env.G_API || config.googleAPI);
//handle a GET request for a search
app.get('/api/imagesearch/:searchterm*', (req, res)=>{
	var searchTerm = req.params.searchterm;
	var offset = req.query.offset;
	var currentId = 0;
	//save the last search to the database
	Counter.findByIdAndUpdate({_id: 'search_count'}, {$inc: {seq: 1}}, (err, old)=>{
		var currentId = old.seq;
		SearchTerm.create({
			_id: currentId,
			searchTerm: searchTerm
		}, (err, doc)=>{
			/*res.send({
				doc: doc,
				params: req.params,
				query: req.query
			});*/
			client.search(searchTerm)
				.then(images=>{
					res.send(images);
				}, err=>{
					res.send({error: err});
			});
		});
		
	});

});
//handle a GET request for most recent searches
app.get('/api/recentsearches', (req, res)=>{

	Counter.findOne({_id: 'search_count'}, (err, doc)=>{
		var currentId = doc.seq;
		//an async function to find the last ten searches before sending a response
		async function findSearches(searches){
			for(let i = currentId-1; i > currentId-11; i--){
				await SearchTerm.findOne({_id: i}, (err, doc)=>{
					searches.push(doc);
				});
			}
			res.send(searches);
		}

		findSearches([]);

	});

});
//end IMAGE SEARCH

app.listen(process.env.PORT || config.port, function(){
	console.log('listening on port ' + (process.env.PORT || config.port) + '...');
});