<script setup lang="ts">
import { RouterLink } from 'vue-router';

const sections = [
  {
    title: 'Cryptography',
    description: 'Hash functions, public-key cryptography, and digital signatures — the foundation of blockchain security.',
    route: '/cryptography',
    icon: '🔐',
    badges: ['SHA-256', 'ECC', 'ECDSA'],
  },
  {
    title: 'Token Standards',
    description: 'ERC-20, ERC-721, and ERC-1155 — the rules governing fungible, non-fungible, and multi-token digital assets.',
    route: '/tokens',
    icon: '🪙',
    badges: ['ERC-20', 'ERC-721', 'ERC-1155'],
  },
  {
    title: 'Wallet Integration',
    description: 'MetaMask and WalletConnect — connecting users to Web3 securely with best practices.',
    route: '/wallets',
    icon: '👛',
    badges: ['MetaMask', 'WalletConnect', 'EIP-712'],
  },
  {
    title: 'DeFi Platforms',
    description: 'Decentralized exchanges, lending protocols, and yield farming — building the financial layer of Web3.',
    route: '/defi',
    icon: '🏦',
    badges: ['AMM', 'Lending', 'Yield Farming'],
  },
  {
    title: 'NFT Development',
    description: 'Generative art, gaming assets, and soulbound tokens — creating, minting, and managing non-fungible tokens.',
    route: '/nft',
    icon: '🎨',
    badges: ['Minting', 'Metadata', 'IPFS'],
  },
  {
    title: 'dApp Architecture',
    description: 'Smart contract patterns, deployment pipelines, and security audits — production-grade decentralized applications.',
    route: '/dapp',
    icon: '🏗️',
    badges: ['UUPS Proxy', 'CI/CD', 'Audit'],
  },
];
</script>

<template>
  <div class="container home">
    <section class="hero">
      <h1 class="hero-title">
        Blockchain <span class="highlight">Fundamentals</span>
      </h1>
      <p class="hero-subtitle">
        An interactive exploration of cryptography, token standards, wallet integration, DeFi protocols, NFTs, and dApp architecture for Web3 development.
      </p>
    </section>

    <section class="grid-3">
      <RouterLink
        v-for="section in sections"
        :key="section.title"
        :to="section.route"
        class="card section-card"
      >
        <span class="section-icon">{{ section.icon }}</span>
        <h2 class="section-card-title">{{ section.title }}</h2>
        <p class="section-card-desc">{{ section.description }}</p>
        <div class="section-badges">
          <span v-for="badge in section.badges" :key="badge" class="badge badge-primary">
            {{ badge }}
          </span>
        </div>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 2rem;
}

.hero {
  text-align: center;
  padding: 3rem 0 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.highlight {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  color: var(--color-text-muted);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.section-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
}

.section-icon {
  font-size: 2rem;
}

.section-card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.section-card-desc {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  flex: 1;
}

.section-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
</style>
