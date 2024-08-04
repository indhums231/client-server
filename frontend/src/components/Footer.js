import React from 'react'
import facebook_icon from '../Images/facebook_icon.png'
import twitter_icon from '../Images/twitter_icon.png'
import linkedin_icon from '../Images/linkedin_icon.png'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <a href="/" className="logo">
          Delicious Recipes<span class="smiley">&#128523;</span>
        </a>
        <p>Our recipe book offers diverse, easy-to-follow recipes from around the world, catering to all dietary needs. Enjoy healthy, innovative dishes with clear instructions and beautiful photos.</p>
        <div className='footer-social-icons'>
            <img src={facebook_icon} alt="" />
            <img src={twitter_icon} alt="" />
            <img src={linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>indhu.bloomtechnosys@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 &copy; Delicious Recipes.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
