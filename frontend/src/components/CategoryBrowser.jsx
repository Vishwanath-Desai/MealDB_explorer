import React, { useEffect, useState } from 'react'
import { getCategories, filterByCategory, lookup } from '../api'

export default function CategoryBrowser({ onSelect }) {
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    getCategories().then((d) => setCategories(d.categories || []))
  }, [])

  async function choose(cat) {
    setActive(cat)
    const data = await filterByCategory(cat)
    setMeals(data.meals || [])
  }

  return (
    <section className="panel">
      <h2>Categories</h2>
      <div className="categories">
        {categories.map((c) => (
          <button key={c.idCategory} className={active === c.strCategory ? 'active' : ''} onClick={() => choose(c.strCategory)}>{c.strCategory}</button>
        ))}
      </div>
      <div className="results small">
        {meals.map((m) => (
          <div key={m.idMeal} className="meal" onClick={async () => {
            const full = await lookup(m.idMeal)
            onSelect(full.meals?.[0] || m)
          }}>
            <img src={m.strMealThumb} alt="" />
            <div>{m.strMeal}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
