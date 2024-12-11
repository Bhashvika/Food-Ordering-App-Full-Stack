import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodrouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
//app config
const app=express();
const port=process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())
//database connection
connectDB();
//api end points
app.use("/api/food",foodrouter);
app.use("/images",express.static(`uploads`))
app.use("/api/user",userRouter);
app.use('/api/cart',cartRouter);
app.use("/api/order",orderRouter);
app.get('/',(req,res)=>{
    res.send("Api working")
})
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port} `)
})
