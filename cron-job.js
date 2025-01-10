import cron from 'node-cron';
import axios from 'axios';
import CryptoData from './models/crypto-data.model.js';

const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    
    const cryptoDetails = Object.entries(data).map(([coin, details]) => ({
      coin,
      price: details.usd,
      marketCap: details.usd_market_cap,
      change24h: details.usd_24h_change,
      fetchedAt: new Date(),
    }));

    await CryptoData.insertMany(cryptoDetails);
    console.log('Data fetched and saved successfully:', cryptoDetails);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

cron.schedule('0 */2 * * *', fetchCryptoData);
console.log('Cron job scheduled: Fetch crypto data every 2 hours');
