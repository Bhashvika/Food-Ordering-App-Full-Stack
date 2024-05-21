import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cartpage from './pages/Cartpage/Cartpage';
import Placeorder from './pages/placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import Login from './components/Login-popup/Login';
import { useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verification from './pages/verify/Verification';
import Myorders from './pages/myorders/Myorders';

function App() {
  const[showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin?<Login setShowlogin={setShowLogin}/>:<></>}
     <div className="App">
      <Navbar setShowlogin={setShowLogin}/>
      <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/Cartpage' element={<Cartpage/>}/>
        <Route path='/placeorder' element={<Placeorder/>}/>
        <Route path='/verify' element={<Verification/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
       
      </Routes>
    </div>
    <Footer/>
    </>
    
   
  );
}

export default App;
