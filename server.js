const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Active CORS pour éviter les blocages

// Debug : Afficher quand le serveur démarre
console.log("🚀 Proxy n8n démarré !");

// Proxy pour envoyer les requêtes à n8n
app.post('/proxy-n8n', async (req, res) => {
    console.log("🔹 Nouvelle requête reçue :", req.body); // Debug des requêtes

    try {
        const response = await axios.post(
            "http://localhost:5678/webhook/mabatpro",
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Réponse de n8n :", response.data); // Debug réponse de n8n
        res.json(response.data);
    } catch (error) {
        console.error("❌ Erreur dans le proxy :", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erreur interne du serveur", details: error.message });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur actif sur le port ${PORT}`));
