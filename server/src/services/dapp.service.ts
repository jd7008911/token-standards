export interface DAppArchitecture {
  layer: string;
  components: { name: string; description: string; technologies: string[] }[];
}

export interface DeploymentPipeline {
  stage: string;
  description: string;
  tools: string[];
  bestPractices: string[];
}

export interface SmartContractPattern {
  name: string;
  category: 'Security' | 'Upgradeability' | 'Gas' | 'Access Control';
  description: string;
  implementation: string;
  when: string;
}

export interface AuditChecklist {
  category: string;
  items: { check: string; severity: 'Critical' | 'High' | 'Medium' | 'Low' }[];
}

const DAPP_ARCHITECTURE: DAppArchitecture[] = [
  {
    layer: 'Frontend (Client)',
    components: [
      {
        name: 'Web Application',
        description: 'Vue/React SPA that serves as the user interface. Connects to wallet and displays blockchain data.',
        technologies: ['Vue 3', 'React', 'Next.js', 'TypeScript', 'Vite'],
      },
      {
        name: 'Web3 Provider',
        description: 'Abstracts wallet interactions. Provides signer for transactions and provider for read-only calls.',
        technologies: ['ethers.js', 'viem', 'wagmi', 'web3-react'],
      },
      {
        name: 'State Management',
        description: 'Manages wallet connection state, on-chain data cache, and UI state.',
        technologies: ['Pinia', 'Zustand', 'TanStack Query'],
      },
    ],
  },
  {
    layer: 'Middleware (Indexing & APIs)',
    components: [
      {
        name: 'Subgraph (The Graph)',
        description: 'Indexes blockchain events into a queryable GraphQL API. Essential for efficient querying of historical data.',
        technologies: ['The Graph', 'Substreams', 'AssemblyScript'],
      },
      {
        name: 'Backend API',
        description: 'Handles off-chain logic: metadata serving, signature verification, rate limiting, and database operations.',
        technologies: ['Node.js', 'Express', 'Fastify', 'TypeScript'],
      },
      {
        name: 'IPFS Gateway',
        description: 'Serves decentralized content (NFT images, metadata) via HTTP for browser compatibility.',
        technologies: ['Pinata', 'NFT.Storage', 'Infura IPFS'],
      },
    ],
  },
  {
    layer: 'Blockchain (Smart Contracts)',
    components: [
      {
        name: 'Core Contracts',
        description: 'Business logic deployed on-chain: token contracts, marketplace, governance, staking.',
        technologies: ['Solidity', 'OpenZeppelin', 'Hardhat', 'Foundry'],
      },
      {
        name: 'Proxy Pattern',
        description: 'Enables upgradeable contracts via delegate call. Separates storage from logic.',
        technologies: ['TransparentProxy', 'UUPS', 'Diamond (EIP-2535)'],
      },
      {
        name: 'Oracle Integration',
        description: 'Brings off-chain data on-chain for price feeds, VRF randomness, and automation.',
        technologies: ['Chainlink', 'Band Protocol', 'UMA'],
      },
    ],
  },
];

const DEPLOYMENT_PIPELINE: DeploymentPipeline[] = [
  {
    stage: 'Development',
    description: 'Write and unit-test smart contracts locally with fast iteration.',
    tools: ['Hardhat', 'Foundry', 'Remix IDE'],
    bestPractices: [
      'Use OpenZeppelin battle-tested contracts as base',
      'Write comprehensive unit tests (aim for 100% branch coverage)',
      'Use natspec comments for documentation',
      'Implement access control from day one',
    ],
  },
  {
    stage: 'Testing',
    description: 'Integration testing, fuzzing, and static analysis to find vulnerabilities.',
    tools: ['Foundry Fuzz', 'Slither', 'Mythril', 'Echidna'],
    bestPractices: [
      'Fuzz testing for edge cases in math operations',
      'Static analysis with Slither for common vulnerabilities',
      'Fork mainnet for integration tests against real protocols',
      'Formal verification for critical financial logic',
    ],
  },
  {
    stage: 'Audit',
    description: 'Professional security audit before mainnet deployment.',
    tools: ['OpenZeppelin Audits', 'Trail of Bits', 'Consensys Diligence', 'Code4rena'],
    bestPractices: [
      'Freeze code before audit — no changes during review',
      'Provide comprehensive documentation and test suite',
      'Run bug bounty program post-audit',
      'Address all findings before deployment',
    ],
  },
  {
    stage: 'Testnet Deployment',
    description: 'Deploy to testnet for real-world integration testing with test tokens.',
    tools: ['Sepolia', 'Mumbai (Polygon)', 'Fuji (Avalanche)', 'Hardhat Deploy'],
    bestPractices: [
      'Test full user flows end-to-end',
      'Verify contracts on block explorer',
      'Test with multiple wallets and edge cases',
      'Monitor gas usage and optimize',
    ],
  },
  {
    stage: 'Mainnet Deployment',
    description: 'Production deployment with verified contracts and monitoring.',
    tools: ['Hardhat Deploy', 'Tenderly', 'OpenZeppelin Defender', 'Etherscan'],
    bestPractices: [
      'Use multisig (Gnosis Safe) for contract ownership',
      'Implement timelock for governance actions',
      'Set up monitoring and alerting (Tenderly, Forta)',
      'Verify all contracts on Etherscan immediately',
      'Publish deployment addresses and ABIs',
    ],
  },
];

