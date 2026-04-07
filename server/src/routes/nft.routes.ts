import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/index.js';
import {
  getAllNFTProjects,
  getNFTProject,
  getMetadataExample,
  getMintingFlow,
  getStorageSolutions,
  type NFTProject,
  type NFTMetadata,
  type NFTMintingFlow,
  type NFTStorageSolution,
} from '../services/nft.service.js';

const router = Router();

// GET /api/nft/projects
router.get('/projects', (_req: Request, res: Response) => {
  const projects = getAllNFTProjects();
  const response: ApiResponse<NFTProject[]> = { success: true, data: projects };
  res.json(response);
});

// GET /api/nft/projects/:category
router.get('/projects/:category', (req: Request<{ category: string }>, res: Response) => {
  const { category } = req.params;
  const project = getNFTProject(category);

  if (!project) {
    const response: ApiResponse<null> = {
      success: false,
      error: `NFT project category "${category}" not found. Use Art, Gaming, or Identity.`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<NFTProject> = { success: true, data: project };
  res.json(response);
});

// GET /api/nft/metadata-example
router.get('/metadata-example', (_req: Request, res: Response) => {
  const metadata = getMetadataExample();
  const response: ApiResponse<NFTMetadata> = { success: true, data: metadata };
  res.json(response);
});

// GET /api/nft/minting-flow
router.get('/minting-flow', (_req: Request, res: Response) => {
  const flow = getMintingFlow();
  const response: ApiResponse<NFTMintingFlow[]> = { success: true, data: flow };
  res.json(response);
});

// GET /api/nft/storage
router.get('/storage', (_req: Request, res: Response) => {
  const solutions = getStorageSolutions();
  const response: ApiResponse<NFTStorageSolution[]> = { success: true, data: solutions };
  res.json(response);
});

export default router;
