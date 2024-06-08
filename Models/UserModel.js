const mongoose=require('mongoose');



const UserSchema=new mongoose.Schema({
    username:{
        require:true,
        type:String,
        unique:true,
        index:true
    },
    password:{
        type:String,
        require :true,
        unique:true,
        index:true
    }
})

module.exports= mongoose.model('User',UserSchema);