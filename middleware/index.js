let Campground=require("../models/campground");
let Comment=require("../models/comment");

let middlleware={};

middlleware.checkCommentOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}	
			else{
				if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }

				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}

middlleware.checkOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCamp){
			if(err){
				req.flash("error","Campgroundnot found");
				res.redirect("back");
			}	
			else{
				if (!foundCamp) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }

				if(foundCamp.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}

middlleware.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated())
	{
		return next();	
	}
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login");
}

module.exports= middlleware;