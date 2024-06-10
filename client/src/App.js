// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCart from './Components/UserCart';
import LandingPage from './Components/LandingPage';
import SignIn from './Components/SignIn';
import { CartProvider } from './Components/CartContext';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/ekart" element={<LandingPage />} />
          <Route path="/usercart" element={<UserCart />} />
        </Routes >
      </Router>
    </CartProvider>

  );
}

export default App;
