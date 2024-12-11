import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cartpage');
    }
  }, [token, getTotalCartAmount, navigate]);

  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let iteminfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(iteminfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      console.log("Response data:", response.data);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message); 
      }
    } catch (error) {
      console.log(error);
      alert("Error: " + error.message); 
    }
  };

  return (
    <form className='Placeorder' onSubmit={placeorder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First Name' name="firstName" value={data.firstName} onChange={onChangeHandler} />
          <input required type="text" placeholder='Last Name' name="lastName" value={data.lastName} onChange={onChangeHandler} />
        </div>
        <div className='multi-fields'>
          <input required type="text" placeholder='Email Address' name="email" value={data.email} onChange={onChangeHandler} />
          <input required type="text" placeholder='Street' name="street" value={data.street} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='City' name="city" value={data.city} onChange={onChangeHandler} />
          <input required type="text" placeholder='State' name="state" value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='Zipcode' name="zipcode" value={data.zipcode} onChange={onChangeHandler} />
          <input required type="text" placeholder='Country' name="country" value={data.country} onChange={onChangeHandler} />
        </div>
        <input required type='text' placeholder='Phone' name="phone" value={data.phone} onChange={onChangeHandler} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
