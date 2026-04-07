import { describe, it, expect } from 'vitest';
import {
  getAllStandards,
  getStandardByType,
  compareStandards,
} from '../src/services/token.service.js';

describe('Token Standards Service', () => {
  // ── ERC-20 (Fungible Tokens) ────────────────

  describe('ERC-20 Standard', () => {
    it('should return ERC-20 standard data', () => {
      const erc20 = getStandardByType('ERC-20');
      expect(erc20).toBeDefined();
      expect(erc20!.type).toBe('ERC-20');
      expect(erc20!.name).toBe('ERC-20');
    });

    it('should have required key functions: transfer, balanceOf, approve', () => {
      const erc20 = getStandardByType('ERC-20')!;
      const fnNames = erc20.keyFunctions.map(f => f.split('(')[0]);
      expect(fnNames).toContain('transfer');
      expect(fnNames).toContain('balanceOf');
      expect(fnNames).toContain('approve');
      expect(fnNames).toContain('transferFrom');
      expect(fnNames).toContain('allowance');
    });

    it('should be fungible with no batch operations', () => {
      const erc20 = getStandardByType('ERC-20')!;
      expect(erc20.features.tokenType).toContain('Fungible');
      expect(erc20.features.batchOperations).toBe('No');
      expect(erc20.features.divisibility).toContain('18 decimals');
    });

    it('should include currency and governance use cases', () => {
      const erc20 = getStandardByType('ERC-20')!;
      const useCases = erc20.useCases.join(' ').toLowerCase();
      expect(useCases).toContain('currencies');
      expect(useCases).toContain('governance');
    });
  });

  // ── ERC-721 (Non-Fungible Tokens / NFTs) ────

  describe('ERC-721 Standard', () => {
    it('should return ERC-721 standard data', () => {
      const erc721 = getStandardByType('ERC-721');
      expect(erc721).toBeDefined();
      expect(erc721!.type).toBe('ERC-721');
    });

    it('should have tokenURI and ownerOf functions', () => {
      const erc721 = getStandardByType('ERC-721')!;
      const fnNames = erc721.keyFunctions.map(f => f.split('(')[0]);
      expect(fnNames).toContain('tokenURI');
      expect(fnNames).toContain('ownerOf');
      expect(fnNames).toContain('safeTransferFrom');
    });

    it('should be non-fungible and indivisible', () => {
      const erc721 = getStandardByType('ERC-721')!;
      expect(erc721.features.tokenType).toContain('Non-Fungible');
      expect(erc721.features.uniqueness).toContain('unique');
      expect(erc721.features.divisibility).toContain('indivisible');
    });

    it('should include metadata support via tokenURI', () => {
      const erc721 = getStandardByType('ERC-721')!;
      expect(erc721.features.metadata).toContain('tokenURI');
    });

    it('should include digital art and collectibles use cases', () => {
      const erc721 = getStandardByType('ERC-721')!;
      const useCases = erc721.useCases.join(' ').toLowerCase();
      expect(useCases).toContain('art');
      expect(useCases).toContain('collectibles');
    });
  });

  // ── ERC-1155 (Multi-Token Standard) ─────────

  describe('ERC-1155 Standard', () => {
    it('should return ERC-1155 standard data', () => {
      const erc1155 = getStandardByType('ERC-1155');
      expect(erc1155).toBeDefined();
      expect(erc1155!.type).toBe('ERC-1155');
    });

    it('should support batch operations', () => {
      const erc1155 = getStandardByType('ERC-1155')!;
      const fnNames = erc1155.keyFunctions.map(f => f.split('(')[0]);
      expect(fnNames).toContain('safeBatchTransferFrom');
      expect(fnNames).toContain('balanceOfBatch');
      expect(erc1155.features.batchOperations).toContain('Yes');
    });

    it('should support both fungible and non-fungible tokens', () => {
      const erc1155 = getStandardByType('ERC-1155')!;
      expect(erc1155.features.tokenType).toContain('Fungible');
      expect(erc1155.features.tokenType).toContain('Non-Fungible');
    });

    it('should have high gas efficiency for batch transfers', () => {
      const erc1155 = getStandardByType('ERC-1155')!;
      expect(erc1155.features.gasEfficiency).toContain('High');
    });

    it('should include gaming use cases', () => {
      const erc1155 = getStandardByType('ERC-1155')!;
      const useCases = erc1155.useCases.join(' ').toLowerCase();
      expect(useCases).toContain('game');
    });
  });

  // ── Cross-Standard Queries ──────────────────

  describe('Cross-Standard Queries', () => {
    it('should return all 3 standards', () => {
      const all = getAllStandards();
      expect(all).toHaveLength(3);
      const types = all.map(s => s.type);
      expect(types).toContain('ERC-20');
      expect(types).toContain('ERC-721');
      expect(types).toContain('ERC-1155');
    });

    it('should return undefined for unknown standard', () => {
      expect(getStandardByType('ERC-999')).toBeUndefined();
    });

    it('should be case-insensitive', () => {
      expect(getStandardByType('erc-20')).toBeDefined();
      expect(getStandardByType('Erc-721')).toBeDefined();
    });

    it('should produce a valid comparison table', () => {
      const cmp = compareStandards();
      expect(cmp).toHaveProperty('tokenType');
      expect(cmp).toHaveProperty('gasEfficiency');
      expect(cmp.tokenType).toHaveProperty('ERC-20');
      expect(cmp.tokenType).toHaveProperty('ERC-721');
      expect(cmp.tokenType).toHaveProperty('ERC-1155');
    });
  });
});
