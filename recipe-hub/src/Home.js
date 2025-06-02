import React, { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import bg from './images/bg1.jpg'
import MoreMeal from './Components/MoreMeal'

const Home = () => {
  const [intro,setIntro]=useState(true)
  const [recipes, setRecipes] = useState([])
  const [cindex, setCindex] = useState(0)
  const [fav, setFav] = useState(true)
  
  const navigate = useNavigate();
  

    useEffect(() => {
        const cache = localStorage.getItem("cacherecipe")
        if (cache ) {
            setRecipes(JSON.parse(cache))
            setIntro(false)
        } else {
            const fetchRecipes = async () => {
                try {
                    const meals = []
                    for (let i = 0; i <= 5; i++) {
                        meals.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
                    }
                    const res = await Promise.all(meals)
                    const data = await Promise.all(res.map(res => res.json()))
                    const recipes = data.map(recipe => recipe.meals[0])
                    setRecipes(recipes)
                    localStorage.setItem("cacherecipe", JSON.stringify(recipes))
                    setIntro(false)
                } catch (error) {
                    console.log(error)
                    setIntro(false)
                }
            }
            fetchRecipes()
        }
    }, [])
               
    
  useEffect(() => {
    if (recipes.length === 0 ) return

    const time = setInterval(() => {
      setCindex((prev) => (prev + 1) % recipes.length)
    }, 5000)

    return () => clearInterval(time);
    },[recipes])
  
    useEffect(() => {
        const favList = JSON.parse(localStorage.getItem("fav")) || [];
        if (recipes[cindex]) {
          setFav(favList.includes(recipes[cindex].idMeal));
        }
      }, [recipes, cindex])
      

  if (intro) {
    return (
      <div className="intro">
        <h1>Welcome to Recipe Hub</h1>
      </div>
    )
  }

  const handleLearnMore = () => {
      const meal = recipes[cindex]
      navigate(`./learnmore/${meal.idMeal}`,{state:{meal}})
  }
    
    
    const makeFavorite = () => {
        const mealid = recipes[cindex].idMeal
        let favlist = JSON.parse(localStorage.getItem('fav')) || []

        if (favlist.includes(mealid)) {
            favlist = favlist.filter(id => id !== mealid)
            setFav(false)
        } else {
            favlist.push(mealid)
            setFav(true)
        }
        localStorage.setItem("fav",JSON.stringify(favlist))
        
    }

    const handleNext = () => {
        setCindex((prev) => (prev + 1) % recipes.length)
      }
      
      const handleBack = () => {
        setCindex((prev) => (prev - 1 + recipes.length) % recipes.length)
      }
      

  return (
    <>
    <div className='body' >

              <div className="container">
                <img src={bg} alt="Background" className="bg" />
                  <div className="quotediv">
                  <Navbar />
                    <div className="quote">
                        <h1>"Good food is the foundation of genuine happiness."</h1>
                        <h2 className='author'>– Auguste Escoffier</h2>
                        <h3>Cooking is more than just feeding — it’s storytelling through ingredients. With every stir, spice, and simmer, we celebrate culture, emotion, and the joy of sharing meals with those we love. Let your kitchen be a gateway to the world.</h3>
                    </div>
                    </div>
            </div>


      <div className='carousel'>          
          {recipes.length > 0 ? (
            <div>
            <div className='meal'>
              <img alt='mealpicture' src={recipes[cindex].strMealThumb} width='250' height='250' />
              <div className='content'>
                    <h1> {recipes[cindex].strMeal}</h1>
                    <h2>Food Category: {recipes[cindex].strCategory}</h2>
                     <h2>Origin: {recipes[cindex].strArea}</h2>
                
                <button className='favorite'  onClick={makeFavorite}   style={{ backgroundColor: fav ? 'red' : 'gray' }}>Make Favorite</button>
              <button className='learnmore' onClick={handleLearnMore}  > Learn More</button>
              </div>
              
              </div>
              <div className='bnbutton'>
                  <button onClick={handleBack} id='back'>Back</button>
                  <button onClick={handleNext} id='next'>Next</button>
              </div>
              
            </div>
            
        ) : (
            <div> No recipes Available now</div>
        )}
      
        </div>   
        <MoreMeal />

      </div>
    </>
  )
}



export default Home