const SMART_CONTRACT_PATTERNS: SmartContractPattern[] = [
  {
    name: 'Checks-Effects-Interactions',
    category: 'Security',
    description: 'Prevent reentrancy by ordering: validate inputs (checks), update state (effects), then call external contracts (interactions).',
    implementation: 'function withdraw(uint amount) { require(balances[msg.sender] >= amount); balances[msg.sender] -= amount; (bool ok,) = msg.sender.call{value: amount}(""); require(ok); }',
    when: 'Every function that makes external calls or sends ETH',
  },
  {
    name: 'ReentrancyGuard',
    category: 'Security',
    description: 'OpenZeppelin mutex that prevents reentrant calls. Uses a locked state variable to block nested calls.',
    implementation: 'import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; function withdraw() external nonReentrant { ... }',
    when: 'Functions that transfer ETH or call untrusted contracts',
  },
  {
    name: 'UUPS Proxy',
    category: 'Upgradeability',
    description: 'Universal Upgradeable Proxy Standard. Logic contract contains the upgrade function, reducing proxy contract size and gas cost.',
    implementation: 'import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol"; function _authorizeUpgrade(address) internal override onlyOwner {}',
    when: 'Contracts that need post-deployment bug fixes or feature additions',
  },
  {
    name: 'Pull over Push',
    category: 'Gas',
    description: 'Let users withdraw funds rather than pushing payments to them. Avoids DoS from failing external calls.',
    implementation: 'mapping(address => uint) pendingWithdrawals; function withdraw() external { uint amount = pendingWithdrawals[msg.sender]; pendingWithdrawals[msg.sender] = 0; payable(msg.sender).transfer(amount); }',
    when: 'Distributing ETH to multiple recipients (auctions, dividends)',
  },
  {
    name: 'Role-Based Access (AccessControl)',
    category: 'Access Control',
    description: 'Granular permission system with roles like MINTER_ROLE, ADMIN_ROLE instead of a single owner.',
    implementation: 'import "@openzeppelin/contracts/access/AccessControl.sol"; bytes32 MINTER_ROLE = keccak256("MINTER_ROLE"); function mint() onlyRole(MINTER_ROLE) { ... }',
    when: 'Multi-party systems with different permission levels',
  },
];

const AUDIT_CHECKLIST: AuditChecklist[] = [
  {
    category: 'Reentrancy',
    items: [
      { check: 'All external calls follow Checks-Effects-Interactions pattern', severity: 'Critical' },
      { check: 'ReentrancyGuard used on state-changing functions with external calls', severity: 'Critical' },
      { check: 'No callbacks to untrusted contracts before state updates', severity: 'Critical' },
    ],
  },
  {
    category: 'Access Control',
    items: [
      { check: 'Admin functions protected with onlyOwner or AccessControl', severity: 'Critical' },
      { check: 'Ownership transfer uses two-step pattern (Ownable2Step)', severity: 'High' },
      { check: 'No unprotected initializer functions on upgradeable contracts', severity: 'Critical' },
    ],
  },
  {
    category: 'Arithmetic',
    items: [
      { check: 'Solidity >=0.8.0 used (built-in overflow protection)', severity: 'High' },
      { check: 'Division before multiplication avoided to prevent precision loss', severity: 'Medium' },
      { check: 'Rounding direction considered in financial calculations', severity: 'Medium' },
    ],
  },
  {
    category: 'Token Integration',
    items: [
      { check: 'SafeERC20 used for all token transfers', severity: 'High' },
      { check: 'Return values from token transfers checked', severity: 'High' },
      { check: 'Fee-on-transfer and rebasing tokens handled correctly', severity: 'Medium' },
      { check: 'Token approval set to 0 before changing to new value', severity: 'Low' },
    ],
  },
  {
    category: 'Gas Optimization',
    items: [
      { check: 'Storage variables packed into 256-bit slots', severity: 'Low' },
      { check: 'Immutable/constant used for values set at construction', severity: 'Low' },
      { check: 'Events emitted for all state changes (cheaper than storage)', severity: 'Medium' },
    ],
  },
];

export function getDAppArchitecture(): DAppArchitecture[] {
  return DAPP_ARCHITECTURE;
}

export function getDeploymentPipeline(): DeploymentPipeline[] {
  return DEPLOYMENT_PIPELINE;
}

export function getSmartContractPatterns(): SmartContractPattern[] {
  return SMART_CONTRACT_PATTERNS;
}

export function getPatternsByCategory(category: string): SmartContractPattern[] {
  return SMART_CONTRACT_PATTERNS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAuditChecklist(): AuditChecklist[] {
  return AUDIT_CHECKLIST;
}
