import React, { useContext, useState, useEffect } from 'react'
import searchIcon from '../Images/search_icon.png'
import basketIcon from '../Images/basket_icon.png'
import profileIcon from '../Images/profile_icon.png'
import bagIcon from '../Images/bag_icon.png'
import logoutIcon from '../Images/logout_icon.png'
import sunIcon from '../Images/sun_icon.png'
import moonIcon from '../Images/moon_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from './StoreContext'
import { ThemeContext } from './ThemeContext'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home")

 const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
 const { theme, toggleTheme } = useContext(ThemeContext);
const navigate = useNavigate();

 const logout  = () => {
  localStorage.removeItem("token");
  setToken("");
  navigate("/");
 }

  return (
    <div className='navbar ${theme}'>
      <Link to="/" className="logo">
          Delecious Recipes<span class="smiley">&#128523;</span>
        </Link>
        <ul className='navbar-menu'>
        <a href="/" onClick={()=>setMenu("home")} className={menu ==="home"?"active":""}> Home</a>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu ==="menu"?"active":""}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu ==="mobile-app"?"active":""} >Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact us")} className={menu ==="contact us"?"active":""} >Contact us</a>
        
        </ul>
      <div className="navbar-right">
        <img src={searchIcon} alt="" />
        <div className="navbar-search-icon">
        <Link to="/cart"><img src={basketIcon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        :<div className='navbar-profile'>
        <img src={profileIcon} alt="" />
           <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={bagIcon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={logoutIcon} alt="" /><p>Logout</p></li>
           </ul>
        </div>}
        <div onClick={toggleTheme} className="theme-toggle">
          <img src={theme === "light" ? moonIcon : sunIcon} alt="Theme Toggle" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
