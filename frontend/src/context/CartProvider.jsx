/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const existingCart = localStorage.getItem("cart");
        if (existingCart) {
            setCart(JSON.parse(existingCart))
        }
    }, [])

    return (
        <>
            <CartContext.Provider value={[cart, setCart]}>
                {children}
            </CartContext.Provider>
        </>
    );
}

// Custom hook
const useCart = () => useContext(CartContext)

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart }