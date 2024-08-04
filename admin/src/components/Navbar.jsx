import React from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="/" className="logo">
          Delecious Recipes<span class="smiley">&#128523;</span>
        </a>
      <img className='profile' src={assets.profile} alt="" />
    </div>
  )
}

export default Navbar
