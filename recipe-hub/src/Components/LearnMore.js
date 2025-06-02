import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const LearnMore = () => {
  const { state } = useLocation()
  const recipe = state?.meal

  const [fav, setFav] = useState(() => {
    const favlist = JSON.parse(localStorage.getItem('fav')) || []
    return favlist.includes(recipe?.idMeal)
  })

  if (!recipe) {
    alert("Didn't fetch the data")
    return null
  }

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`)
    }
  }

  const makeFavorite = () => {
    const mealid = recipe.idMeal
    let favlist = JSON.parse(localStorage.getItem('fav')) || []

    if (favlist.includes(mealid)) {
      favlist = favlist.filter(id => id !== mealid)
      setFav(false)
    } else {
      favlist.push(mealid)
      setFav(true)
    }
    localStorage.setItem("fav", JSON.stringify(favlist))
  }


  return (
    <div className='learnbdy'>
      <Navbar />
      <div className='data'>
        <div className='data1'>
          <div>
            <img alt="mealpicture" src={recipe.strMealThumb} />
          </div>
          <div className='data2'>
            <h1>{recipe.strMeal}</h1>
            <h2>Food Category: {recipe.strCategory}</h2>
            <h2>Origin: {recipe.strArea}</h2>
              <a href={recipe.strYoutube} className='utube' >Watch on YouTube</a>
          </div>
        </div>

        <h3>Ingredients</h3>
        <ul className='ingredients'>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p className='making'>{recipe.strInstructions}</p>

        <div className="learnmorebtn">
          <button className='favorite' onClick={makeFavorite} style={{ backgroundColor: fav ? 'red' : 'gray' }}>
            {fav ? 'Unfavorite' : 'Make Favorite'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnMore
