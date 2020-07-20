let mongoose=require("mongoose");
let passportlocalmongoose=require("passport-local-mongoose");

let userSchema=new mongoose.Schema({
	username: String,
	password: String
}); 

userSchema.plugin(passportlocalmongoose);

module.exports=mongoose.model("User",userSchema);
