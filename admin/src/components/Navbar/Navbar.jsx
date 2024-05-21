import React from 'react'
import "./Navbar.css";
import { assets } from '../../assets/assets';
const Navbar = () => {
  return (
    <div className='navbar'>
        <h1>FOODIE <br /><span>FLEET</span><p style={{fontSize:"20px",marginLeft:"50px"}}>Admin panel</p></h1>
        <img src={assets.profile_image} alt=""/>
    </div>
  )
}

export default Navbar