const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/kalis-price', async (req, res) => {
  try {
    const response = await fetch('https://api.mexc.com/api/v3/ticker/price?symbol=KALISUSDT');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération du prix :', error);
    res.status(500).json({ error: 'Impossible de récupérer le prix' });
  }
});

app.get('/', (req, res) => {
  res.send('Le proxy Kalis fonctionne!');
});

module.exports = app;
