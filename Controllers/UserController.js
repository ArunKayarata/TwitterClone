const router=require('express').Router();
const User=require('../Models/UserModel')
const Tweet=require('../Models/TweetsModel')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const authMiddleware=require('../MiddleWares/UserAuth.js')


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userexists=await User.findOne({username:req.body.username});
    console.log(req.body.username);
 
    try {
        if(userexists){
            console.log("usersexusts" ,userexists);
           return  res.status(201).json({
                sucess:true,
                message:"User already Exists"
            })
        }
        
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      console.log(user)
      await user.save();
      res.status(201).json({ message: 'User registered successfully',sucess:true ,data:user});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(403).json({
                success:true,
                message:"User does not exists"
                
            })
        }

        const verify= await bcrypt.compare(password,user.password);
        console.log("verify",verify);
        if(!verify){
            return res.status(201).json({
                success:true,
                message:"provided Password is incorrect"

            })
        }
        const token=jwt.sign({username:username, userId: user._id},process.env.JWT_SECRETKEY,{expiresIn:"1d"})

        return res.status(201).json({
            success:true,
            message:"Login Succesfull",
            token:token
        })


    }catch(err){
        return res.status(403).send({
            sucess:true,
            message:"Error while login please try again"
        })
    }
  })


  router.get('/:userId/timeline', authMiddleware, async (req, res) => {
    const { userId } = req.params;
    const { cursor } = req.query; 
    const limit = 10; 
  
    try {

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
   
      let query = { userId: user._id };
      if (cursor) {
        query._id = { $lt: cursor };
      }
  
      const tweets = await Tweet.find(query)
        .sort({ _id: -1 }) 
        .limit(limit);
      const nextCursor = tweets.length ? tweets[tweets.length - 1]._id : null;
  
      res.status(200).json({ success: true, tweets, nextCursor });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  });


module.exports=router;