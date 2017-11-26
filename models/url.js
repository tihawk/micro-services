var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
	_id: {
		type: String,
		required: true
	},
	seq: {
		type: Number,
		default: 0
	}
});

var Counter = mongoose.model('counter', CounterSchema);
module.exports.Counter = Counter;


var UrlSchema = Schema({
	_id: {
		type: Number,
		index: true
	},
	long_url: {
		type: String
	},
	created_at: {
		type: Date
	}
});

var Url = mongoose.model('Url', UrlSchema);
module.exports.Url = Url;