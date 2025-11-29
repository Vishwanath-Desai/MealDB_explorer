import React, { useState } from 'react'
import { searchMeals, lookup } from '../api'

export default function Search({ onSelect }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState(null)

  async function doSearch(e) {
    e && e.preventDefault()
    if (!q) return
    const data = await searchMeals(q)
    setResults(data.meals || [])
  }

  return (
    <section className="panel">
      <h2>Search</h2>
      <form onSubmit={doSearch} className="search-form">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search meals by name" />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {results && results.length === 0 && <div>No results</div>}
        {results && results.map((m) => (
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
