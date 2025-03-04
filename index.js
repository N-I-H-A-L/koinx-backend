import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import './cron-job.js';
import CRYPTO_ROUTER from "./routes/crypto.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", CRYPTO_ROUTER);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
