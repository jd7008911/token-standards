import { describe, it, expect } from 'vitest';
import {
  getAllNFTProjects,
  getNFTProject,
  getMetadataExample,
  getMintingFlow,
  getStorageSolutions,
} from '../src/services/nft.service.js';

describe('NFT Service', () => {
  // ── Projects ───────────────────────────────

  describe('getAllNFTProjects()', () => {
    it('should return 3 NFT projects', () => {
      const projects = getAllNFTProjects();
      expect(projects).toHaveLength(3);
    });

    it('should include Art, Gaming, and Identity categories', () => {
      const categories = getAllNFTProjects().map(p => p.category);
      expect(categories).toContain('Art');
      expect(categories).toContain('Gaming');
      expect(categories).toContain('Identity');
    });

    it('should use ERC-721 or ERC-1155 standard', () => {
      for (const project of getAllNFTProjects()) {
        expect(['ERC-721', 'ERC-1155']).toContain(project.standard);
      }
    });

    it('should have deployment steps for each project', () => {
      for (const project of getAllNFTProjects()) {
        expect(project.deploymentSteps.length).toBeGreaterThan(0);
        expect(project.technicalDetails.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getNFTProject()', () => {
    it('should return Art project by category', () => {
      const art = getNFTProject('Art');
      expect(art).toBeDefined();
      expect(art!.category).toBe('Art');
    });

    it('should return Gaming project by category', () => {
      const gaming = getNFTProject('Gaming');
      expect(gaming).toBeDefined();
      expect(gaming!.category).toBe('Gaming');
    });

    it('should return Identity project by category', () => {
      const identity = getNFTProject('Identity');
      expect(identity).toBeDefined();
      expect(identity!.category).toBe('Identity');
    });

    it('should return undefined for unknown category', () => {
      expect(getNFTProject('Unknown')).toBeUndefined();
    });
  });

  // ── Metadata ───────────────────────────────

  describe('getMetadataExample()', () => {
    it('should return valid ERC-721 metadata structure', () => {
      const metadata = getMetadataExample();
      expect(metadata.name).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.image).toBeDefined();
      expect(metadata.attributes).toBeDefined();
    });

    it('should include IPFS image URI', () => {
      const metadata = getMetadataExample();
      expect(metadata.image).toMatch(/^ipfs:\/\//);
    });

    it('should have trait attributes with type and value', () => {
      const metadata = getMetadataExample();
      expect(metadata.attributes.length).toBeGreaterThan(0);
      for (const attr of metadata.attributes) {
        expect(attr.trait_type).toBeDefined();
        expect(attr.value).toBeDefined();
      }
    });
  });

  // ── Minting Flow ──────────────────────────

  describe('getMintingFlow()', () => {
    it('should return ordered minting steps', () => {
      const flow = getMintingFlow();
      expect(flow.length).toBeGreaterThanOrEqual(3);
      for (let i = 0; i < flow.length; i++) {
        expect(flow[i].step).toBe(i + 1);
      }
    });

    it('should include code snippets', () => {
      for (const step of getMintingFlow()) {
        expect(step.code.length).toBeGreaterThan(0);
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
      }
    });
  });

  // ── Storage Solutions ─────────────────────

  describe('getStorageSolutions()', () => {
    it('should return at least 3 storage solutions', () => {
      const solutions = getStorageSolutions();
      expect(solutions.length).toBeGreaterThanOrEqual(3);
    });

    it('should include decentralized and on-chain options', () => {
      const types = getStorageSolutions().map(s => s.type);
      expect(types).toContain('Decentralized');
      expect(types).toContain('On-Chain');
    });

    it('should list pros and cons for each solution', () => {
      for (const solution of getStorageSolutions()) {
        expect(solution.pros.length).toBeGreaterThan(0);
        expect(solution.cons.length).toBeGreaterThan(0);
      }
    });
  });
});
