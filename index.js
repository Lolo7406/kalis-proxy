const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // Autorise toutes les origines

// Proxy pour MEXC API
app.get("/api/v3/ticker/price", async (req, res) => {
  const { symbol } = req.query; // Récupère le paramètre "symbol" dans la requête
  const apiUrl = `https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`; // URL de l'API cible

  try {
    const response = await fetch(apiUrl); // Envoie une requête vers l'API MEXC
    if (!response.ok) {
      return res.status(response.status).send(`Erreur depuis l'API : ${response.statusText}`);
    }
    const data = await response.json(); // Transforme la réponse en JSON
    res.status(200).json(data); // Retourne les données au frontend
  } catch (error) {
    console.error("Erreur dans le proxy :", error);
    res.status(500).send("Erreur interne du serveur proxy"); // Gestion des erreurs
  }
});

// Lancement du serveur sur le port par défaut fourni par Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy en écoute sur le port ${PORT}`);
});

module.exports = app;
