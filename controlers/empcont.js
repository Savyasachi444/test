let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const em = require("../model/empmodel")
const nodemailer = require("nodemailer");
let add=async(req,res)=>{
    try{
        let obj=await em.findById(req.body._id)
        if(obj)
        {
            res.json({"msg":"With given email account exists"})
        }
        else{
let hashcode=await bcrypt.hash(req.body.pwd,10)
let data=new em({...req.body,"pwd":hashcode})
await data.save()
res.json({"msg":"emp record added"})
        }


    }
    catch{
        res.json({"msg":"Error in adding emp"})
    }
}

let login=async(req,res)=>{
    try
    {
        let obj=await em.findById(req.body._id)
        if(obj)
        {
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"role":obj.role,"name":obj.name,"_id":obj._id})
            }
            else{
                res.json({"msg":"check pwd"})
            }

        }
        else{
            res.json({"msg":"check email"})
        }

    }
    catch{
        res.json({"msg":"error in login"})
    }
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "irsr560@gmail.com",
    pass: "kjvsspltdgyjrdvp",
  },
});
let sendotp=async(req,res)=>{
    try{
        let obj=await em.findById(req.params.id)
        if(obj)
        {
            let num=Math.floor(Math.random()*100000)+""
            let otp=num.padEnd(5, "0")
            await em.findByIdAndUpdate({"_id":obj._id},{"otp":otp})
      let info=     await transporter.sendMail({
    from: '"Task mang portal" <irsr560@gmail.com>',
    to: obj._id,
    subject: "Password Reset",
    
    html: `<b>Your OTP to reset pwd:${otp}</b>` // HTML body
  });
  if(info.accepted.length!=0)
  {
    res.json({"msg":"otp sent"})
  }
  else{
    res.json({"msg":"error in sending otp try again"})
  }

        }
        else{
            res.json({"msg":"check email"})
        }

    }
    catch{
        res.json({"msg":"error in sending otp"})
    }
}
let votp=async(req,res)=>{
    try{
         let obj=await em.findById(req.params.id) 
         if(obj?.otp==req.params.otp)
         {
          await  em.findByIdAndUpdate({"_id":obj._id},{$unset:{"otp":""}})
            res.json({"msg":"otpvalid"})
         }
         else{
            res.json({"msg":"provide valid otp"})
         }

    }
    catch{
        res.json({"msg":"error in verifying otp"}) 
    }
}
let pwdreset=async(req,res)=>{
    try{
        let hash=await bcrypt.hash(req.body.pwd,10)
        await em.findByIdAndUpdate({"_id":req.body._id},{"pwd":hash})
        res.json({"msg":"pwd reset done"})

    }
    catch{
        res.json({"msg":"error in reseting pwd"}) 
    }


}

let getemp=async(req,res)=>{
    try{
        let data=await em.find({"dept":req.params.dept},{"name":1})
        res.json(data)

    }
    catch{
        res.json({"msg":"error in fetching emps"}) 
    }
}
module.exports={add,login,sendotp,votp,pwdreset,getemp}