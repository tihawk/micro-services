var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('validator');
var config = require('../config.js');

//use body-parser middleware for POST
router.use(bodyParser.json());
//setup bodyparser to handle URL encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

//TIMESTAMP
//import the timeservice tool from ./js
var timeService = require('../js/timestamp.js');
//handle api get request for timestamp
router.get('/timestamp/:date', function(req, res){
	var url = req.params.date;
	res.send(timeService.timeService(url));
});
//end TIMESTAMP

//HEADER PARSER
//handle api get request for header parser
router.get('/whoami', function(req, res){
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
var Url = require('../models/url');
var Counter = require('../models/counter');
var base58 = require('../js/base58');
//handle post request to shorten url
router.post('/shorten', function(req, res){
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
//end URL SHORTENER

//IMAGE SEARCH
var SearchTerm = require('../models/search');
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE || config.cse, process.env.G_API || config.googleAPI);
//handle a GET request for a search
router.get('/imagesearch/:searchterm*', (req, res)=>{
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
router.get('/recentsearches', (req, res)=>{

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

module.exports = router;