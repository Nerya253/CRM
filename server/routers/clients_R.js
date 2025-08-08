import { Router } from "express";
import { findAllClients, addClient } from "../db/dbUtils.js";

export const clientRouter = Router();

clientRouter.get("/", async (_req, res) => {
  try {
    const items = await findAllClients();
    res.json(items);
  } catch (error) {
    console.error("❌ /clients error:", error);
    res.status(500).json({ error: "DB not initialized. Call main() first." });
  }
});

clientRouter.post("/addClient", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }
    const saved = await addClient(payload);
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DB not initialized. Call main() first." });
  }
});
