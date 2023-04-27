
require("dotenv").config();
// const cors=require("cors");
const router=require("./routes/router")
const express=require("express");
const cors=require("cors")
const app=express();
// const cors=require("cors");
//middleware
app.use(express.json());
app.use(cors());
app.use(router)


const port =process.env.port||4001;

app.listen(port,()=>{
    console.log("port is running")
})

