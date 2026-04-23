import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Базовый URL PIS API
const BASE_URL = 'https://transit.ttc.com.ge/pis-gateway/api/v2';

// Проксирование остановок
app.get('/api/stops', async (req, res) => {
    try {
        const locale = req.query.locale || 'ka';
        const response = await fetch(`${BASE_URL}/stops?locale=${locale}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка загрузки остановок:', error);
        res.status(500).json({ error: 'Ошибка загрузки остановок' });
    }
});

// Проксирование транспорта
app.get('/api/vehicles', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/vehicle-positions`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Ошибка загрузки транспорта:', error);
        res.status(500).json({ error: 'Ошибка загрузки транспорта' });
    }
});

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('Tbilisi Transport Proxy API работает');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
