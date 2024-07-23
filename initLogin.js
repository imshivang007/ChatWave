const mongoose = require("mongoose");
const Login = require("./models/login");

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

let data=[{
    username:"Shivang",
    email:"shiv@gmail.com",
    password:1234,
    created:new Date()
},
{
    username:"Shreya",
    email:"shreya@gmail.com",
    password:1234,
    created:new Date()
},
{
    username:"Sid",
    email:"sid@gmail.com",
    password:1234,
    created:new Date()
},
{
    username:"Shubhi",
    email:"shubhi@gmail.com",
    password:1234,
    created:new Date()
}]


Login.insertMany(data);

