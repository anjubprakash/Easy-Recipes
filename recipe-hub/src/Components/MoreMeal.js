import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MoreMeal = () => {
    const [recipe, setRecipe] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const meals = []
                for (let i = 0; i <= 4; i++) {
                    meals.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
                }
                const res = await Promise.all(meals)
                const data = await Promise.all(res.map(res => res.json()))
                const recipes = data.map(recipe => recipe.meals[0])
                setRecipe(recipes)
            } catch (error) {
                console.log(error)
            }       
        
        }
        fetchRecipes()

  },[])


  return (
    <div>
        <div className="moremeal">
        <h2>Discover More Recipes</h2>
        <div className="favdata">
         {recipe.map((recipe) => (
           <div key={recipe.idMeal} className="favdiv">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="150" height="150" />
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strArea} - {recipe.strCategory}</p>
                <button onClick={() => navigate(`./learnmore/${recipe.idMeal}`, { state: { meal: recipe } })}>
                Learn More
                </button>
            </div>
         ))}
                  

        </div>
        </div>         

    </div>
  )
}

export default MoreMeal