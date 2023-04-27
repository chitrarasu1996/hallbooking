
require("dotenv").config();
// const cors=require("cors");
const router=require("./routes/router")
const express=require("express");
const app=express();
// const cors=require("cors");
//middleware
app.use(express.json());
app.use(router)


const port =process.env.port||4001;

app.listen(port,()=>{
    console.log("port is running")
})

