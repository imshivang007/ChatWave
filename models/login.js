const mongoose= require("mongoose");

const  loginSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true,
    },
    created:{
        type:Date
    }
});

const Login = new mongoose.model("Login",loginSchema);

module.exports=Login;