import { getStats, getDeviation } from "../services/crypto.service.js";

export const fetchStats = async (req, res) => {
  try {
    await getStats(req, res);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching stats" });
  }
};

export const fetchDeviation = async (req, res) => {
  try {
    await getDeviation(req, res);
  } catch (error) {
    console.error("Error fetching deviation:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching deviation" });
  }
};
