import React from 'react'
import '../App.css'
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa'
import Navbar from './Navbar'

const About = () => {
    return (
      <>
          <Navbar />

      <div className="about">
      <div className="abtcontent">
        <h1>About Our Food Recipe App 🍲</h1>
        <p>
          Welcome to our <strong>Food Recipe Explorer</strong> – a responsive and interactive web app
          that lets you discover, learn, and share delicious recipes from around the world. Powered by
          a public recipe API, this platform offers a delightful cooking experience whether you’re a
          home chef or a foodie.
        </p>

        <h2>✨ Key Features:</h2>
        <ul>
          <li>🌐 Browse random recipes on the homepage</li>
          <li>🔍 Search your favorite recipes by keywords</li>
          <li>📸 View detailed recipe pages with images, ingredients, and instructions</li>
          <li>🎠 Enjoy a recipe carousel to discover more</li>
        </ul>

        <h2>📲 Connect with us on social media:</h2>
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
            </>

  )
}

export default About
