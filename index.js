const express = require("express");
const app = express();
const port =8080;
const path= require("path");
const mongoose = require("mongoose");
const Login = require("./models/login");
const Chat = require("./models/chat");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError");

app.set("views","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

async function main(){
    await mongoose.connect("mongodb://localhost:27017/ChatWave");
}
main()
.then((res)=>{
    console.log("MondoDB connected successfully");
})
.catch((err)=>{
    console.log("Not connected");
})

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e=>next(e));
    }

}

app.get("/",(req,res)=>{
    res.render("login.ejs");
});

app.get("/chatwave/Registration",(req,res)=>{
    res.render("registration.ejs");
});

app.post("/chatwave",async (req,res)=>{
    let {username:name,email:em,password:pass} = req.body;
    let data=await Login.findOne({$and:[{username:name},{email:em},{password:pass}]});
    if(data){
        res.render("home.ejs",{data})
    }
    else{
        res.render("alert.ejs");
    }
});

app.post("/chatwave/registration",async (req,res)=>{
    
    let {username,email,password}=req.body;
    
    let user=new Login({username:username,email:email,password:password,created:new Date()});
    user.save();
    
    // res.render("success.ejs");
});

app.get("/chatwave/:username/send",async (req,res)=>{
    let {username:name}=req.params;
    let data = await  Login.findOne({username:name});
    res.render("send.ejs",{data});
})
/**error */
app.put("/chatwave/:username",async (req,res)=>{
    let {username:name}=req.params;
    let {to,msg}=req.body;
    let data=await Login.findOne({username:name});

    let chatdata= await new Chat({username:data.username,email:data.email,password:data.password,to:to,msg:msg,created:new Date()});
    chatdata.save();
    res.send("Message send Successfully");
});

app.get("/chatwave/:username/show",async (req,res)=>{
    let {username:name}=req.params;
    let sendData= await Chat.find({username:name});
    if(sendData){

        res.render("show.ejs",{sendData});
    }
    else{
        res.send("You have no data");
    }
    
})


app.get("/chatwave/:id/edit",(req,res)=>{
    let {id}=req.params;
    res.render("edit.ejs",{id});
});

app.patch("/chatwave/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let data=await Chat.findByIdAndUpdate(id,{msg:msg,created:new Date()},{new:true});
    console.log(data);
    res.send("Edited");
})

app.delete("/chatwave/:id",async (req,res)=>{
    let {id}=req.params;
    let data=await Chat.findByIdAndDelete(id);
    res.send("Deleted");
});

app.use((err,req,res,next)=>{
    let {status=500,message="Some Error"} = err;
    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log(`Port is listening on : ${port}`);
})
