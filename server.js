import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Универсальный прокси для любых GET‑запросов
app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: "Missing ?url=" });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json, text/plain, */*"
            }
        });

        const contentType = response.headers.get("content-type");
        res.setHeader("content-type", contentType);

        const data = await response.text();
        res.send(data);

    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Proxy request failed" });
    }
});

// Проверка сервера
app.get("/", (req, res) => {
    res.send("Tbilisi Proxy Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
