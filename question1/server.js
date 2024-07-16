const express = require('express');
const cors = require('cors'); // Import cors
let fetch;
const app = express();

app.use(cors()); // Enable CORS for all requests
app.use(express.json());

const BASE_URL = 'http://20.244.56.144/test';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMTM5ODg1LCJpYXQiOjE3MjExMzk1ODUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZlZmY2MTc3LTI0ZmItNGUwMi04ZjIzLWZmMGEyYzQ2OTljMyIsInN1YiI6IjEyNTAxNTE1NkBzYXN0cmEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJ0ZXN0aW5nIiwiY2xpZW50SUQiOiI2ZWZmNjE3Ny0yNGZiLTRlMDItOGYyMy1mZjBhMmM0Njk5YzMiLCJjbGllbnRTZWNyZXQiOiJiYmJFcmNqQ1RSSWdERnhqIiwib3duZXJOYW1lIjoiU2F0eWEiLCJvd25lckVtYWlsIjoiMTI1MDE1MTU2QHNhc3RyYS5hYy5pbiIsInJvbGxObyI6IjEyNTAxNTE1NiJ9.z_j5eweXH_roQPq8D1pMEJ8sfE7T65fHbamzNPHO67Q';

const fetchNumbers = async (type) => {
    if (!fetch) {
        fetch = (await import('node-fetch')).default;
    }
    const response = await fetch(`${BASE_URL}/${type}`, {
        method: 'GET',
        headers: {
            'Authorization': AUTH_TOKEN
        }
    });
    return response.json();
};

// Example route using fetchNumbers
app.get('/numbers/:type', async (req, res) => {
    try {
        const data = await fetchNumbers(req.params.type);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));