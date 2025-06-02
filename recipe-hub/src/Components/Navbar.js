import React from 'react'
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa'


const Navbar = () => {

  const handleNewMeal = () => {
    const meal = localStorage.getItem("cacherecipe")
    if (meal) {
      localStorage.removeItem("cacherecipe")
      window.location.reload();
    }
  }
  return (
    <div className='navbody'>
      <div className='navbar'>
      <h1 className='heading'> Easy Recipes </h1>
          <a href='/'>Home</a>
          <a href='/favorites'>Favorites</a>
          <a href='/about'>About</a>      
          <a href='/' className='refresh' onClick={handleNewMeal}> New Recipes</a>
        <input type="text" placeholder="Search Your Favorite  " />     
        
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="icon facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon twitter" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterestP className="icon pinterest" />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Navbar