const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
//const config = require('./config.js');

var Url = require('./models/url');
var Counter = require('./models/counter');
var base58 = require('./js/base58');


//connect to database
mongoose.connect('mongodb://' + (process.env.DB_USR || config.db.usr) + ':' + (process.env.DB_PASS || config.db.pass) + '@' + (process.env.DB_HOST || config.db.host), {useMongoClient: true});

//load router
var apiRouter = require('./routes/api');
var lRouter = require('./routes/l')
app.use('/api', apiRouter);
app.use('/l', lRouter);
//specify static files folder
app.use(express.static(path.join(__dirname, '/client')));
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

app.listen(process.env.PORT || config.port, function(){
	console.log('listening on port ' + (process.env.PORT || config.port) + '...');
});