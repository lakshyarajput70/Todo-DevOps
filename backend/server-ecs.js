const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Todo = mongoose.model("Todo",{
  text:String,
  completed:{type:Boolean,default:false},
  createdAt:{type:Date,default:Date.now}
});

app.get("/health",(req,res)=>{
  res.status(200).send("OK");
});

app.post("/api/todos",async(req,res)=>{
  const todo=await Todo.create(req.body);
  res.json(todo);
});

app.get("/api/todos",async(req,res)=>{
  const todos=await Todo.find().sort({createdAt:-1});
  res.json(todos);
});

app.put("/api/todos/:id",async(req,res)=>{
  const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.json(todo);
});

app.delete("/api/todos/:id",async(req,res)=>{
  await Todo.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0",()=>console.log(`Server running on ${PORT}`));
