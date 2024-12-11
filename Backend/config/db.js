import mongoose from "mongoose";
export const connectDB=async ()=>{
     await mongoose.connect('mongodb+srv://bhashvika:9618487809@cluster0.992fxxi.mongodb.net/Food-Delivery')
     .then(()=>console.log("database connected"))
}
