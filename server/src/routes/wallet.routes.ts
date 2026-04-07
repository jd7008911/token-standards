import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/index.js';
import {
  getAllWalletMethods,
  getWalletMethod,
  getSecurityBestPractices,
  type WalletMethod,
} from '../services/wallet.service.js';

const router = Router();

// GET /api/wallets/methods
router.get('/methods', (_req: Request, res: Response) => {
  const methods = getAllWalletMethods();
  const response: ApiResponse<WalletMethod[]> = { success: true, data: methods };
  res.json(response);
});

// GET /api/wallets/methods/:type
router.get('/methods/:type', (req: Request<{ type: string }>, res: Response) => {
  const { type } = req.params;
  const method = getWalletMethod(type);

  if (!method) {
    const response: ApiResponse<null> = {
      success: false,
      error: `Wallet method "${type}" not found. Use MetaMask or WalletConnect.`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<WalletMethod> = { success: true, data: method };
  res.json(response);
});

// GET /api/wallets/security
router.get('/security', (_req: Request, res: Response) => {
  const practices = getSecurityBestPractices();
  const response: ApiResponse<typeof practices> = { success: true, data: practices };
  res.json(response);
});

export default router;
