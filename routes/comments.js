
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//==================
//COMMENTS ROUTES
//==================

router.get('/campground/:id/comments/new', middleware.isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		}
	});

});

router.post('/campground/:id/comments', middleware.isLoggedIn, function(req, res){
	//find campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redicrect("/campground/")
		} else{
		//create new comments
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err);
					//connect comment to campground
				} else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					//console.log(comment);
				    //redicrect campground show page
					res.redirect("/campground/" + campground._id);
				}
			});	
		}
	});

});

//COMMENT- edit route
router.get('/campground/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

//COMMENT- update route
router.put('/campground/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campground/" + req.params.id);
		}
	});
});

//COMMENT - DESTROY
router.delete('/campground/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campground/"+ req.params.id);
		}
	});
});

module.exports = router;
