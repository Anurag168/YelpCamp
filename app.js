var express=require('express');
var app=express();
const bodyparser=require("body-parser");
let mongoose=require('mongoose');
let Campground=require("./models/campground");
let passport=require("passport");
let LocalStrategy=require("passport-local");
let seedDb=require("./seeds");
let Comment=require("./models/comment");
let User=require("./models/user");
let methodOverride=require("method-override");
let flash=require("connect-flash");

let commentRoutes=require("./routes/comments"),
	campgroundRutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index");

//seedDb();
//process.env.DATABASEURL"mongodb+srv://Anurag168:Anurag168@@cluster0.bsneg.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://inShare:T5zN4$HV-d!u4mt@cluster0.gg3gw.mongodb.net/inshare?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true }).then(() =>{
	console.log("Connected to DB");
}).catch(err => {
	console.log("ERROR:",err.message);
});



app.use(express.static(__dirname+"/public"));

app.use(methodOverride("_method"));

app.use(flash());

app.use(require("express-session")({
	secret: "Mai nhi bataunga",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyparser.urlencoded({extended: true}));

app.use(function(req,res,next){
	res.locals.currUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.set("view engine", "ejs");

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRutes);
app.use("/",indexRoutes);

/*app.listen(3000,function(){
	console.log("Server Started");
});*/
var port = process.env.PORT || 3000;

app.listen(port, function() {

console.log("Server has started!");

});
