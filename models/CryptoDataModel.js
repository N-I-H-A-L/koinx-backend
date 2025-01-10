import mongoose from 'mongoose';

const cryptoDataSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum'], 
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  fetchedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);
export default CryptoData;
