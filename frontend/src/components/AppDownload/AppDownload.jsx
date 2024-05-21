import React from 'react'
import "../AppDownload/AppDownload.css";
import { assets } from '../../assets/assets';
const AppDownload = () => {
  return (
    <div className='Appdownload' id="Appdownload">
        <p>To get Better Experience Download <br/> Foodie Fleet App</p>
        <div className='app-download-img'>
            <img src={assets.play_store} alt="" /><img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload