var mongoose = require("mongoose");

//capmgroundSchema 
var campgroundShcema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});
var Campground = mongoose.model("Campground", campgroundShcema);

module.exports = Campground;