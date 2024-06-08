const mongoose=require('mongoose');
const {Schema}=mongoose;
const User=require('./UserModel.js');

const TweetSchema=new  Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    text:{
        type:String,
        required:true,  
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        index:true
    }

})
TweetSchema.index({ userId: 1, createdAt: -1 });
module.exports=mongoose.model('Tweet',TweetSchema);