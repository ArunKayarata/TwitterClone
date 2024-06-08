const router=require('express').Router();
const Tweet=require('../Models/TweetsModel')

const authMiddleware=require('../MiddleWares/UserAuth.js')

router.post('/',authMiddleware,async(req,res)=>{
    const {userId,text}=req.body
    console.log("userId, content",userId,text)
    try{
        const tweet=new Tweet({userId:userId , text:text});
        await tweet.save();
        return res.status(201).json({
            success:true,
            message:"Tweet posted succesfully"
        })

    }catch(err){
        return res.status(500).json({
            success:true,
            message:"error while tweeting"
        })
    }

})
module.exports=router;