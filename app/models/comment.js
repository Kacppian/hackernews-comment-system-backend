let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let comment_schema = new Schema({

	name:{
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	upvotes:{
		type: Number,
		default: 0,
	},
	downvotes:{
		type: Number,
		default: 0,
	},	
	timestamp: { 
		type: Date, 
		default: Date.now 
	}
});


let comment_model = mongoose.model('Comment', comment_schema);

module.exports = comment_model;