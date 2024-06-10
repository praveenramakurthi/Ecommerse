import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');

    const filterProducts = (products) => {
        let filtered = products;

        if (category !== 'all') {
            filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
        }

        if (searchQuery) {
            filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return filtered;
    };

    const addToCart = (item) => {
        setCartItems((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (item) => {
        setCartItems((prevCart) => prevCart.filter(cartItem => cartItem.id !== item.id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, searchQuery, setSearchQuery, removeFromCart, setCategory, filterProducts }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

export default CartContext;
