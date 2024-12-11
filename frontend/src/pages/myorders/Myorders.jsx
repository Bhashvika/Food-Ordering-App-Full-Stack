import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Myorders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    return (
        <div className='my-orders'>
            <div className="container">
                {data.map((order) => (
                    <div className='my-orders-order' key={order._id}>
                        <img src={assets.parcel_icon} alt="Parcel icon" />
                        <p>{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</p> 
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Myorders;
