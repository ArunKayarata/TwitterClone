const router=require('express').Router();
const Tweet=require('../Models/TweetsModel')

const authMiddleware=require('../MiddleWares/UserAuth.js')

router.post('/',authMiddleware,async(req,res)=>{
    const {userId,content}=req.body
    console.log("userId, content",userId,content)
    try{
        const tweet=new Tweet({userId:userId , text:content});
        await tweet.save();
        return re.status(201).json({
            success:true,
            message:"Tweet posted succesfully"
        })

    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message
        })
    }

})
module.exports=router;