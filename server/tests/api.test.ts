import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API Endpoints (UAT)', () => {
  // ── Health Check ────────────────────────────

  it('GET /api/health should return ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  // ── Crypto Routes ──────────────────────────

  describe('POST /api/crypto/hash', () => {
    it('should hash input with keccak256', async () => {
      const res = await request(app)
        .post('/api/crypto/hash')
        .send({ input: 'test', algorithm: 'keccak256' });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.hash).toMatch(/^0x[a-f0-9]{64}$/);
    });

    it('should return 400 for missing input', async () => {
      const res = await request(app).post('/api/crypto/hash').send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/crypto/keypair', () => {
    it('should generate a key pair', async () => {
      const res = await request(app).post('/api/crypto/keypair');
      expect(res.status).toBe(200);
      expect(res.body.data.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(res.body.data.privateKey).toMatch(/^0x[a-f0-9]{64}$/);
    });
  });

  describe('POST /api/crypto/sign + /api/crypto/verify', () => {
    it('should sign and verify a message round-trip', async () => {
      // Generate keys
      const kpRes = await request(app).post('/api/crypto/keypair');
      const { privateKey, address } = kpRes.body.data;

      // Sign
      const signRes = await request(app)
        .post('/api/crypto/sign')
        .send({ message: 'UAT test message', privateKey });
      expect(signRes.status).toBe(200);
      expect(signRes.body.data.signerAddress).toBe(address);

      // Verify
      const verifyRes = await request(app)
        .post('/api/crypto/verify')
        .send({ message: 'UAT test message', signature: signRes.body.data.signature });
      expect(verifyRes.status).toBe(200);
      expect(verifyRes.body.data.recoveredAddress).toBe(address);
      expect(verifyRes.body.data.isValid).toBe(true);
    });

    it('should return 400 for invalid private key', async () => {
      const res = await request(app)
        .post('/api/crypto/sign')
        .send({ message: 'test', privateKey: '0xbad' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/crypto/avalanche', () => {
    it('should return different hashes for similar inputs', async () => {
      const res = await request(app)
        .post('/api/crypto/avalanche')
        .send({ input: 'Blockchain' });
      expect(res.status).toBe(200);
      expect(res.body.data.original.hash).not.toBe(res.body.data.modified.hash);
    });
  });

  // ── Token Routes ───────────────────────────

  describe('GET /api/tokens/standards', () => {
    it('should return all 3 token standards', async () => {
      const res = await request(app).get('/api/tokens/standards');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
    });
  });

  describe('GET /api/tokens/standards/:type', () => {
    it('should return ERC-20 details', async () => {
      const res = await request(app).get('/api/tokens/standards/ERC-20');
      expect(res.status).toBe(200);
      expect(res.body.data.type).toBe('ERC-20');
    });

    it('should return 404 for unknown standard', async () => {
      const res = await request(app).get('/api/tokens/standards/ERC-999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/tokens/compare', () => {
    it('should return comparison data', async () => {
      const res = await request(app).get('/api/tokens/compare');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('tokenType');
    });
  });

  // ── Wallet Routes ──────────────────────────

  describe('GET /api/wallets/methods', () => {
    it('should return MetaMask and WalletConnect', async () => {
      const res = await request(app).get('/api/wallets/methods');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/wallets/methods/:type', () => {
    it('should return MetaMask details', async () => {
      const res = await request(app).get('/api/wallets/methods/MetaMask');
      expect(res.status).toBe(200);
      expect(res.body.data.type).toBe('MetaMask');
    });

    it('should return 404 for unknown wallet', async () => {
      const res = await request(app).get('/api/wallets/methods/Phantom');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/wallets/security', () => {
    it('should return security best practices', async () => {
      const res = await request(app).get('/api/wallets/security');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  // ── DeFi Routes ────────────────────────────

  describe('GET /api/defi/protocols', () => {
    it('should return all DeFi protocols', async () => {
      const res = await request(app).get('/api/defi/protocols');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
    });
  });

  describe('GET /api/defi/protocols/:category', () => {
    it('should return DEX protocol', async () => {
      const res = await request(app).get('/api/defi/protocols/DEX');
      expect(res.status).toBe(200);
      expect(res.body.data.category).toBe('DEX');
    });

    it('should return 404 for unknown DeFi category', async () => {
      const res = await request(app).get('/api/defi/protocols/Unknown');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/defi/concepts', () => {
    it('should return DeFi concepts', async () => {
      const res = await request(app).get('/api/defi/concepts');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GET /api/defi/liquidity-pool', () => {
    it('should return AMM pool info', async () => {
      const res = await request(app).get('/api/defi/liquidity-pool');
      expect(res.status).toBe(200);
      expect(res.body.data.formula).toContain('x × y = k');
    });
  });

  // ── NFT Routes ─────────────────────────────

  describe('GET /api/nft/projects', () => {
    it('should return all NFT projects', async () => {
      const res = await request(app).get('/api/nft/projects');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
    });
  });

  describe('GET /api/nft/projects/:category', () => {
    it('should return Art NFT project', async () => {
      const res = await request(app).get('/api/nft/projects/Art');
      expect(res.status).toBe(200);
      expect(res.body.data.category).toBe('Art');
    });

    it('should return 404 for unknown NFT category', async () => {
      const res = await request(app).get('/api/nft/projects/Unknown');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/nft/metadata-example', () => {
    it('should return ERC-721 metadata', async () => {
      const res = await request(app).get('/api/nft/metadata-example');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('attributes');
    });
  });

  describe('GET /api/nft/minting-flow', () => {
    it('should return minting steps', async () => {
      const res = await request(app).get('/api/nft/minting-flow');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GET /api/nft/storage', () => {
    it('should return storage solutions', async () => {
      const res = await request(app).get('/api/nft/storage');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  // ── dApp Routes ────────────────────────────

  describe('GET /api/dapp/architecture', () => {
    it('should return 3 architecture layers', async () => {
      const res = await request(app).get('/api/dapp/architecture');
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(3);
    });
  });

  describe('GET /api/dapp/deployment', () => {
    it('should return deployment pipeline', async () => {
      const res = await request(app).get('/api/dapp/deployment');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('GET /api/dapp/patterns', () => {
    it('should return smart contract patterns', async () => {
      const res = await request(app).get('/api/dapp/patterns');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('GET /api/dapp/patterns/:category', () => {
    it('should return Security patterns', async () => {
      const res = await request(app).get('/api/dapp/patterns/Security');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 for unknown pattern category', async () => {
      const res = await request(app).get('/api/dapp/patterns/Unknown');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/dapp/audit', () => {
    it('should return audit checklist', async () => {
      const res = await request(app).get('/api/dapp/audit');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });
});
