const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Active le middleware CORS pour toutes les routes
app.use(cors());

const PORT = process.env.PORT || 3000;

// Proxy pour l'API MEXC
app.get('/api/v3/ticker/price', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Le paramètre "symbol" est requis.' });
  }

  try {
    const response = await axios.get(`https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis MEXC:', error.message);
    res.status(500).json({ error: 'Impossible de récupérer les données.' });
  }
});

// Lance le serveur
app.listen(PORT, () => {
  console.log(`Proxy actif sur http://localhost:${PORT}`);
});
