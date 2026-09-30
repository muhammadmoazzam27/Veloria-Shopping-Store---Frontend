import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Cart = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CartContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getAllProducts = () => {
    try {
      const allProducts = JSON.parse(sessionStorage.getItem("AllProducts")) || [];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error parsing sessionStorage products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (product) => {
    const pId = product.id;

    const cartItem = {
      product_id: pId,
      admin_uid: product.uid,
      title: product.title,
      price: Number(product.price) || 0,
      imageURL: product.imageURL,
      quantity: 1,
    };

    setCart((prevCart) => {

      const currentCart = Array.isArray(prevCart) ? prevCart : [];
      const existingProduct = currentCart.find((item) => item.product.id === pId);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.product_id === pId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, cartItem];
      }
    });
  };

  // MongoDB Mein Backend Order Send Karne Ka Function
  const checkoutOrder = async (singleProduct = null) => {
    try {
      const token = localStorage.getItem('jwtToken');
      
      // Agar direct 1 product click hua ho
      const itemsToOrder = singleProduct ? [{
        product_id: singleProduct._id || singleProduct.id,
        admin_uid: singleProduct.uid || singleProduct.admin_id || "",
        title: singleProduct.title,
        price: Number(singleProduct.price) || 0,
        imageURL: singleProduct.imageURL || singleProduct.image || "",
        quantity: 1
      }] : cart;

      if (itemsToOrder.length === 0) {
        alert("Cart is empty!");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/orders/create-order`,
        { cartItems: itemsToOrder },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Order placed successfully!");
        if (!singleProduct) setCart([]); // Multi-item cart checkout par reset karein
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert(error.response?.data?.message || "Order placement failed");
    }
  };

  return (
    <Cart.Provider value={{ products, cart, addToCart, checkoutOrder }}>
      {children}
    </Cart.Provider>
  );
};

export default CartContext;
export const useCartContext = () => useContext(Cart);