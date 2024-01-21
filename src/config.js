const mongoose =require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/book");

connect.then(()=>{
    console.log("Database connected to successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
});

//create schema
 const Loginschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
 })

 //Collection part
const collection = new mongoose.model("author",Loginschema);

module.exports=collection;
