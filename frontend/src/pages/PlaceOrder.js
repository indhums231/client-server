import React, { useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { StoreContext } from '../components/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

const {getTotalCartAmount,token,food_list,cartItems,url, setFoodList, setCartItems, setToken} = useContext(StoreContext);
const navigate = useNavigate();


const [data,setData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder = async (event) => {
  event.preventDefault();
  let orderItems = [];
  food_list.forEach((item) => { 
    if (cartItems[item._id] > 0) {
      let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
  }
  try {
    let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  } catch (error) {
    console.error("Order placement error:", error);
    alert("Error placing order");
  }
}

const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  } catch (error) {
    console.error("Error fetching food list:", error);
  }
};

const loadCartData = async (token) => {
  try {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    setCartItems(response.data.cartData);
  } catch (error) {
    console.error("Error loading cart data:", error);
  }
};

useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
    }
  }
  loadData();
}, [fetchFoodList, loadCartData, setToken]);

useEffect(() => {
  if (!token || getTotalCartAmount() === 0) {
    navigate('/cart');
  }
}, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input  required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
                    <p>Subtotal</p>
                     <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
