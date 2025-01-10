import { Router } from "express";
import { fetchStats } from "../controllers/crypto.controller.js";

const CRYPTO_ROUTER = Router();

CRYPTO_ROUTER.get('/stats', fetchStats);
export default CRYPTO_ROUTER;