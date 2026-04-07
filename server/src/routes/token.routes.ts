import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse, TokenStandard } from '../types/index.js';
import {
  getAllStandards,
  getStandardByType,
  compareStandards,
} from '../services/token.service.js';

const router = Router();

// GET /api/tokens/standards
router.get('/standards', (_req: Request, res: Response) => {
  const standards = getAllStandards();
  const response: ApiResponse<TokenStandard[]> = { success: true, data: standards };
  res.json(response);
});

// GET /api/tokens/standards/:type
router.get('/standards/:type', (req: Request<{ type: string }>, res: Response) => {
  const { type } = req.params;
  const standard = getStandardByType(type);

  if (!standard) {
    const response: ApiResponse<null> = {
      success: false,
      error: `Token standard "${type}" not found. Use ERC-20, ERC-721, or ERC-1155.`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<TokenStandard> = { success: true, data: standard };
  res.json(response);
});

// GET /api/tokens/compare
router.get('/compare', (_req: Request, res: Response) => {
  const comparison = compareStandards();
  const response: ApiResponse<typeof comparison> = { success: true, data: comparison };
  res.json(response);
});

export default router;
