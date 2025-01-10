import CryptoData from "../models/crypto-data.model.js";

export const getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
    return res.status(400).json({
      error:
        "Invalid coin. Please specify one of: bitcoin, matic-network, ethereum.",
    });
  }

  try {
    const cryptoData = await CryptoData.findOne({ coin })
      .sort({ fetchedAt: -1 }) // Sort by most recent
      .limit(1);

    if (!cryptoData) {
      return res.status(404).json({ error: `No data found for ${coin}.` });
    }

    return res.json({
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      "24hChange": cryptoData.change24h,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
