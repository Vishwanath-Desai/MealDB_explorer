import React from 'react'

function IngredientsList(meal) {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ing && ing.trim()) list.push(`${ing} — ${measure || ''}`)
  }
  return list
}

export default function MealDetails({ meal, onClose }) {
  if (!meal) return null
  const ingredients = IngredientsList(meal)
  return (
    <div className="modal" role="dialog">
      <div className="modal-inner">
        <button className="close" onClick={onClose}>Close</button>
        <h2>{meal.strMeal}</h2>
        <div className="meta">
          <img src={meal.strMealThumb} alt="" />
          <div>
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
          </div>
        </div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
        </ul>
        <h3>Instructions</h3>
        <p className="instructions">{meal.strInstructions}</p>
        {meal.strYoutube && (
          <div className="video">
            <h3>Video</h3>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1] || ''}`} title="YouTube video" frameBorder="0" allowFullScreen></iframe>
          </div>
        )}
      </div>
    </div>
  )
}
