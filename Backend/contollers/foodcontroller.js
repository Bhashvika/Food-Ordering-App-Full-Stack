import foodModel from "../models/foodmodel.js";
import fs from 'fs'

//add food item
const addFood = async (req, res) => {
  try {
      let image_filename = `${req.file.filename}`;
      const food = new foodModel({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: image_filename
      });

      // Use await to wait for the save operation to complete
      await food.save();
      
      res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Failed to add food" });
  }
};
//all food list
const listFood=async (req,res)=>{
     try{
      const foods=await foodModel.find({});
      res.json({success:true,data:foods})
     }
     catch(error){
      console.log(error);
      res.json({success:false,message:"error"})
     }
}
//remove food item
const removeFood=async(req,res)=>{
    try{
      const id=req.body.id;
      const food=await foodModel.findById(id);
      fs.unlink(`uploads/${food.image}`,()=>{})
      await foodModel.findByIdAndDelete(id)
      res.json({success:true,message:"Food removed"})
    }
    catch(error){
       console.log(error);
       res.json({success:false,message:"error"})
    }
}
export {addFood,listFood,removeFood}
