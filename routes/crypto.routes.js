import { Router } from "express";
import { fetchStats, fetchDeviation } from "../controllers/crypto.controller.js";

const CRYPTO_ROUTER = Router();

CRYPTO_ROUTER.get('/stats', fetchStats);
CRYPTO_ROUTER.get('/deviation', fetchDeviation);
export default CRYPTO_ROUTER;