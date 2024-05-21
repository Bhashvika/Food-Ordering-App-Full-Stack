import React, { useContext } from 'react'
import '../foodDisplay/FoodDisplay.css';
import FoodItem from '../foodItem/FoodItem';
import { StoreContext } from '../../context/Storecontext';

const FoodDisplay = ({category}) => {
    const {food_list,token}=useContext(StoreContext)
  return (
    <div className='fooddisplay' id="fooddisplay">
        <h2>Top dishes you would like..</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              console.log(category,item.category)
              if(category==='All' || category===item.category){
                if(token){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
                }
                
              }
               
            })}
        </div>
    </div>
  )
}

export default FoodDisplay;