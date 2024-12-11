import OrderModel from "../models/OrderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url ="http://localhost:3000";

const placeorder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        
        await newOrder.save();

        // Clear user's cartData after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData: {} } });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,  // Convert price to cents for USD
            },
            quantity: item.quantity,
        }));
        
        // Add delivery charge in USD
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 1000,  // 10 USD in cents
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);  // More descriptive error
        res.status(500).json({ success: false, message: "Failed to place order. Please try again later." });
    }
};

const verifyorder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: "paid" });
        } else {
            await OrderModel.findByIdAndDelete(orderId);
            res.status(200).json({ success: false, message: "not paid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.body.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "error" });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};
//updating order status
const updatestatus = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating status", error: error.message });
    }
};

export { placeorder, verifyorder, userOrders, listOrders,updatestatus };
