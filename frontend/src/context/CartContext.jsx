import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems,setCartItems] = useState([]);

const fetchCart = async () => {

try{

const token = localStorage.getItem("token");

if(!token){
setCartItems([]);
return;
}

const res = await fetch("http://localhost:5000/api/cart/my",{
headers:{
Authorization:`Bearer ${token}`
}
});

if(!res.ok){
setCartItems([]);
return;
}

const data = await res.json();

setCartItems(data.items || []);

}catch(err){

console.log("cart load failed",err);
setCartItems([]);

}

};


/* ===== load cart when app starts ===== */

useEffect(()=>{
fetchCart();
},[]);


/* ===== helper to refresh cart ===== */

const refreshCart = () => {
fetchCart();
};


return(

<CartContext.Provider value={{
cartItems,
setCartItems,
refreshCart
}}>

{children}

</CartContext.Provider>

);

};