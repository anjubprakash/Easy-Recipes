import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Favorite = () => {
  const [favMeals, setFavMeals] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      const favIds = JSON.parse(localStorage.getItem("fav")) || []

      const fetches = favIds.map(id =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json())
      )

      try {
        const results = await Promise.all(fetches)
        const meals = results.map(result => result.meals[0])
        setFavMeals(meals)
      } catch (err) {
        console.error("Failed to fetch favorites:", err)
      }
    }

    fetchFavorites()
  }, [])

  const removeFavorite = (id) => {
    const updatedFavIds = JSON.parse(localStorage.getItem("fav")).filter(favId => favId !== id)
    localStorage.setItem("fav", JSON.stringify(updatedFavIds))

    setFavMeals(prev => prev.filter(meal => meal.idMeal !== id))
  }

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Your Favorite Recipes</h1>

      {favMeals.length === 0 ? (
        <p style={{ textAlign: 'center' }}>You have no favorite meals yet.</p>
      ) : (
        <div className="favdata">
          {favMeals.map(meal => (
            <div key={meal.idMeal} className="favdiv">
              <img src={meal.strMealThumb} alt={meal.strMeal} width={200} height={200} />
              <h2>{meal.strMeal}</h2>
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Origin:</strong> {meal.strArea}</p>
              <button onClick={() => removeFavorite(meal.idMeal)}>Remove Favorite</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorite
