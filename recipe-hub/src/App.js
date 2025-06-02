import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LearnMore from './Components/LearnMore'
import Home from './Home'
import Favorite from './Components/Favorite'
import About from './Components/About'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learnmore/:id" element={<LearnMore />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  )
}

export default App