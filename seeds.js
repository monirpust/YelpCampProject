var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{ name: "Boighor CSE Camp",
	  image: "BoighorGroupPhoto.jpg",
	  description:"Taking book from our own departmental library Boighor"
	 },

	{ name: "Harding Bridge Tour",
	  image: "HardingBridge.jpg",
	  description:"Taking book from our own departmental library Boighor"
	 },

	{ name: "Programming contest IDPC-02",
	  image: "IDPC-CSE.jpg",
	  description:"Intra departmental Programming Contest (IDPC) is one of the greatest event of dept. of CSE, PUST"
	 }
];

function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("removed campgrounds!");

				//add a few campgrounds
			for(var i = 0; i < data.length; i++){
				Campground.create(data[i], function(err, camp){
					if(err){
						console.log(err);
					} else{
						console.log("Campground Adeed!");

						//add a few comments
						Comment.create({
							text: "This place is great, but I wish there was Internet",
							author: "Danish Sheikh"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else{
								camp.comments.push(comment);
								camp.save();
								console.log("Comment added");
							}
						});
					}
				});
			}
		}
	});


}

module.exports = seedDB;