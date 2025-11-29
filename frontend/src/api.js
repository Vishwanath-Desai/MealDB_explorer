const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export async function searchMeals(q) {
  const url = `${API_BASE}/api/search?q=${encodeURIComponent(q)}`
  const res = await fetch(url)
  return res.json()
}

export async function getCategories() {
  const url = `${API_BASE}/api/categories`
  const res = await fetch(url)
  return res.json()
}

export async function filterByCategory(c) {
  const url = `${API_BASE}/api/filter?c=${encodeURIComponent(c)}`
  const res = await fetch(url)
  return res.json()
}

export async function getRandom() {
  const url = `${API_BASE}/api/random`
  const res = await fetch(url)
  return res.json()
}

export async function lookup(id) {
  const url = `${API_BASE}/api/lookup?id=${encodeURIComponent(id)}`
  const res = await fetch(url)
  return res.json()
}
