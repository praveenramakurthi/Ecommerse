import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct module for React 18
import './index.css';
import App from './App';
import { CartProvider } from './Components/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render(
  <React.StrictMode>
      <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
