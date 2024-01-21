const express = require("express");
const path = require('path');
const bcrypt = require('bcrypt');
const collection =require('./config');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//set EJS use as view engine
app.set('view engine','ejs');

app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('login');
});


app.get("/signup",(req,res)=>{
    res.render('signup');
});

app.post("/signup", async(req,res)=>{
    const data ={
        name: req.body.username,
        password: req.body.password,
    }
    const existingData = await collection.findOne({name:data.name});
    if(existingData){
        res.send("User already exit choose another user name")
    }else{
        //password complexity
        const saltPassword = 10;
        const hashPassword = await bcrypt.hash(data.password, saltPassword);
        data.password = hashPassword;
        const UserData = await collection.insertMany(data);
        console.log(UserData);
    }
})

app.post("/login", async(req,res)=>{
    try {
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }else{
            res.send("wrong password");
        }
    } catch (error) {
        res.send("wrong details");
    }
})

const port = 5000;
app.listen(port,() =>{
    console.log(`server running on port: ${port}`);
});