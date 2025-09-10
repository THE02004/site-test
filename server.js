import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Ton token PandaScore directement en dur
const API_TOKEN = "W4FBc_KPgNhEBeKAz1sdkPpqHYtEIQj9ZRE1R3ing_ASYpFkoAE";

// Autoriser les appels depuis ton site
app.use(cors());

/**
 * Matches
 */
app.get("/api/:game/matches", async (req, res) => {
  const game = req.params.game;
  try {
    const resp = await fetch(
      `https://api.pandascore.co/${game}/matches/upcoming?token=${API_TOKEN}`
    );
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

/**
 * Teams
 */
app.get("/api/:game/teams", async (req, res) => {
  const game = req.params.game;
  try {
    const resp = await fetch(
      `https://api.pandascore.co/${game}/teams?token=${API_TOKEN}`
    );
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy PandaScore running on http://localhost:${PORT}`)
);
