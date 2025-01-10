import { getStats } from "../services/crypto.service.js";

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
