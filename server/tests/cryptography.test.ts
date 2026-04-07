import { describe, it, expect } from 'vitest';
import {
  hashData,
  generateKeyPair,
  signMessage,
  verifySignature,
  demonstrateAvalancheEffect,
} from '../src/services/cryptography.service.js';

describe('Cryptography Service', () => {
  // ── Hash Functions ──────────────────────────

  describe('Hash Functions', () => {
    it('should produce deterministic keccak256 hash', () => {
      const result1 = hashData('Hello, Blockchain!');
      const result2 = hashData('Hello, Blockchain!');
      expect(result1.hash).toBe(result2.hash);
      expect(result1.algorithm).toBe('keccak256');
    });

    it('should produce deterministic sha256 hash', () => {
      const result = hashData('Hello, Blockchain!', 'sha256');
      expect(result.algorithm).toBe('sha256');
      expect(result.hash).toMatch(/^0x[a-f0-9]{64}$/);
    });

    it('should produce a fixed-size 256-bit hash output', () => {
      const short = hashData('a');
      const long = hashData('a'.repeat(10000));
      // Both should be 66 chars: 0x + 64 hex chars = 256 bits
      expect(short.hash).toHaveLength(66);
      expect(long.hash).toHaveLength(66);
    });

    it('should be a one-way function (hash differs from input)', () => {
      const result = hashData('test');
      expect(result.hash).not.toBe(result.input);
    });

    it('should default to keccak256 for unknown algorithm', () => {
      const result = hashData('test', 'unknown');
      expect(result.algorithm).toBe('keccak256');
    });
  });

  // ── Avalanche Effect ────────────────────────

  describe('Avalanche Effect', () => {
    it('should produce completely different hashes for similar inputs', () => {
      const result = demonstrateAvalancheEffect('Blockchain');
      expect(result.original.hash).not.toBe(result.modified.hash);
      expect(result.original.input).not.toBe(result.modified.input);
    });

    it('should change only the last character of input', () => {
      const result = demonstrateAvalancheEffect('ABC');
      expect(result.modified.input).toHaveLength(result.original.input.length);
    });
  });

  // ── Public-Key Cryptography (ECC) ──────────

  describe('Key Pair Generation (ECC / secp256k1)', () => {
    it('should generate a valid Ethereum key pair', () => {
      const kp = generateKeyPair();
      expect(kp.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(kp.privateKey).toMatch(/^0x[a-f0-9]{64}$/);
      expect(kp.publicKey).toBeTruthy();
    });

    it('should generate unique key pairs each time', () => {
      const kp1 = generateKeyPair();
      const kp2 = generateKeyPair();
      expect(kp1.privateKey).not.toBe(kp2.privateKey);
      expect(kp1.address).not.toBe(kp2.address);
    });
  });

  // ── Digital Signatures (ECDSA) ─────────────

  describe('Digital Signatures (ECDSA)', () => {
    it('should sign a message and return valid signature components', () => {
      const kp = generateKeyPair();
      const result = signMessage('Send 2 ETH to Bob', kp.privateKey);

      expect(result.message).toBe('Send 2 ETH to Bob');
      expect(result.messageHash).toMatch(/^0x[a-f0-9]{64}$/);
      expect(result.signature).toBeTruthy();
      expect(result.signerAddress).toBe(kp.address);
    });

    it('should verify a valid signature and recover the signer address', () => {
      const kp = generateKeyPair();
      const signed = signMessage('Send 2 ETH to Bob', kp.privateKey);
      const verified = verifySignature('Send 2 ETH to Bob', signed.signature);

      expect(verified.isValid).toBe(true);
      expect(verified.recoveredAddress).toBe(kp.address);
    });

    it('should recover a different address for a tampered message', () => {
      const kp = generateKeyPair();
      const signed = signMessage('Send 2 ETH to Bob', kp.privateKey);
      const verified = verifySignature('Send 5 ETH to Bob', signed.signature);

      // Signature is technically valid but recovers a different address
      expect(verified.recoveredAddress).not.toBe(kp.address);
    });

    it('should throw on invalid private key', () => {
      expect(() => signMessage('test', '0xinvalid')).toThrow();
    });
  });
});
