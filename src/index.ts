import express from "express";
import { HiAnime } from "aniwatch";

const app = express();
const hianime = new HiAnime.Scraper();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ msg: "Server is up and running" }));

app.get("/search", async (req, res) => {
  try {
    const q = req.query.q as string;
    const data = await hianime.search(q, 1);
    res.json(data);
  } catch (e) { 
    res.status(500).json({ error: String(e) }); 
  }
});

app.get("/episodes/:animeId", async (req, res) => {
  try {
    const data = await hianime.getEpisodes(req.params.animeId);
    res.json(data);
  } catch (e) { 
    res.status(500).json({ error: String(e) }); 
  }
});

app.get("/sources", async (req, res) => {
  try {
    const id = req.query.id as string;
    const data = await hianime.getEpisodeSources(id, "hd-1", "sub");
    res.json(data);
  } catch (e) { 
    res.status(500).json({ error: String(e) }); 
  }
});

app.get("/test", async (req, res) => {
  try {
    const response = await fetch("https://hianimez.to");
    res.json({ status: response.status, ok: response.ok });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/test2", async (req, res) => {
  try {
    const data = await hianime.getHomePage();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/version", (req, res) => {
  const pkg = require("/app/node_modules/aniwatch/package.json");
  res.json({ version: pkg.version });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
