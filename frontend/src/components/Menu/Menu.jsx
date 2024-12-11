import React from 'react'
import "./Menu.css";
import {menu_list} from '../../assets/assets';
const Menu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Good food is the foundation of happiness,Eat well, live well, be well.Food is like art;<br/><span>you can create anything with the right ingredients.</span></p>
        <div className='explore-menu-list'>
            {
                menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} className='explore-menu-listitem' key={index}>
                              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                              <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
            
        </div>
       <hr />
    </div>
  )
}

export default Menu;