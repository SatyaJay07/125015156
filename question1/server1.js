const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all requests

const SERVER_URL = 'http://localhost:3000/numbers';

// Mapping from single-letter codes to full text
const typeMapping = {
    even: 'even',
    fibo: 'fibo', 
    random: 'rand',
    prime: 'primes'
};

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    const fullType = typeMapping[type]; // Translate to full text
    if (!fullType) {
        return res.status(400).json({ error: 'Invalid type parameter' });
    }
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`${SERVER_URL}/${fullType}`);
        if (!response.ok) throw new Error('Error fetching data from server.js');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server1 running on port ${PORT}`));