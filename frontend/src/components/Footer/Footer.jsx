import React from 'react'
import { assets } from '../../assets/assets'
import '../Footer/Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <h1>Foodie <br /><span> Fleet</span></h1>
                <p>Foodie Fleet is your ultimate food exploration companion, offering a diverse array of culinary experiences right at your fingertips. Discover new flavors, cuisines, and dining spots with ease, as our app connects you to a fleet of delectable options in your area. Whether you're craving exotic cuisines or local delicacies, Foodie Fleet has you covered. Download now and embark on a journey of gastronomic delight!"</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>AbouT US</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-478-986-9087</li>
                    <li>FoodieFleet@gmail.com</li>
                </ul>
            </div> 
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024@ Foodie Fleet.com -All right Reserved
        </p>
    </div>

  )
}

export default Footer