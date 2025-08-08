import { main } from "./db/db_connection.js";

import { clientRouter } from "./routers/clients_R.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 4371;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clients", clientRouter);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

await main();

app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});
