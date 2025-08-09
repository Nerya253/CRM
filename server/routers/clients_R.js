import { Router } from "express";
import {
  updateClient,
  findOneClient,
  findAllClients,
  addClient,
  deleteClient,
} from "../db/dbUtils.js";

export const clientRouter = Router();
clientRouter.get("/viewClients", async (req, res) => {
  try {
    const items = await findAllClients();
    res.json(items);
  } catch (error) {
    console.error("❌ viewClients error:", error);
    res.status(500).json({ error: "viewClients: Internal server error" });
  }
});

clientRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const items = await findOneClient(id);
    res.json(items);
  } catch (error) {
    console.error("❌ getClient error:", error);
    res.status(500).json({ error: "getClient: Internal server error" });
  }
});

clientRouter.post("/addClient", async (req, res) => {
  try {
    const payload = req.body;
    const saved = await addClient(payload);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ addClient error:", error);
    res.status(500).json({ error: "addClient: Internal server error" });
  }
});

clientRouter.put("/updateClient/:id", async (req, res) => {
  try {
    const updated = await updateClient({ id: req.params.id, ...req.body });
    if (!updated) return res.status(404).json({ error: "Client not found" });
    return res.status(200).json(updated);
  } catch (e) {
    console.error("PUT /updateClient error:", e);
    return res
      .status(500)
      .json({ error: "updateClient: Internal server error" });
  }
});

clientRouter.delete("/deleteClient/:id", async (req, res) => {
  try {
    const deleted = await deleteClient(req.params.id);
    res.json({ success: deleted });
  } catch (error) {
    console.error("❌ deleteClient error:", error);
    res.status(500).json({ error: "deleteClient: Internal server error" });
  }
});
