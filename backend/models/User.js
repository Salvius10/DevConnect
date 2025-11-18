const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{type:String , required:True},
    email:{type:String , required:True , unique:True},
    password:{type:String , required:True},
    bio:{type:String , default:""},
    skills:{type:[String], default:[]},
    location:{type:String, default:""},
    github:{type:String, default:""},
    profilephoto:{type:String, default:""},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
},{timestamps:True})

module.exports=mongoose.model("User",UserSchema)