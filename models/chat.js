const mongoose= require("mongoose");

const  chatSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true,
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:1000
    },
    created:{
        type:Date
    },
});

const Chat = new mongoose.model("Chat",chatSchema);

module.exports=Chat;