<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';
import type { ApiResponse, WalletMethod, SecurityPractice } from '@/types';

const walletMethods = ref<WalletMethod[]>([]);
const securityPractices = ref<SecurityPractice[]>([]);

onMounted(async () => {
  const [methodsRes, securityRes] = await Promise.all([
    api.get<ApiResponse<WalletMethod[]>>('/wallets/methods'),
    api.get<ApiResponse<SecurityPractice[]>>('/wallets/security'),
  ]);
  if (methodsRes.data.success) walletMethods.value = methodsRes.data.data!;
  if (securityRes.data.success) securityPractices.value = securityRes.data.data!;
});
</script>

<template>
  <div class="container">
    <h1 class="section-title">Wallet Integration</h1>
    <p class="section-subtitle">MetaMask and WalletConnect — connecting users to Web3 securely.</p>

    <!-- Wallet Methods -->
    <div class="grid-2 mb">
      <div v-for="method in walletMethods" :key="method.type" class="card wallet-card">
        <div class="wallet-header">
          <h2 class="card-title">{{ method.name }}</h2>
          <span class="badge" :class="method.type === 'MetaMask' ? 'badge-primary' : 'badge-accent'">
            {{ method.type }}
          </span>
        </div>
        <p class="card-desc">{{ method.description }}</p>

        <h3 class="sub-heading">Connection Flow</h3>
        <ol class="flow-list">
          <li v-for="(step, i) in method.connectionFlow" :key="i">{{ step }}</li>
        </ol>

        <h3 class="sub-heading mt">Security Features</h3>
        <ul class="check-list">
          <li v-for="feature in method.securityFeatures" :key="feature">
            <span class="check">✓</span> {{ feature }}
          </li>
        </ul>

        <div class="pros-cons mt">
          <div>
            <h4 class="pc-label pros-label">Pros</h4>
            <ul class="pc-list">
              <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
            </ul>
          </div>
          <div>
            <h4 class="pc-label cons-label">Cons</h4>
            <ul class="pc-list">
              <li v-for="con in method.cons" :key="con">{{ con }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Best Practices -->
    <div class="card">
      <h2 class="card-title">🛡️ Security Best Practices</h2>
      <div class="practices-grid">
        <div v-for="practice in securityPractices" :key="practice.title" class="practice-card">
          <h3 class="practice-title">{{ practice.title }}</h3>
          <p class="practice-desc">{{ practice.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb { margin-bottom: 1.5rem; }
.mt { margin-top: 1.25rem; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-desc { color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1.25rem; }
.sub-heading { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--color-accent); }
.wallet-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }

.flow-list {
  padding-left: 1.25rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
.flow-list li {
  margin-bottom: 0.375rem;
  padding-left: 0.25rem;
}

.check-list {
  list-style: none;
  font-size: 0.8125rem;
}
.check-list li {
  margin-bottom: 0.25rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.check {
  color: var(--color-success);
  font-weight: 700;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.pc-label {
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
}
.pros-label { color: var(--color-success); }
.cons-label { color: var(--color-danger); }
.pc-list {
  padding-left: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
.pc-list li { margin-bottom: 0.25rem; }

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.practice-card {
  background: var(--color-bg);
  padding: 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}
.practice-title {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
}
.practice-desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
</style>
