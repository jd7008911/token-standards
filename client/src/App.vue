<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="container header-content">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">◆</span>
          <span class="logo-text">TokenStandards</span>
        </RouterLink>
        <nav class="nav">
          <RouterLink to="/cryptography" class="nav-link">Cryptography</RouterLink>
          <RouterLink to="/tokens" class="nav-link">Token Standards</RouterLink>
          <RouterLink to="/wallets" class="nav-link">Wallet Integration</RouterLink>
          <RouterLink to="/defi" class="nav-link">DeFi</RouterLink>
          <RouterLink to="/nft" class="nav-link">NFTs</RouterLink>
          <RouterLink to="/dapp" class="nav-link">dApps</RouterLink>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="app-footer">
      <div class="container footer-content">
        <p>Cryptography · Token Standards · Wallet Integration · DeFi · NFTs · dApps</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-text);
}

.logo-icon {
  color: var(--color-primary);
  font-size: 1.25rem;
}

.nav {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-surface);
}

.nav-link.router-link-active {
  color: var(--color-primary);
  background: rgba(99, 102, 241, 0.1);
}

.app-main {
  flex: 1;
  padding: 2rem 0;
}

.app-footer {
  border-top: 1px solid var(--color-border);
  padding: 1.5rem 0;
}

.footer-content {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
}
</style>
