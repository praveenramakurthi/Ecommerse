import React from 'react'
import Navbar from './Navbar';
import Products from './Products';
import SignIn from './SignIn';
function LandingPage() {
  return (
    <div>
      <Navbar/>
      <Products style={{position: 'absolute'}}/>
    </div>
  )
}

export default LandingPage
