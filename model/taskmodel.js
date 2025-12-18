let mongoose=require("mongoose")
let tsch=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "dept":String,
    "status":{
        type:String,
        default:"created"
    },
    "eid":String
})
let tm=mongoose.model("task",tsch)
module.exports=tm