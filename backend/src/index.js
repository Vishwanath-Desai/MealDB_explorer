require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const LRU = require('lru-cache');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.THEMEALDB_KEY || '1';

const cache = new LRU({
  max: parseInt(process.env.CACHE_MAX_ITEMS || '500', 10),
  ttl: (parseInt(process.env.CACHE_TTL_SECONDS || '3600', 10)) * 1000,
});

function cacheKey(req) {
  return `${req.method}:${req.originalUrl}`;
}

async function fetchFromApi(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Upstream ${res.status}`);
  return res.json();
}

async function proxy(req, res, targetUrl) {
  try {
    const key = targetUrl; // simple key by target url
    if (cache.has(key)) {
      return res.json(cache.get(key));
    }
    const data = await fetchFromApi(targetUrl);
    cache.set(key, data);
    return res.json(data);
  } catch (err) {
    console.error('proxy error', err.message);
    return res.status(502).json({ error: 'Upstream error', details: err.message });
  }
}

// routes
app.get('/api/search', (req, res) => {
  const q = req.query.q || '';
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${encodeURIComponent(q)}`;
  return proxy(req, res, url);
});

app.get('/api/categories', (req, res) => {
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/categories.php`;
  return proxy(req, res, url);
});

app.get('/api/filter', (req, res) => {
  const c = req.query.c || '';
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?c=${encodeURIComponent(c)}`;
  return proxy(req, res, url);
});

app.get('/api/random', (req, res) => {
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`;
  return proxy(req, res, url);
});

app.get('/api/lookup', (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'id required' });
  const url = `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${encodeURIComponent(id)}`;
  return proxy(req, res, url);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', cacheSize: cache.size });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
