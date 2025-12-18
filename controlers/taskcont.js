const tm = require("../model/taskmodel")
let {v4:uuid}=require("uuid")

let addtask=async(req,res)=>{
    try{
        let data=new tm({...req.body,"_id":uuid()})
        await data.save()
        res.json({"msg":"task added"})

    }
    catch{
        res.json({"msg":"error in adding task"})
    }
}
let admindisp=async(req,res)=>{
    try{
let data=await tm.aggregate([{$sort:{"status":1}}])
res.json(data)
    }
    catch{
        res.json({"msg":"error fetching tasks"})
    }
}
let empdisp=async(req,res)=>{
    try{
let data=await tm.find({"eid":req.params.eid})
res.json(data)
    }
    catch{
        res.json({"msg":"error fetching tasks"})
    }
}

let updstatus=async(req,res)=>{
    try{
        await tm.findByIdAndUpdate({"_id":req.params.tid},{"status":req.params.st})
        res.json({"msg":"task status changed"})

    }
    catch{
         res.json({"msg":"error updating tasks"})
    }
}
let del=async(req,res)=>{
    try{
        await tm.findByIdAndDelete(req.params.tid)
        res.json({"msg":"task del"})
    }
    catch{
         res.json({"msg":"error in del"})
    }
}
module.exports={addtask,admindisp,empdisp,updstatus,del}