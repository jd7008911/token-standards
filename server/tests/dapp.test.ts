import { describe, it, expect } from 'vitest';
import {
  getDAppArchitecture,
  getDeploymentPipeline,
  getSmartContractPatterns,
  getPatternsByCategory,
  getAuditChecklist,
} from '../src/services/dapp.service.js';

describe('dApp Service', () => {
  // ── Architecture ───────────────────────────

  describe('getDAppArchitecture()', () => {
    it('should return 3 architectural layers', () => {
      const arch = getDAppArchitecture();
      expect(arch).toHaveLength(3);
    });

    it('should include Frontend, Middleware, and Blockchain layers', () => {
      const layers = getDAppArchitecture().map(a => a.layer);
      expect(layers.some(l => l.includes('Frontend'))).toBe(true);
      expect(layers.some(l => l.includes('Middleware'))).toBe(true);
      expect(layers.some(l => l.includes('Blockchain'))).toBe(true);
    });

    it('should have components with technologies for each layer', () => {
      for (const layer of getDAppArchitecture()) {
        expect(layer.components.length).toBeGreaterThan(0);
        for (const component of layer.components) {
          expect(component.name).toBeDefined();
          expect(component.description).toBeDefined();
          expect(component.technologies.length).toBeGreaterThan(0);
        }
      }
    });
  });

  // ── Deployment Pipeline ───────────────────

  describe('getDeploymentPipeline()', () => {
    it('should return at least 4 deployment stages', () => {
      const pipeline = getDeploymentPipeline();
      expect(pipeline.length).toBeGreaterThanOrEqual(4);
    });

    it('should have tools and best practices for each stage', () => {
      for (const stage of getDeploymentPipeline()) {
        expect(stage.stage).toBeDefined();
        expect(stage.description).toBeDefined();
        expect(stage.tools.length).toBeGreaterThan(0);
        expect(stage.bestPractices.length).toBeGreaterThan(0);
      }
    });

    it('should include a testing stage', () => {
      const stages = getDeploymentPipeline().map(s => s.stage.toLowerCase());
      expect(stages.some(s => s.includes('test'))).toBe(true);
    });
  });

  // ── Smart Contract Patterns ───────────────

  describe('getSmartContractPatterns()', () => {
    it('should return at least 5 patterns', () => {
      const patterns = getSmartContractPatterns();
      expect(patterns.length).toBeGreaterThanOrEqual(5);
    });

    it('should include Security and Upgradeability patterns', () => {
      const categories = getSmartContractPatterns().map(p => p.category);
      expect(categories).toContain('Security');
      expect(categories).toContain('Upgradeability');
    });

    it('should include implementation code for each pattern', () => {
      for (const pattern of getSmartContractPatterns()) {
        expect(pattern.implementation.length).toBeGreaterThan(0);
        expect(pattern.when.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getPatternsByCategory()', () => {
    it('should return Security patterns', () => {
      const patterns = getPatternsByCategory('Security');
      expect(patterns.length).toBeGreaterThan(0);
      for (const p of patterns) {
        expect(p.category).toBe('Security');
      }
    });

    it('should return empty array for unknown category', () => {
      expect(getPatternsByCategory('Unknown')).toEqual([]);
    });
  });

  // ── Audit Checklist ───────────────────────

  describe('getAuditChecklist()', () => {
    it('should return at least 3 audit categories', () => {
      const checklist = getAuditChecklist();
      expect(checklist.length).toBeGreaterThanOrEqual(3);
    });

    it('should include Critical and High severity items', () => {
      const allItems = getAuditChecklist().flatMap(c => c.items);
      const severities = allItems.map(i => i.severity);
      expect(severities).toContain('Critical');
      expect(severities).toContain('High');
    });

    it('should have items with check descriptions', () => {
      for (const category of getAuditChecklist()) {
        expect(category.category).toBeDefined();
        expect(category.items.length).toBeGreaterThan(0);
        for (const item of category.items) {
          expect(item.check.length).toBeGreaterThan(0);
          expect(['Critical', 'High', 'Medium', 'Low']).toContain(item.severity);
        }
      }
    });
  });
});
