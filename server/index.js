import { main } from "./db/db_connection.js";
import { clientRouter } from "./routers/clients_R.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const port = 4371;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/clients", clientRouter);

app.get("/", (_req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

await main();

app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});
