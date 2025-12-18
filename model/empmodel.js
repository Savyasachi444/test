let mongoose=require("mongoose")
let esch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "dept":String,
    "role":{
        type:String,
        default:"emp"
    },
    "otp":String
})
let em=mongoose.model("empreg",esch)
module.exports=em