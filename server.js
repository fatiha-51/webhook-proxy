const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Active CORS pour toutes les origines

// Gestion des requêtes OPTIONS (prévolées)
app.options('/proxy-n8n', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

// Proxy pour envoyer les requêtes à n8n
app.post('/proxy-n8n', async (req, res) => {
    console.log("🔹 Nouvelle requête reçue :", req.body);

    try {
        const response = await axios.post(
            "http://localhost:5678/webhook/mabatpro", // URL de votre webhook local
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Réponse de n8n :", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Erreur dans le proxy :", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erreur interne du serveur", details: error.message });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur proxy actif sur le port ${PORT}`));
