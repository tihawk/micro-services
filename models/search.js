var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = Schema({
	_id: {
		type: Number,
		index: true
	},
	searchTerm: {
		type: String
	}
}, {timestamps: true});

var Search = mongoose.model('Search', SearchSchema);
module.exports = Search;