
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//INDEX - show all campgrounds
router.get('/campground', function(req, res){
	//get all campgroudns fro DB
	//console.log(req.user);
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campground/index", {campground: allCampgrounds, currentUser: req.user});
		}
	});

});

//CREATE - add a new campground to DB
router.post('/campground', middleware.isLoggedIn, function(req, res){
	//get data from form and add db
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}

	var newCampground = {name:name, image: image, description: desc, author: author};

	//create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			//redirect back to campgrounds page
			res.redirect("/campground");
		}
	});
});

//NEW- show form to create new campground
router.get('/campground/new', middleware.isLoggedIn, function(req, res){
	res.render("campground/new");
});

//SHOW - shows more info about one campground
router.get('/campground/:id', function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			//render show tamplate with that campground
			res.render("campground/show", {campground:foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get('/campground/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campground/edit", {campground: foundCampground})
	});
});

//UPDATE CAMPGROUND ROUTE
router.put('/campground/:id', middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		} else{
			//redirect to show page
			res.redirect("/campground/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete('/campground/:id', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campground");
		} else{
			res.redirect("/campground");
		}
	});
});


module.exports = router;