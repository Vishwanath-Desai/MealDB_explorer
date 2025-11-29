import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import CategoryBrowser from './components/CategoryBrowser'
import RandomMeal from './components/RandomMeal'
import MealDetails from './components/MealDetails'

export default function App() {
  const [selectedMeal, setSelectedMeal] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <h1>TheMealDB Explorer</h1>
      </header>
      <main className="main">
        <div className="left">
          <Search onSelect={(m) => setSelectedMeal(m)} />
          <RandomMeal onSelect={(m) => setSelectedMeal(m)} />
        </div>
        <div className="right">
          <CategoryBrowser onSelect={(m) => setSelectedMeal(m)} />
        </div>
      </main>
      <MealDetails meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </div>
  )
}
