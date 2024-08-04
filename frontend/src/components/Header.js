import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to statisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <Link to="/Recipes" className="view-recipes">
          <button className="view-recipes-button">View Recipes</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
