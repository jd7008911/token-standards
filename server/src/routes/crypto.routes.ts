import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse, HashResult, KeyPair, SignatureResult, VerifyResult } from '../types/index.js';
import {
  hashData,
  generateKeyPair,
  signMessage,
  verifySignature,
  demonstrateAvalancheEffect,
} from '../services/cryptography.service.js';

const router = Router();

// POST /api/crypto/hash
router.post('/hash', (req: Request, res: Response) => {
  const { input, algorithm } = req.body as { input?: string; algorithm?: string };

  if (!input || typeof input !== 'string') {
    const response: ApiResponse<null> = { success: false, error: 'Input string is required' };
    res.status(400).json(response);
    return;
  }

  const result = hashData(input, algorithm);
  const response: ApiResponse<HashResult> = { success: true, data: result };
  res.json(response);
});

// POST /api/crypto/keypair
router.post('/keypair', (_req: Request, res: Response) => {
  const result = generateKeyPair();
  const response: ApiResponse<KeyPair> = { success: true, data: result };
  res.json(response);
});

// POST /api/crypto/sign
router.post('/sign', (req: Request, res: Response) => {
  const { message, privateKey } = req.body as { message?: string; privateKey?: string };

  if (!message || !privateKey) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Message and privateKey are required',
    };
    res.status(400).json(response);
    return;
  }

  try {
    const result = signMessage(message, privateKey);
    const response: ApiResponse<SignatureResult> = { success: true, data: result };
    res.json(response);
  } catch {
    const response: ApiResponse<null> = { success: false, error: 'Invalid private key' };
    res.status(400).json(response);
  }
});

// POST /api/crypto/verify
router.post('/verify', (req: Request, res: Response) => {
  const { message, signature } = req.body as { message?: string; signature?: string };

  if (!message || !signature) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Message and signature are required',
    };
    res.status(400).json(response);
    return;
  }

  try {
    const result = verifySignature(message, signature);
    const response: ApiResponse<VerifyResult> = { success: true, data: result };
    res.json(response);
  } catch {
    const response: ApiResponse<null> = { success: false, error: 'Invalid signature' };
    res.status(400).json(response);
  }
});

// POST /api/crypto/avalanche
router.post('/avalanche', (req: Request, res: Response) => {
  const { input } = req.body as { input?: string };

  if (!input || typeof input !== 'string') {
    const response: ApiResponse<null> = { success: false, error: 'Input string is required' };
    res.status(400).json(response);
    return;
  }

  const result = demonstrateAvalancheEffect(input);
  const response: ApiResponse<typeof result> = { success: true, data: result };
  res.json(response);
});

export default router;
