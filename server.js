import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://transit.ttc.com.ge/pis-gateway/api/v2";

async function proxy(endpoint, req, res) {
  try {
    const url = `${BASE_URL}/${endpoint}`;

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
    return res.json(data);

  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Proxy internal error" });
  }
}

// остановки
app.get("/api/stops", (req, res) => {
  const locale = req.query.locale || "ka";
  proxy(`stops?locale=${locale}`, req, res);
});

// транспорт
app.get("/api/vehicle-positions", (req, res) => {
  proxy("vehicle-positions", req, res);
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
