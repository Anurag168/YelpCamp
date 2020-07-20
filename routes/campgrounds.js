let express=require("express");
let router=express.Router();
let Campground=require("../models/campground");
let middlleware=require("../middleware");

router.get("/",function(req,res){
	Campground.find({},function(err,allCamps){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("campground/index",{camps: allCamps});
		}
	})
});

router.post("/", middlleware.isLoggedIn, function(req,res){
	let name=req.body.name;
	let price=req.body.price;
	let image=req.body.image;
	let description=req.body.description;
	let author={
		id: req.user._id,
		username: req.user.username
	}
	Campground.create({
	name: name, 
	price: price,
	image: image,
	description: description,
	author: author}
,function(err,campground){
	if(err)
	{
		console.log(err);
	}
	else{
		res.redirect("/campgrounds");
	}
});
	
});

router.get("/new", middlleware.isLoggedIn, function(req,res){
	res.render("campground/new");
});

router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err)
		{
			res.redirect("/campgrounds");
		}
		else{
			res.render("campground/show",{campground: foundCamp});
		}
	})
});

router.get("/:id/edit", middlleware.checkOwnership ,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
	res.render("campground/edit",{campground: foundCamp});
	});
});

router.put("/:id", middlleware.checkOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCamp){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/:id",middlleware.checkOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	})
})

module.exports=router;
