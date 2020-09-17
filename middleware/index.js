//all middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	Campground.findById(req.params.id, function(err, foundCampground){
		//is user logged in
		if(req.isAuthenticated()){
			if(err){
				res.redirect("back");
			} else{
				//does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		} else{
		//otherwise redirect
			res.redirect("back");
		}   
		   
	});	
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		//is user logged in
		if(req.isAuthenticated()){
			if(err){
				res.redirect("back");
			} else{
				//does user own the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				//if not then
				else{
					res.redirect("back");
				}
			}
		} else{
		//otherwise redirect
			res.redirect("back");
		}   
		   
	});	
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;