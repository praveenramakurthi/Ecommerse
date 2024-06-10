import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import ScrollingHeadlines from './ScrollingHeadlines';
function Navbar() {
    const { cartItems, setSearchQuery, setCategory } = useCart();

    const handleClick = () => {
        window.location.reload();
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className='navbar-section'>
            <div className="title" onClick={handleClick}>
                <h2>EKart</h2>
            </div>
            <div className="category-dropdown">
                <select onChange={handleCategoryChange}>
                    <option value="all">All Categories</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                </select>
            </div>
            <div className='search'>
                <input
                    type="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Products,Brands and More"
                />
            </div>
            <div className='user-details'>
                <div className='signin'>
                    <FontAwesomeIcon icon={faUser} />
                    <Link to="/" className="login-link"> Login</Link>
                </div>
                {/* <div className='signup'>Sign Up</div> */}
            </div>
            <div>
                <Link to='/UserCart'>
                    <div className='cart'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>{cartItems.length}</span>
                    </div>
                </Link>
            </div>
            <ScrollingHeadlines/>
        </div>
    )
}

export default Navbar;
