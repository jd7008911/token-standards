export interface HashResult {
  algorithm: string;
  input: string;
  hash: string;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
  address: string;
}

export interface SignatureResult {
  message: string;
  messageHash: string;
  signature: string;
  signerAddress: string;
}

export interface VerifyResult {
  message: string;
  signature: string;
  recoveredAddress: string;
  isValid: boolean;
}

export interface TokenStandard {
  name: string;
  type: 'ERC-20' | 'ERC-721' | 'ERC-1155';
  description: string;
  keyFunctions: string[];
  useCases: string[];
  features: Record<string, string>;
}

export interface WalletMethod {
  name: string;
  type: 'MetaMask' | 'WalletConnect';
  description: string;
  connectionFlow: string[];
  securityFeatures: string[];
  pros: string[];
  cons: string[];
}

export interface SecurityPractice {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
