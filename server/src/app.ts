import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import cryptoRoutes from './routes/crypto.routes.js';
import tokenRoutes from './routes/token.routes.js';
import walletRoutes from './routes/wallet.routes.js';
import defiRoutes from './routes/defi.routes.js';
import nftRoutes from './routes/nft.routes.js';
import dappRoutes from './routes/dapp.routes.js';

dotenv.config({ path: '../.env' });

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/crypto', cryptoRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/defi', defiRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/dapp', dappRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
