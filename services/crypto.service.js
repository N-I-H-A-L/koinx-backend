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

export const getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;

    const records = await CryptoData.find({ coin })
      .sort({ fetchedAt: -1 })
      .limit(100);

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No data found for this coin" });
    }

    const prices = records.map((record) => record.price);

    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i];
    }
    const mean = total / prices.length;

    let varianceTotal = 0;
    for (let i = 0; i < prices.length; i++) {
      varianceTotal += Math.pow(prices[i] - mean, 2);
    }
    const variance = varianceTotal / prices.length;

    const deviation = Math.sqrt(variance);

    return res.json({ deviation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
