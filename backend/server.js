const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//Allow multiple origins
const allowedOrigins = ['http://localhost:5173','https://todo-dev-ops.vercel.app/']

const app=express();
app.use(cors({origin:allowedOrigins , credentials :true}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo connected"));


const Todo = mongoose.model("Todo",{
 text:String,
 priority:String,
 completed:{type:Boolean,default:false},
 createdAt:{type:Date,default:Date.now}
});

app.post("/todos",async(req,res)=>{
 const todo=await Todo.create(req.body);
 res.json(todo);
});

app.get("/todos",async(req,res)=>{
 const todos=await Todo.find();
 res.json(todos);
});

app.put("/todos/:id",async(req,res)=>{
 const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
 res.json(todo);
});

app.delete("/todos/:id",async(req,res)=>{
 await Todo.findByIdAndDelete(req.params.id);
 res.json({message:"deleted"});
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000);
