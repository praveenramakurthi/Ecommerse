import React, { useState } from 'react';
import { useCart } from './CartContext';
import Navbar from './Navbar';
import './navbar.css'; // Import the navbar CSS file
import './product.css'; // Import the CSS for total amount styling
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Load your Stripe public key
const stripePromise = loadStripe('ieugcoigoircgoe');

function UserCart() {
    const { cartItems, removeFromCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <h2 className="y-cart">Your Cart</h2>
            {cartItems.length !== 0
                ? (
                    <div>
                        <div className="total-amount-container">
                            <div className="total-amount">
                                Total Amount: ${totalAmount.toFixed(2)}
                            </div>
                            <button className='pay' onClick={() => setShowCheckout(true)}>Pay ${totalAmount.toFixed(2)}</button>
                        </div>
                        <div className='grocery-container2'>
                            {cartItems.map((item) => (
                                <div key={item.id} className="grocery-item">
                                    <img src={item.image_url} alt={item.name} className="grocery-image" />
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>${item.price.toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        {showCheckout && (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>
                )
                : <h2>No Items Available</h2>
            }
        </div>
    );
}

export default UserCart;
