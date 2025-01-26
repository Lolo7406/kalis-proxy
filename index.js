const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration sécurisée de CORS
const corsOptions = {
  origin: "*", // Autorise toutes les origines (peut être restreint si nécessaire)
  methods: "GET,HEAD,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Route principale pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Serveur proxy en cours d'exécution.");
});

// Proxy pour rediriger les requêtes vers l'API de MEXC
app.get("/api/v3/ticker/price", async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) {
      return res.status(400).json({ error: "Le paramètre 'symbol' est requis." });
    }

    // Requête vers l'API MEXC
    const response = await axios.get(
      `https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`
    );

    // Renvoie les données de l'API MEXC
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération des données." });
  }
});

// Gestion des routes inconnues
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable." });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur proxy en cours d'exécution sur le port ${PORT}`);
});
