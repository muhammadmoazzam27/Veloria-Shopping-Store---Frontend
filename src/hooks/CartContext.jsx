import { createContext, useContext, useEffect, useState } from 'react'

const Cart = createContext();

const CartContext = ({ children }) => {

    const [products, setProducts] = useState([])

    const getProducts = () => {

        const allProducts = JSON.parse(sessionStorage.getItem("AllProducts"));
        setProducts(allProducts);

    }

    useEffect(() => {
        getProducts();
    }, [])


    const addToCart = (product) => {
        console.log("Product : ", product);
    }



    return (
        <Cart.Provider value={{...products, addToCart }}>
            {children}
        </Cart.Provider>
    )
}

export default CartContext

export const useCartContext = () => useContext(Cart);