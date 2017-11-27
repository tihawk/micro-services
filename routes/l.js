var express = require('express');
var router = express.Router();
var config = require('../config');

//URL SHORTENER
var Url = require('../models/url');
var base58 = require('../js/base58');
//handle get request to unshorten and redirect
router.get('/:encoded', function(req, res){
	var id = base58.decode(req.params.encoded);

	Url.findOne({_id: id}, function(err, link){
		if(link){
			res.redirect(link.long_url);
		} else {
			res.redirect((process.env.WEBHOST || config.webhost).slice(0, (process.env.WEBHOST || config.webhost).length-2) + '#/urlshortener')
		}
	})

});
//end URL SHORTENER

module.exports = router;