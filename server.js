import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Разрешаем CORS для фронта

const BASE_URL = 'https://transit.ttc.com.ge/pis-gateway/api/v2';

app.get('/api/stops', async (req, res) => {
  try {
    const locale = req.query.locale || 'ka';
    const url = `${BASE_URL}/stops?locale=${encodeURIComponent(locale)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error /api/stops:', err);
    res.status(500).json({ error: 'Failed to load stops' });
  }
});

app.get('/api/vehicle-positions', async (req, res) => {
  try {
    const url = `${BASE_URL}/vehicle-positions`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error /api/vehicle-positions:', err);
    res.status(500).json({ error: 'Failed to load vehicles' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});

