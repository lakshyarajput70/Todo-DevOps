const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Todo Schema */
const Todo = mongoose.model("Todo",{
  text: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

/* Health check */
app.get("/", (req,res)=>{
  res.send("Backend Running");
});

/* Create Todo */
app.post("/api/todos", async (req,res)=>{
  const todo = await Todo.create(req.body);
  res.json(todo);
});

/* Get Todos */
app.get("/api/todos", async (req,res)=>{
  const todos = await Todo.find().sort({createdAt:-1});
  res.json(todos);
});

/* Update Todo */
app.put("/api/todos/:id", async (req,res)=>{
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  );
  res.json(todo);
});

/* Delete Todo */
app.delete("/api/todos/:id", async (req,res)=>{
  await Todo.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
