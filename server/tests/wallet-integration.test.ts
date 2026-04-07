import { describe, it, expect } from 'vitest';
import {
  getAllWalletMethods,
  getWalletMethod,
  getSecurityBestPractices,
} from '../src/services/wallet.service.js';

describe('Wallet Integration Service', () => {
  // ── MetaMask ────────────────────────────────

  describe('MetaMask', () => {
    it('should return MetaMask wallet method', () => {
      const mm = getWalletMethod('MetaMask');
      expect(mm).toBeDefined();
      expect(mm!.type).toBe('MetaMask');
      expect(mm!.name).toBe('MetaMask');
    });

    it('should describe injected wallet connection flow', () => {
      const mm = getWalletMethod('MetaMask')!;
      const flow = mm.connectionFlow.join(' ').toLowerCase();
      expect(flow).toContain('extension');
      expect(flow).toContain('eth_requestaccounts');
      expect(flow).toContain('permission');
    });

    it('should list EIP-712 and hardware wallet security features', () => {
      const mm = getWalletMethod('MetaMask')!;
      const features = mm.securityFeatures.join(' ');
      expect(features).toContain('EIP-712');
      expect(features).toContain('Hardware wallet');
    });

    it('should note hot wallet as a con', () => {
      const mm = getWalletMethod('MetaMask')!;
      const cons = mm.cons.join(' ').toLowerCase();
      expect(cons).toContain('hot wallet');
    });
  });

  // ── WalletConnect ───────────────────────────

  describe('WalletConnect', () => {
    it('should return WalletConnect wallet method', () => {
      const wc = getWalletMethod('WalletConnect');
      expect(wc).toBeDefined();
      expect(wc!.type).toBe('WalletConnect');
    });

    it('should describe QR code connection flow via relay server', () => {
      const wc = getWalletMethod('WalletConnect')!;
      const flow = wc.connectionFlow.join(' ').toLowerCase();
      expect(flow).toContain('qr code');
      expect(flow).toContain('relay server');
      expect(flow).toContain('mobile wallet');
    });

    it('should highlight private keys never leaving the mobile wallet', () => {
      const wc = getWalletMethod('WalletConnect')!;
      const features = wc.securityFeatures.join(' ').toLowerCase();
      expect(features).toContain('private keys never leave');
    });

    it('should list open-source as a pro', () => {
      const wc = getWalletMethod('WalletConnect')!;
      const pros = wc.pros.join(' ').toLowerCase();
      expect(pros).toContain('open-source');
    });
  });

  // ── Security Best Practices ─────────────────

  describe('Security Best Practices', () => {
    it('should return security practices', () => {
      const practices = getSecurityBestPractices();
      expect(practices.length).toBeGreaterThanOrEqual(3);
    });

    it('should include Revoke Approvals practice', () => {
      const practices = getSecurityBestPractices();
      const revoke = practices.find(p => p.title.includes('Revoke'));
      expect(revoke).toBeDefined();
      expect(revoke!.description).toContain('approve()');
      expect(revoke!.description).toContain('Revoke.cash');
    });

    it('should include EIP-712 transaction verification', () => {
      const practices = getSecurityBestPractices();
      const verify = practices.find(p => p.title.includes('Verify'));
      expect(verify).toBeDefined();
      expect(verify!.description).toContain('EIP-712');
    });

    it('should include hardware wallet recommendation', () => {
      const practices = getSecurityBestPractices();
      const hw = practices.find(p => p.title.toLowerCase().includes('hardware'));
      expect(hw).toBeDefined();
      expect(hw!.description).toContain('Ledger');
      expect(hw!.description).toContain('Trezor');
    });
  });

  // ── Cross-Wallet Queries ────────────────────

  describe('Cross-Wallet Queries', () => {
    it('should return both wallet methods', () => {
      const all = getAllWalletMethods();
      expect(all).toHaveLength(2);
      const types = all.map(w => w.type);
      expect(types).toContain('MetaMask');
      expect(types).toContain('WalletConnect');
    });

    it('should return undefined for unknown wallet', () => {
      expect(getWalletMethod('Phantom')).toBeUndefined();
    });

    it('should be case-insensitive', () => {
      expect(getWalletMethod('metamask')).toBeDefined();
      expect(getWalletMethod('walletconnect')).toBeDefined();
    });
  });
});
