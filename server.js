import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const API_BASE = "https://transit.ttc.com.ge/pis-gateway/api/v2";

app.get("/stops", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/stops?locale=ka`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error loading stops:", err);
    res.status(500).json({ error: "Failed to load stops" });
  }
});

app.get("/vehicles", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/vehicle-positions`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error loading vehicles:", err);
    res.status(500).json({ error: "Failed to load vehicles" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
