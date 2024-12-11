import express from "express";
import { addFood, listFood, removeFood } from "../contollers/foodcontroller.js";
import multer from "multer";
import path from "path";

const foodrouter=express.Router();
const storage=multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads');
      },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})
foodrouter.post('/add',upload.single('image'),addFood)
foodrouter.get('/list',listFood)
foodrouter.post('/remove',removeFood)









export default foodrouter;