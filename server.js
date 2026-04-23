import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://transit.ttc.com.ge/pis-gateway/api/v2";

async function proxy(req, res, endpoint) {
    try {
        const url = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Upstream error" });
        }

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Proxy error", details: err.message });
    }
}

app.get("/stops", (req, res) => {
    proxy(req, res, "/stops?locale=ka");
});

app.get("/vehicles", (req, res) => {
    proxy(req, res, "/vehicle-positions");
});

app.get("/routes", (req, res) => {
    proxy(req, res, "/routes");
});

app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});

