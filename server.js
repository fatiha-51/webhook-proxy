const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Active CORS pour toutes les requêtes

// Webhook Proxy : Redirige vers n8n
app.post('/proxy-n8n', async (req, res) => {
    try {
        const response = await axios.post(
            "https://n8n-render-lamachine-aal0.onrender.com/webhook/10971c03-b2c5-4406-8154-461807f36f55",
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy Webhook actif sur le port ${PORT}`));
