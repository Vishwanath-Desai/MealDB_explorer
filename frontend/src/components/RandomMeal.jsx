import React from 'react'
import { getRandom } from '../api'

export default function RandomMeal({ onSelect }) {
  async function handle() {
    const res = await getRandom()
    if (res.meals && res.meals[0]) onSelect(res.meals[0])
  }

  return (
    <section className="panel">
      <h2>Feeling Hungry?</h2>
      <button className="big" onClick={handle}>I'm feeling hungry</button>
    </section>
  )
}
