export interface NFTProject {
  name: string;
  category: 'Art' | 'Gaming' | 'Metaverse' | 'Music' | 'Identity';
  standard: 'ERC-721' | 'ERC-1155';
  description: string;
  technicalDetails: string[];
  deploymentSteps: string[];
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string | number }[];
  external_url?: string;
  animation_url?: string;
}

export interface NFTMintingFlow {
  step: number;
  title: string;
  description: string;
  code: string;
}

export interface NFTStorageSolution {
  name: string;
  type: 'Decentralized' | 'Centralized' | 'On-Chain';
  description: string;
  pros: string[];
  cons: string[];
}

const NFT_PROJECTS: NFTProject[] = [
  {
    name: 'Generative Art Collection',
    category: 'Art',
    standard: 'ERC-721',
    description:
      'A 10,000-piece algorithmically generated art collection with traits and rarity tiers. Each token has unique metadata stored on IPFS.',
    technicalDetails: [
      'ERC-721 with ERC-721Enumerable for on-chain querying',
      'Provenance hash committed before reveal for fairness',
      'Metadata reveal pattern: baseURI updated post-mint',
      'Royalty support via ERC-2981 (on-chain royalty info)',
      'Whitelist minting using Merkle proof verification',
    ],
    deploymentSteps: [
      'Generate art layers and trait combinations off-chain',
      'Upload images and metadata JSON to IPFS/Arweave',
      'Deploy ERC-721 contract with hidden baseURI (pre-reveal)',
      'Conduct whitelist mint phase with Merkle proof verification',
      'Open public mint with per-wallet and per-tx limits',
      'Reveal by updating baseURI to final IPFS CID',
      'Verify contract on Etherscan and list on OpenSea',
    ],
  },
  {
    name: 'Play-to-Earn Game Assets',
    category: 'Gaming',
    standard: 'ERC-1155',
    description:
      'A blockchain game with multiple asset types: fungible in-game currency, semi-fungible consumables, and unique legendary items — all in one ERC-1155 contract.',
    technicalDetails: [
      'ERC-1155 for mixed fungible/non-fungible assets',
      'Token ID ranges: 1-999 fungible, 1000-9999 semi-fungible, 10000+ unique',
      'Batch minting and transfers for gas-efficient operations',
      'Game server validates actions before on-chain minting',
      'Off-chain metadata with on-chain attribute hash for integrity',
    ],
    deploymentSteps: [
      'Design token ID schema (fungible ranges, NFT ranges)',
      'Deploy ERC-1155 contract with uri() template',
      'Build game server with signing authority for minting',
      'Implement claim flow: game server signs → user submits tx',
      'Add marketplace contract for peer-to-peer trading',
      'Deploy subgraph for indexing game events',
    ],
  },
  {
    name: 'Decentralized Identity (DID)',
    category: 'Identity',
    standard: 'ERC-721',
    description:
      'Soulbound tokens (SBTs) for on-chain identity: credentials, certifications, and reputation scores that are non-transferable.',
    technicalDetails: [
      'ERC-721 with transfer functions overridden to revert',
      'ERC-5192 (Minimal Soulbound Interface) for lock status',
      'Issuer-controlled minting with revocation capability',
      'On-chain attestation data via ERC-725 compatible schema',
      'Zero-knowledge proofs for selective disclosure',
    ],
    deploymentSteps: [
      'Deploy SBT contract with disabled transfers',
      'Implement issuer whitelist (DAOs, institutions)',
      'Create attestation schema for credential types',
      'Build verification UI for third parties',
      'Add revocation registry for expired credentials',
    ],
  },
];

const METADATA_EXAMPLE: NFTMetadata = {
  name: 'Cosmic Ape #7823',
  description: 'A unique generative art piece from the Cosmic Ape collection.',
  image: 'ipfs://QmXxx.../7823.png',
  attributes: [
    { trait_type: 'Background', value: 'Nebula' },
    { trait_type: 'Fur', value: 'Golden' },
    { trait_type: 'Eyes', value: 'Laser' },
    { trait_type: 'Hat', value: 'Crown' },
    { trait_type: 'Rarity Score', value: 92 },
  ],
  external_url: 'https://cosmicapes.io/token/7823',
};

const MINTING_FLOW: NFTMintingFlow[] = [
  {
    step: 1,
    title: 'Connect Wallet',
    description: 'User connects via MetaMask or WalletConnect. dApp reads wallet address and chain ID.',
    code: 'const accounts = await ethereum.request({ method: "eth_requestAccounts" });',
  },
  {
    step: 2,
    title: 'Check Eligibility',
    description: 'Verify whitelist status using Merkle proof, check max mint limits, and confirm sufficient ETH balance.',
    code: 'const leaf = keccak256(address); const valid = MerkleTree.verify(proof, leaf, root);',
  },
  {
    step: 3,
    title: 'Execute Mint Transaction',
    description: 'Call the mint function on the smart contract with quantity and payment (msg.value).',
    code: 'await contract.mint(quantity, proof, { value: price * quantity });',
  },
  {
    step: 4,
    title: 'Confirm & Index',
    description: 'Wait for transaction confirmation. Subgraph indexes the Transfer event. UI updates with new token.',
    code: 'const receipt = await tx.wait(); const tokenId = receipt.logs[0].args.tokenId;',
  },
];

const STORAGE_SOLUTIONS: NFTStorageSolution[] = [
  {
    name: 'IPFS + Pinata/NFT.Storage',
    type: 'Decentralized',
    description: 'Content-addressed storage where the CID (hash) guarantees data integrity. Pinning services ensure availability.',
    pros: ['Immutable content addressing', 'Decentralized', 'Industry standard', 'Free via NFT.Storage'],
    cons: ['Requires pinning for persistence', 'Slower retrieval', 'No built-in CDN'],
  },
  {
    name: 'Arweave',
    type: 'Decentralized',
    description: 'Permanent storage with a one-time fee. Data is stored forever across the Arweave network.',
    pros: ['Truly permanent (200+ year design)', 'One-time payment', 'No pinning needed'],
    cons: ['Higher upfront cost', 'Smaller ecosystem', 'Slower uploads'],
  },
  {
    name: 'On-Chain SVG',
    type: 'On-Chain',
    description: 'Art generated and stored entirely on-chain as SVG in the tokenURI. No external dependencies.',
    pros: ['Fully decentralized', 'No external links can break', 'Composable on-chain'],
    cons: ['Very expensive gas costs', 'Limited to simple graphics', 'Size constraints (~24KB)'],
  },
];

export function getAllNFTProjects(): NFTProject[] {
  return NFT_PROJECTS;
}

export function getNFTProject(category: string): NFTProject | undefined {
  return NFT_PROJECTS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getMetadataExample(): NFTMetadata {
  return METADATA_EXAMPLE;
}

export function getMintingFlow(): NFTMintingFlow[] {
  return MINTING_FLOW;
}

export function getStorageSolutions(): NFTStorageSolution[] {
  return STORAGE_SOLUTIONS;
}
