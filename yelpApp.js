var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
//requiring campground Schema from campground.js file inside models directory
var Campground = require("./models/campground");
//requiring comment model of comment schema
var Comment = require("./models/comment");
//requiring seeds.js file
var seedDB = require("./seeds");
//requiring passport for uAuth
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

//requiring all routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes       = require("./routes/index");

//seedDB();//seeding the Database

mongoose.connect("mongodb://localhost/yelpCampv10");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Authenticate",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing req.user to every single route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
	//**note: used function treat as middleware to every route
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(5000, function(req, res){
	console.log("YelpServer has started at port 5000..");

});