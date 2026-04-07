import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/index.js';
import {
  getDAppArchitecture,
  getDeploymentPipeline,
  getSmartContractPatterns,
  getPatternsByCategory,
  getAuditChecklist,
  type DAppArchitecture,
  type DeploymentPipeline,
  type SmartContractPattern,
  type AuditChecklist,
} from '../services/dapp.service.js';

const router = Router();

// GET /api/dapp/architecture
router.get('/architecture', (_req: Request, res: Response) => {
  const arch = getDAppArchitecture();
  const response: ApiResponse<DAppArchitecture[]> = { success: true, data: arch };
  res.json(response);
});

// GET /api/dapp/deployment
router.get('/deployment', (_req: Request, res: Response) => {
  const pipeline = getDeploymentPipeline();
  const response: ApiResponse<DeploymentPipeline[]> = { success: true, data: pipeline };
  res.json(response);
});

// GET /api/dapp/patterns
router.get('/patterns', (_req: Request, res: Response) => {
  const patterns = getSmartContractPatterns();
  const response: ApiResponse<SmartContractPattern[]> = { success: true, data: patterns };
  res.json(response);
});

// GET /api/dapp/patterns/:category
router.get('/patterns/:category', (req: Request<{ category: string }>, res: Response) => {
  const { category } = req.params;
  const patterns = getPatternsByCategory(category);

  if (patterns.length === 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: `Pattern category "${category}" not found. Use Security, Upgradeability, Gas, or Access Control.`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<SmartContractPattern[]> = { success: true, data: patterns };
  res.json(response);
});

// GET /api/dapp/audit
router.get('/audit', (_req: Request, res: Response) => {
  const checklist = getAuditChecklist();
  const response: ApiResponse<AuditChecklist[]> = { success: true, data: checklist };
  res.json(response);
});

export default router;
