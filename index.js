import express from 'express';
import dotenv from 'dotenv';
import { checkHealth } from './src/services/solanaService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'TrustNode AI-Oracle Escrow',
    message: 'Health check passed. Server is running.',
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error.' });
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`TrustNode server running on http://0.0.0.0:${PORT}`);

  try {
    const health = await checkHealth();
    if (health.ok) {
      console.log(
        `TrustNode Solana Devnet connection established at slot: ${health.slot}`
      );
    } else {
      console.error(
        `TrustNode Solana Devnet connection FAILED: ${health.error}`
      );
    }
  } catch (error) {
    console.error('TrustNode Solana startup health check error:', error.message);
  }
});
