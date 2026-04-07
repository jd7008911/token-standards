import type { TokenStandard } from '../types/index.js';

const TOKEN_STANDARDS: TokenStandard[] = [
  {
    name: 'ERC-20',
    type: 'ERC-20',
    description:
      'The standard for fungible tokens, where any single unit is exactly the same as another. Your $1 USDC is identical to anyone else\'s $1 USDC.',
    keyFunctions: [
      'totalSupply()',
      'balanceOf(address)',
      'transfer(address, uint256)',
      'approve(address, uint256)',
      'transferFrom(address, address, uint256)',
      'allowance(address, address)',
    ],
    useCases: [
      'Currencies (USDC, DAI)',
      'Governance tokens (UNI, AAVE)',
      'Utility tokens',
    ],
    features: {
      tokenType: 'Fungible (interchangeable)',
      uniqueness: 'No, all units are identical',
      divisibility: 'Yes (usually up to 18 decimals)',
      metadata: 'No built-in metadata',
      batchOperations: 'No',
      gasEfficiency: 'Standard',
    },
  },
  {
    name: 'ERC-721',
    type: 'ERC-721',
    description:
      'The NFT standard that allows creation of unique, indivisible tokens representing ownership of a specific digital or physical asset. Each token has a distinct tokenId.',
    keyFunctions: [
      'balanceOf(address)',
      'ownerOf(uint256)',
      'safeTransferFrom(address, address, uint256)',
      'transferFrom(address, address, uint256)',
      'approve(address, uint256)',
      'setApprovalForAll(address, bool)',
      'tokenURI(uint256)',
    ],
    useCases: [
      'Digital Art',
      'Collectibles (CryptoKitties)',
      'Game Items',
      'Identity & Tickets',
    ],
    features: {
      tokenType: 'Non-Fungible (unique)',
      uniqueness: 'Yes, each token has a unique tokenId',
      divisibility: 'No (indivisible)',
      metadata: 'Yes (tokenURI pointing to a JSON file)',
      batchOperations: 'No',
      gasEfficiency: 'Standard (expensive for multiple transfers)',
    },
  },
  {
    name: 'ERC-1155',
    type: 'ERC-1155',
    description:
      'A multi-token standard that combines fungible and non-fungible tokens in a single contract. Ideal for managing entire game inventories efficiently.',
    keyFunctions: [
      'balanceOf(address, uint256)',
      'balanceOfBatch(address[], uint256[])',
      'safeTransferFrom(address, address, uint256, uint256, bytes)',
      'safeBatchTransferFrom(address, address, uint256[], uint256[], bytes)',
      'setApprovalForAll(address, bool)',
      'uri(uint256)',
    ],
    useCases: [
      'Blockchain Games (weapons, armor, currencies)',
      'Complex asset management',
      'Semi-fungible tokens (limited edition items)',
    ],
    features: {
      tokenType: 'Both Fungible & Non-Fungible',
      uniqueness: 'Optional, defined per token ID',
      divisibility: 'Configurable (18 decimals for fungible, 0 for NFTs)',
      metadata: 'Yes (URI can be set per ID)',
      batchOperations: 'Yes (transfer or mint many tokens at once)',
      gasEfficiency: 'High (significantly cheaper for batch transfers)',
    },
  },
];

export function getAllStandards(): TokenStandard[] {
  return TOKEN_STANDARDS;
}

export function getStandardByType(type: string): TokenStandard | undefined {
  return TOKEN_STANDARDS.find(
    (s) => s.type.toLowerCase() === type.toLowerCase()
  );
}

export function compareStandards(): Record<string, Record<string, string>> {
  const comparison: Record<string, Record<string, string>> = {};
  const featureKeys = Object.keys(TOKEN_STANDARDS[0].features);

  for (const key of featureKeys) {
    comparison[key] = {};
    for (const standard of TOKEN_STANDARDS) {
      comparison[key][standard.type] = standard.features[key];
    }
  }

  return comparison;
}
