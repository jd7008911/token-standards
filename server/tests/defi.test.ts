import { describe, it, expect } from 'vitest';
import {
  getAllDeFiProtocols,
  getDeFiProtocol,
  getAllDeFiConcepts,
  getLiquidityPoolInfo,
} from '../src/services/defi.service.js';

describe('DeFi Service', () => {
  // ── Protocols ──────────────────────────────

  describe('getAllDeFiProtocols()', () => {
    it('should return 3 protocols', () => {
      const protocols = getAllDeFiProtocols();
      expect(protocols).toHaveLength(3);
    });

    it('should include DEX, Lending, and Yield categories', () => {
      const categories = getAllDeFiProtocols().map(p => p.category);
      expect(categories).toContain('DEX');
      expect(categories).toContain('Lending');
      expect(categories).toContain('Yield');
    });

    it('should have required fields for each protocol', () => {
      for (const protocol of getAllDeFiProtocols()) {
        expect(protocol.name).toBeDefined();
        expect(protocol.description.length).toBeGreaterThan(0);
        expect(protocol.keyMechanisms.length).toBeGreaterThan(0);
        expect(protocol.smartContracts.length).toBeGreaterThan(0);
        expect(protocol.risks.length).toBeGreaterThan(0);
        expect(protocol.tokenStandard).toBeDefined();
      }
    });
  });

  describe('getDeFiProtocol()', () => {
    it('should return DEX protocol by category', () => {
      const dex = getDeFiProtocol('DEX');
      expect(dex).toBeDefined();
      expect(dex!.category).toBe('DEX');
      expect(dex!.name).toContain('Uniswap');
    });

    it('should return Lending protocol by category', () => {
      const lending = getDeFiProtocol('Lending');
      expect(lending).toBeDefined();
      expect(lending!.category).toBe('Lending');
      expect(lending!.name).toContain('Aave');
    });

    it('should return Yield protocol by category', () => {
      const yieldProto = getDeFiProtocol('Yield');
      expect(yieldProto).toBeDefined();
      expect(yieldProto!.category).toBe('Yield');
    });

    it('should return undefined for unknown category', () => {
      expect(getDeFiProtocol('Unknown')).toBeUndefined();
    });
  });

  // ── Concepts ───────────────────────────────

  describe('getAllDeFiConcepts()', () => {
    it('should return at least 3 concepts', () => {
      const concepts = getAllDeFiConcepts();
      expect(concepts.length).toBeGreaterThanOrEqual(3);
    });

    it('should include concepts with examples and related functions', () => {
      for (const concept of getAllDeFiConcepts()) {
        expect(concept.title).toBeDefined();
        expect(concept.description.length).toBeGreaterThan(0);
        expect(concept.examples.length).toBeGreaterThan(0);
        expect(concept.relatedFunctions.length).toBeGreaterThan(0);
      }
    });
  });

  // ── Liquidity Pool ─────────────────────────

  describe('getLiquidityPoolInfo()', () => {
    it('should return AMM pool information', () => {
      const pool = getLiquidityPoolInfo();
      expect(pool.name).toBeDefined();
      expect(pool.formula).toBeDefined();
      expect(pool.mechanism.length).toBeGreaterThan(0);
    });

    it('should include x * y = k formula', () => {
      const pool = getLiquidityPoolInfo();
      expect(pool.formula).toContain('x × y = k');
    });

    it('should explain impermanent loss', () => {
      const pool = getLiquidityPoolInfo();
      expect(pool.impermanentLossExplained.length).toBeGreaterThan(0);
    });
  });
});
