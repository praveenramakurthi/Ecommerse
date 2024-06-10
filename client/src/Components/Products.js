import React, { useEffect, useState } from 'react';
import groceryData from '../data/grocery'; // Ensure the data file path is correct
import './product.css';
import { useCart } from './CartContext';

export default function GroceryList() {
    const { addToCart, searchQuery, setCategory, filterProducts } = useCart();
    const [filteredGroceryData, setFilteredGroceryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Set loading state to true when query changes
        // Simulate data fetching delay
        setTimeout(() => {
            const filteredData = filterProducts(groceryData);
            setFilteredGroceryData(filteredData);
            setLoading(false); // Set loading state to false after data fetching
        }, 0);
    }, [searchQuery, setCategory, filterProducts]);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className="grocery-container">
            {filteredGroceryData.map(item => (
                <div key={item.id} className="grocery-item">
                    <img src={item.image_url} alt={item.name} className="grocery-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
