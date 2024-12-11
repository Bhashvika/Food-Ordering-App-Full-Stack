import React, { useContext, useState} from 'react';
import "../Login-popup/Login.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = ({ setShowlogin }) => {
  const {url,setToken}=useContext(StoreContext)
  
    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };
    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currentState === 'Login') { // Compare with string 'Login'
          newUrl += "/api/user/login";
      } else {
          newUrl += "/api/user/register";
      }
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowlogin(false);
          
      } else {
          toast.error(response.data.message);
      }
  };
  

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? null : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='your password ' required />
                </div>
                <button type="submit" >{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentState === 'Login' ? (
                    <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default Login;
