# Token Standards

An interactive full-stack application exploring **Cryptography Principles**, **Token Standards (ERC-20 / ERC-721 / ERC-1155)**, **Wallet Integration (MetaMask / WalletConnect)**, **DeFi Platforms (DEX / Lending / Yield)**, **NFT Development (Minting / Metadata / Storage)**, and **dApp Architecture (Patterns / Deployment / Audits)**.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vue 3, Vite, TypeScript, Pinia, Vue Router |
| **Backend** | Node.js, Express, TypeScript, ethers.js |
| **Testing** | Vitest, Supertest, Vue Test Utils |

## Project Structure

```
token-standards/
├── server/                              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── app.ts                       # Express app (middleware, routes)
│   │   ├── index.ts                     # Server entry point
│   │   ├── types/index.ts               # Shared TS interfaces
│   │   ├── routes/
│   │   │   ├── crypto.routes.ts         # /api/crypto/*
│   │   │   ├── token.routes.ts          # /api/tokens/*
│   │   │   ├── wallet.routes.ts         # /api/wallets/*
│   │   │   ├── defi.routes.ts           # /api/defi/*
│   │   │   ├── nft.routes.ts            # /api/nft/*
│   │   │   └── dapp.routes.ts           # /api/dapp/*
│   │   └── services/
│   │       ├── cryptography.service.ts  # Hash, ECC, ECDSA sign/verify
│   │       ├── token.service.ts         # ERC-20, ERC-721, ERC-1155 data
│   │       ├── wallet.service.ts        # MetaMask, WalletConnect, security
│   │       ├── defi.service.ts          # DEX, Lending, Yield protocols
│   │       ├── nft.service.ts           # Minting, metadata, storage
│   │       └── dapp.service.ts          # Architecture, deployment, audits
│   └── tests/
│       ├── cryptography.test.ts         # 13 tests
│       ├── token-standards.test.ts      # 18 tests
│       ├── wallet-integration.test.ts   # 15 tests
│       ├── defi.test.ts                 # 12 tests
│       ├── nft.test.ts                  # 16 tests
│       ├── dapp.test.ts                 # 14 tests
│       └── api.test.ts                  # 32 tests (Supertest)
├── client/                              # Vue 3 + Vite + TypeScript
│   ├── src/
│   │   ├── main.ts                      # App bootstrap (Pinia + Router)
│   │   ├── App.vue                      # Layout with navigation
│   │   ├── api/index.ts                 # Axios HTTP client
│   │   ├── router/index.ts              # 7 routes
│   │   ├── types/index.ts               # Frontend TS interfaces
│   │   ├── stores/token.store.ts        # Pinia store
│   │   ├── composables/useLoading.ts    # Loading state composable
│   │   ├── views/
│   │   │   ├── HomeView.vue             # Landing page (6 section cards)
│   │   │   ├── CryptographyView.vue     # Hash, keys, sign/verify demos
│   │   │   ├── TokenStandardsView.vue   # Standards detail & comparison
│   │   │   ├── WalletIntegrationView.vue# Wallet methods & security
│   │   │   ├── DeFiView.vue             # Protocols, AMM, concepts
│   │   │   ├── NFTView.vue              # Projects, minting, metadata
│   │   │   └── DAppView.vue             # Architecture, deploy, audit
│   │   └── assets/main.css              # Global styles
│   └── tests/
│       ├── app.test.ts                  # 2 tests
│       ├── home.test.ts                 # 4 tests
│       ├── cryptography.test.ts         # 6 tests
│       └── store.test.ts               # 2 tests
├── Makefile                             # Dev, build, test commands
├── .env.example                         # Environment template
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Setup

```bash
# Install dependencies
make install

# Copy environment variables
cp .env.example .env
# Edit .env with your RPC_URL and WALLETCONNECT_PROJECT_ID

