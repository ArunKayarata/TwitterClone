const jwt=require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req,res,next){
    console.log("token",req.header('Authorization').split(" ")[1].trim());
    try{
        const token=req.header('Authorization').split(" ")[1].trim();
      
        const verifytoken=jwt.verify(token, process.env.JWT_SECRETKEY);
        req.body.userId=verifytoken.userId;
        next();

    }catch(err){
        res.status(404).send({
            success: true,
            message: "Invalid token",
          })
    

    }
}
