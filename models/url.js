var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = Url;