# Start dev servers (backend :3000, frontend :5173)
make dev
```

### Available Commands

```bash
make help           # Show all commands
make install        # Install server + client deps
make dev            # Run both servers concurrently
make dev-server     # Run backend only
make dev-client     # Run frontend only
make build          # Production build (client)
make build-server   # Compile server TypeScript
make test           # Run all tests (134 total)
make test-server    # Run server tests (120)
make test-client    # Run client tests (14)
make test-watch     # Watch mode
make typecheck      # Type-check both projects
make clean          # Remove node_modules & dist
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/crypto/hash` | Compute hash (keccak256, sha256) |
| `POST` | `/api/crypto/keypair` | Generate ECC key pair |
| `POST` | `/api/crypto/sign` | Sign message with ECDSA |
| `POST` | `/api/crypto/verify` | Verify signature |
| `POST` | `/api/crypto/avalanche` | Demonstrate avalanche effect |
| `GET` | `/api/tokens/standards` | All token standards |
| `GET` | `/api/tokens/standards/:type` | Single standard (ERC-20, ERC-721, ERC-1155) |
| `GET` | `/api/tokens/compare` | Feature comparison table |
| `GET` | `/api/wallets/methods` | All wallet methods |
| `GET` | `/api/wallets/methods/:type` | Single method (MetaMask, WalletConnect) |
| `GET` | `/api/wallets/security` | Security best practices |
| `GET` | `/api/defi/protocols` | All DeFi protocols |
| `GET` | `/api/defi/protocols/:category` | Single protocol (DEX, Lending, Yield) |
| `GET` | `/api/defi/concepts` | DeFi concepts (approvals, flash loans, etc.) |
| `GET` | `/api/defi/liquidity-pool` | AMM liquidity pool info |
| `GET` | `/api/nft/projects` | All NFT projects |
| `GET` | `/api/nft/projects/:category` | Single project (Art, Gaming, Identity) |
| `GET` | `/api/nft/metadata-example` | ERC-721 metadata example |
| `GET` | `/api/nft/minting-flow` | Step-by-step minting flow |
| `GET` | `/api/nft/storage` | Storage solutions (IPFS, Arweave, On-Chain) |
| `GET` | `/api/dapp/architecture` | 3-layer dApp architecture |
| `GET` | `/api/dapp/deployment` | CI/CD deployment pipeline |
| `GET` | `/api/dapp/patterns` | Smart contract patterns |
| `GET` | `/api/dapp/patterns/:category` | Patterns by category (Security, Upgradeability, etc.) |
| `GET` | `/api/dapp/audit` | Security audit checklist |

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3000) |
| `NODE_ENV` | Environment (development / production) |
| `RPC_URL` | Ethereum RPC endpoint (Infura / Alchemy) |
| `VITE_API_URL` | Backend API URL for frontend |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID |

---

## Reference

The content below is the source material this application is built from.

---

### 1. Cryptography Principles: The Foundation of Blockchain

Cryptography is the bedrock of blockchain technology, ensuring security, immutability, and trust in a decentralized environment. Its core principles can be broken down into three main areas:

**A. Hash Functions**
A cryptographic hash function is a mathematical algorithm that takes an input (or 'message') and returns a fixed-size string of bytes. The output, known as the hash or digest, is a unique fingerprint of the data . For blockchain, the most common hash function is SHA-256 (Secure Hash Algorithm 256-bit). Key properties include:
- **Deterministic:** The same input will always produce the same hash.
- **Fast Computation:** The hash can be calculated quickly for any given input.
- **Avalanche Effect:** A tiny change in the input (e.g., changing one character) produces a completely different, unrecognizable hash .
- **Collision Resistant:** It is computationally infeasible to find two different inputs that produce the same output hash .
- **One-Way Function:** It is practically impossible to reverse-engineer the original input from its hash output.

**B. Public-Key Cryptography (Asymmetric Encryption)**
Unlike symmetric encryption (which uses one shared secret key), public-key cryptography uses a mathematically linked pair of keys: a public key and a private key .
- **Public Key:** Can be shared openly with anyone. It acts like an address or an account number. Others use it to encrypt messages or verify a digital signature.
- **Private Key:** Must be kept absolutely secret. It acts like a master password or a signature stamp. It is used to decrypt messages and, most importantly for blockchain, to create digital signatures.
- **Elliptic Curve Cryptography (ECC):** Blockchain systems like Bitcoin and Ethereum do not use traditional RSA. Instead, they use ECC, which offers the same level of security as RSA but with much smaller, more efficient keys . The specific curve, `secp256k1`, is a common standard.

**C. Digital Signatures**
A digital signature is a cryptographic technique used to prove two things: **authenticity** (the message was created by the legitimate owner of the private key) and **integrity** (the message has not been altered after being signed) .
- **How it works:**
    1.  A sender takes a transaction (e.g., "Send 2 ETH to Bob") and hashes it.
    2.  The sender then encrypts this hash with their **private key**. This encrypted hash is the digital signature.
    3.  Anyone can then verify this signature by decrypting it with the sender's **public key** and comparing it to the hash of the original message. If they match, the signature is valid.
- **Algorithms:** The most common digital signature algorithms on blockchains are ECDSA (Elliptic Curve Digital Signature Algorithm) and EdDSA .

---

### 2. Token Standards: The Rules of Digital Assets

Token standards are technical specifications that define how a token behaves, how it is transferred, and how it can be interacted with on the blockchain. They ensure interoperability, meaning an ERC-20 token created by one developer will work seamlessly with a wallet, exchange, or dApp built by another .

Here is a comparison of the three most dominant standards on Ethereum and EVM-compatible chains (like Avalanche, Polygon, BNB Chain):

| Feature | ERC-20 (Fungible) | ERC-721 (Non-Fungible) | ERC-1155 (Multi-Token) |
| :--- | :--- | :--- | :--- |
| **Token Type** | Fungible (interchangeable) | Non-Fungible (unique) | Both Fungible & Non-Fungible  |
| **Uniqueness** | No, all units are identical | Yes, each token has a unique `tokenId` | Optional, defined per token ID |
| **Divisibility** | Yes (usually up to 18 decimals) | No (indivisible) | Configurable (e.g., 18 decimals for fungible, 0 for NFTs)  |
| **Metadata** | No built-in metadata | Yes (`tokenURI` pointing to a JSON file) | Yes (URI can be set per ID) |
| **Batch Operations** | No | No | **Yes** (transfer or mint many tokens at once)  |
| **Primary Use Cases** | Currencies (USDC, DAI), Governance tokens (UNI, AAVE), Utility tokens | Digital Art, Collectibles (CryptoKitties), Game Items, Identity, Tickets | Blockchain Games (weapons, armor, currencies in one contract), complex asset management |
| **Gas Efficiency** | Standard | Standard (can be expensive for multiple transfers) | **High** (significantly cheaper for batch transfers)  |

**Detailed Breakdown:**

- **ERC-20:** This is the standard for *fungible* tokens, where any single unit is exactly the same as another. Your $1 USDC is identical to anyone else's $1 USDC . Key functions include `transfer()`, `balanceOf()`, and `approve()` (which allows a smart contract to spend tokens on your behalf, crucial for DeFi) .
- **ERC-721:** This standard introduced the NFT boom. It allows for the creation of unique, indivisible tokens that represent ownership of a specific digital or physical asset. Each token has a distinct `tokenId` and a `tokenURI` that often points to an off-chain JSON file containing the asset's image and attributes .
- **ERC-1155:** A "smart" standard that combines the best of both worlds. A single smart contract can manage an entire game's inventory: a fungible token for in-game gold, a non-fungible token for a unique legendary sword, and a semi-fungible token for 100 health potions (all potions are identical but are limited in supply) . Its `safeBatchTransferFrom` function is a key feature, allowing a user to send 10 different types of game items in a single transaction, saving significant gas fees .

---

### 3. Wallet Integration: Connecting Users to Web3

A cryptocurrency wallet is a tool that manages your private keys and allows you to interact with the blockchain. Two dominant technologies enable this integration: MetaMask (a direct browser extension) and WalletConnect (a protocol for connecting mobile wallets).

**A. MetaMask**
MetaMask is a popular "injected" wallet, meaning it injects a JavaScript object (`window.ethereum`) into a web page. This allows the website (dApp) to directly request the wallet to perform actions.
- **How it works:** A user installs the MetaMask extension. When a dApp wants to connect, it calls `ethereum.request({ method: 'eth_requestAccounts' })`. MetaMask pops up, asking the user for permission to share their wallet address with the site. Once approved, the dApp can see the public address and request signatures or transaction approvals .
- **Integration:** Developers often use libraries like `web3-react` to simplify this process. They can instantiate an `InjectedConnector`, which automatically detects MetaMask .

**B. WalletConnect**
WalletConnect is an open-source protocol that creates a secure, encrypted link between a dApp (on a desktop browser) and a mobile wallet (e.g., Trust Wallet, Rainbow) . It uses a relay server to pass messages, not the user's funds.
- **How it works (Standard Flow):**
    1.  On the desktop dApp, the user clicks "Connect Wallet" and selects "WalletConnect."
    2.  A QR code is displayed on the screen .
    3.  The user opens their mobile wallet app and scans the QR code. This action establishes a secure peer-to-peer connection via a relay server .
    4.  The mobile wallet then shows the connection request. Once approved, the wallet is connected. All future transaction requests from the dApp are sent to the mobile wallet for the user to confirm .

**Why WalletConnect is More Secure for Mobile:** The user's private keys never leave the mobile wallet. Unlike MetaMask on a desktop (which is a "hot wallet" in the browser), the signing happens in a separate, more controlled environment on the mobile device. The dApp only sees the user's public address and sends requests for signatures .

**C. Key Security Practices for Integration**
Regardless of the method, security is paramount.
- **Revoke Approvals:** Many attacks happen due to malicious `approve()` functions. Users should regularly use tools like `Revoke.cash` to review and cancel token allowances granted to dApps .
- **Verify Transactions:** A good wallet will use standards like **EIP-712** to display transaction details in a human-readable format, helping users avoid signing malicious payloads .
- **Hardware Wallets:** For high-value assets, MetaMask and WalletConnect can both be used with hardware wallets (e.g., Ledger, Trezor), where the private key is stored on an offline device, providing the highest level of security .