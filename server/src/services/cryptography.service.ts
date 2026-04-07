import { ethers } from 'ethers';
import type { HashResult, KeyPair, SignatureResult, VerifyResult } from '../types/index.js';

export function hashData(input: string, algorithm: string = 'keccak256'): HashResult {
  let hash: string;

  switch (algorithm) {
    case 'keccak256':
      hash = ethers.keccak256(ethers.toUtf8Bytes(input));
      break;
    case 'sha256':
      hash = ethers.sha256(ethers.toUtf8Bytes(input));
      break;
    case 'id':
      hash = ethers.id(input);
      break;
    default:
      hash = ethers.keccak256(ethers.toUtf8Bytes(input));
      algorithm = 'keccak256';
  }

  return { algorithm, input, hash };
}

export function generateKeyPair(): KeyPair {
  const wallet = ethers.Wallet.createRandom();
  return {
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
}

export function signMessage(message: string, privateKey: string): SignatureResult {
  const wallet = new ethers.Wallet(privateKey);
  const messageHash = ethers.hashMessage(message);
  const signature = wallet.signMessageSync(message);

  return {
    message,
    messageHash,
    signature,
    signerAddress: wallet.address,
  };
}

export function verifySignature(message: string, signature: string): VerifyResult {
  const recoveredAddress = ethers.verifyMessage(message, signature);
  return {
    message,
    signature,
    recoveredAddress,
    isValid: true,
  };
}

export function demonstrateAvalancheEffect(input: string): { original: HashResult; modified: HashResult } {
  const original = hashData(input);
  const modifiedInput = input.slice(0, -1) + String.fromCharCode(input.charCodeAt(input.length - 1) + 1);
  const modified = hashData(modifiedInput);

  return { original, modified };
}
