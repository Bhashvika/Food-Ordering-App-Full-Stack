import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { useState } from 'react';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
const Home = () => {
  const [Category,setCategory]=useState('All');
  return (
    <div>
        <Header/>
        <Menu category={Category} setCategory={setCategory}/>
        <FoodDisplay category={Category}/>
        <AppDownload/>
    </div>
  )
}

export default Home