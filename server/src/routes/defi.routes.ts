import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/index.js';
import {
  getAllDeFiProtocols,
  getDeFiProtocol,
  getAllDeFiConcepts,
  getLiquidityPoolInfo,
  type DeFiProtocol,
  type DeFiConcept,
  type LiquidityPool,
} from '../services/defi.service.js';

const router = Router();

// GET /api/defi/protocols
router.get('/protocols', (_req: Request, res: Response) => {
  const protocols = getAllDeFiProtocols();
  const response: ApiResponse<DeFiProtocol[]> = { success: true, data: protocols };
  res.json(response);
});

// GET /api/defi/protocols/:category
router.get('/protocols/:category', (req: Request<{ category: string }>, res: Response) => {
  const { category } = req.params;
  const protocol = getDeFiProtocol(category);

  if (!protocol) {
    const response: ApiResponse<null> = {
      success: false,
      error: `DeFi protocol category "${category}" not found. Use DEX, Lending, or Yield.`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<DeFiProtocol> = { success: true, data: protocol };
  res.json(response);
});

// GET /api/defi/concepts
router.get('/concepts', (_req: Request, res: Response) => {
  const concepts = getAllDeFiConcepts();
  const response: ApiResponse<DeFiConcept[]> = { success: true, data: concepts };
  res.json(response);
});

// GET /api/defi/liquidity-pool
router.get('/liquidity-pool', (_req: Request, res: Response) => {
  const pool = getLiquidityPoolInfo();
  const response: ApiResponse<LiquidityPool> = { success: true, data: pool };
  res.json(response);
});

export default router;
