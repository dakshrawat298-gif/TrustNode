import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'AI-Oracle Escrow',
    message: 'Health check passed. Server is running.',
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI-Oracle Escrow server running on http://0.0.0.0:${PORT}`);
});
