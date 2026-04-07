export interface DeFiProtocol {
  name: string;
  category: 'DEX' | 'Lending' | 'Yield' | 'Stablecoin' | 'Derivatives';
  description: string;
  keyMechanisms: string[];
  smartContracts: string[];
  risks: string[];
  tokenStandard: string;
}

export interface LiquidityPool {
  name: string;
  description: string;
  formula: string;
  mechanism: string[];
  impermanentLossExplained: string;
}

export interface DeFiConcept {
  title: string;
  description: string;
  examples: string[];
  relatedFunctions: string[];
}

const DEFI_PROTOCOLS: DeFiProtocol[] = [
  {
    name: 'Uniswap (DEX)',
    category: 'DEX',
    description:
      'A decentralized exchange using an Automated Market Maker (AMM) model. Users trade ERC-20 tokens directly from liquidity pools instead of an order book.',
    keyMechanisms: [
      'Constant product formula: x * y = k',
      'Liquidity providers deposit token pairs into pools',
      'Swap fees (0.3%) distributed to LPs proportionally',
      'Anyone can create a new trading pair by creating a pool',
    ],
    smartContracts: [
      'Factory — deploys new pair contracts',
      'Pair — holds reserves and executes swaps',
      'Router — routes trades across multiple pairs',
    ],
    risks: [
      'Impermanent loss for liquidity providers',
      'Smart contract vulnerability',
      'Front-running / MEV attacks',
    ],
    tokenStandard: 'ERC-20',
  },
  {
    name: 'Aave (Lending)',
    category: 'Lending',
    description:
      'A decentralized lending protocol where users deposit assets to earn interest and borrow against their collateral. Introduced flash loans — uncollateralized loans repaid within a single transaction.',
    keyMechanisms: [
      'Deposit collateral → receive aTokens (interest-bearing)',
      'Borrow up to the collateral factor (e.g., 75% LTV)',
      'Variable and stable interest rate models',
      'Flash Loans — borrow and repay in one atomic transaction',
      'Liquidation when health factor drops below 1.0',
    ],
    smartContracts: [
      'LendingPool — core deposit/borrow/repay/liquidate logic',
      'aToken — ERC-20 token representing deposits + accrued interest',
      'DebtToken — tracks variable/stable borrow positions',
      'PriceOracle — Chainlink price feeds for collateral valuation',
    ],
    risks: [
      'Liquidation risk if collateral value drops',
      'Oracle manipulation attacks',
      'Smart contract risk',
      'Interest rate volatility',
    ],
    tokenStandard: 'ERC-20',
  },
  {
    name: 'Yearn Finance (Yield)',
    category: 'Yield',
    description:
      'A yield aggregator that automatically moves user funds between DeFi protocols to maximize returns. Vaults execute complex strategies without manual management.',
    keyMechanisms: [
      'Deposit assets into Vaults',
      'Strategies auto-compound across protocols (Aave, Compound, Curve)',
      'Vault shares (yTokens) represent proportional ownership',
      'Harvest function compounds earned yield back into vault',
    ],
    smartContracts: [
      'Vault — holds deposited assets, issues yTokens',
      'Strategy — encodes the yield farming logic',
      'Controller — manages vault-to-strategy mapping',
    ],
    risks: [
      'Strategy risk (complex multi-protocol dependencies)',
      'Smart contract composability risk',
      'Withdrawal may be delayed during high utilization',
    ],
    tokenStandard: 'ERC-20',
  },
];

const DEFI_CONCEPTS: DeFiConcept[] = [
  {
    title: 'Token Approvals & Allowances',
    description:
      'Before a DeFi protocol can move your tokens, you must call approve() to grant an allowance. This is a security-critical step — unlimited approvals are convenient but dangerous if the contract is compromised.',
    examples: [
      'token.approve(spender, amount) — grant allowance',
      'token.allowance(owner, spender) — check current allowance',
      'Revoke.cash — tool to review and revoke approvals',
    ],
    relatedFunctions: [
      'approve(address spender, uint256 amount)',
      'allowance(address owner, address spender)',
      'transferFrom(address from, address to, uint256 amount)',
      'increaseAllowance(address spender, uint256 addedValue)',
    ],
  },
  {
    title: 'Flash Loans',
    description:
      'Borrow any amount of assets without collateral, as long as the borrowed amount plus fee is returned within the same transaction. If not repaid, the entire transaction reverts.',
    examples: [
      'Arbitrage between DEXes within one tx',
      'Self-liquidation to avoid penalties',
      'Collateral swaps without closing positions',
    ],
    relatedFunctions: [
      'flashLoan(receiver, assets[], amounts[], modes[], params)',
      'executeOperation() — callback where you use the funds',
    ],
  },
  {
    title: 'Liquidity Mining / Yield Farming',
    description:
      'Providing liquidity to protocols in exchange for reward tokens. LP tokens represent your share of the pool and can be staked in farm contracts for additional rewards.',
    examples: [
      'Add ETH + USDC to Uniswap → receive LP tokens',
      'Stake LP tokens in a farm → earn reward tokens',
      'Compound rewards by re-investing',
    ],
    relatedFunctions: [
      'addLiquidity(tokenA, tokenB, amountA, amountB)',
      'removeLiquidity(tokenA, tokenB, liquidity)',
      'stake(uint256 amount)',
      'getReward()',
    ],
  },
  {
    title: 'Price Oracles',
    description:
      'External data feeds that bring real-world prices on-chain. DeFi protocols rely on oracles for collateral valuation, liquidation triggers, and fair pricing.',
    examples: [
      'Chainlink — decentralized oracle network',
      'Uniswap TWAP — time-weighted average price from on-chain pools',
      'Band Protocol — cross-chain oracle',
    ],
    relatedFunctions: [
      'latestRoundData() — Chainlink aggregator',
      'consult(token, amountIn) — Uniswap oracle',
    ],
  },
];

const LIQUIDITY_POOL: LiquidityPool = {
  name: 'Constant Product AMM',
  description:
    'The core mechanism behind Uniswap-style DEXes. Two token reserves maintain the invariant x * y = k, where x and y are reserve amounts.',
  formula: 'x × y = k (constant product)',
  mechanism: [
    'Pool starts with x₀ tokens of A and y₀ tokens of B',
    'Trader sends Δx of token A to buy token B',
    'New reserves: (x₀ + Δx) × (y₀ - Δy) = k',
    'Trader receives Δy = y₀ - k / (x₀ + Δx)',
    'Larger trades relative to pool size cause more slippage',
    'Fee (e.g., 0.3%) is added to reserves, growing k over time',
  ],
  impermanentLossExplained:
    'When the price ratio of pooled tokens changes from when you deposited, your LP position is worth less than if you had simply held the tokens. The loss is "impermanent" because it disappears if prices return to the original ratio.',
};

export function getAllDeFiProtocols(): DeFiProtocol[] {
  return DEFI_PROTOCOLS;
}

export function getDeFiProtocol(category: string): DeFiProtocol | undefined {
  return DEFI_PROTOCOLS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllDeFiConcepts(): DeFiConcept[] {
  return DEFI_CONCEPTS;
}

export function getLiquidityPoolInfo(): LiquidityPool {
  return LIQUIDITY_POOL;
}
