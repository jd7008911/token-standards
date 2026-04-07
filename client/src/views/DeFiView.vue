<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';

interface DeFiProtocol {
  name: string;
  category: string;
  description: string;
  keyMechanisms: string[];
  smartContracts: string[];
  risks: string[];
  tokenStandard: string;
}

interface DeFiConcept {
  title: string;
  description: string;
  examples: string[];
  relatedFunctions: string[];
}

interface LiquidityPool {
  name: string;
  description: string;
  formula: string;
  mechanism: string[];
  impermanentLossExplained: string;
}

const protocols = ref<DeFiProtocol[]>([]);
const concepts = ref<DeFiConcept[]>([]);
const pool = ref<LiquidityPool | null>(null);
const activeProtocol = ref(0);

onMounted(async () => {
  const [pRes, cRes, lRes] = await Promise.all([
    api.get('/defi/protocols'),
    api.get('/defi/concepts'),
    api.get('/defi/liquidity-pool'),
  ]);
  if (pRes.data.success) protocols.value = pRes.data.data;
  if (cRes.data.success) concepts.value = cRes.data.data;
  if (lRes.data.success) pool.value = lRes.data.data;
});
</script>

<template>
  <div class="container">
    <h1 class="section-title">DeFi Platforms</h1>
    <p class="section-subtitle">Decentralized Finance — DEXes, lending protocols, yield aggregators, and the core mechanisms powering them.</p>

    <!-- Protocols -->
    <div class="tabs">
      <button
        v-for="(p, i) in protocols"
        :key="p.name"
        class="tab"
        :class="{ active: activeProtocol === i }"
        @click="activeProtocol = i"
      >
        {{ p.category }}
      </button>
    </div>

    <div v-if="protocols[activeProtocol]" class="card mb">
      <div class="proto-header">
        <h2 class="card-title">{{ protocols[activeProtocol].name }}</h2>
        <span class="badge badge-primary">{{ protocols[activeProtocol].tokenStandard }}</span>
      </div>
      <p class="card-desc">{{ protocols[activeProtocol].description }}</p>

      <div class="grid-2">
        <div>
          <h3 class="sub-heading">Key Mechanisms</h3>
          <ul class="detail-list">
            <li v-for="m in protocols[activeProtocol].keyMechanisms" :key="m">{{ m }}</li>
          </ul>

          <h3 class="sub-heading mt">Smart Contracts</h3>
          <ul class="detail-list">
            <li v-for="c in protocols[activeProtocol].smartContracts" :key="c">
              <code>{{ c }}</code>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="sub-heading">Risks</h3>
          <ul class="risk-list">
            <li v-for="r in protocols[activeProtocol].risks" :key="r">
              <span class="risk-icon">⚠</span> {{ r }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- AMM / Liquidity Pool -->
    <div v-if="pool" class="card mb">
      <h2 class="card-title">📐 {{ pool.name }}</h2>
      <p class="card-desc">{{ pool.description }}</p>
      <div class="formula-box">{{ pool.formula }}</div>
      <ol class="flow-list">
        <li v-for="step in pool.mechanism" :key="step">{{ step }}</li>
      </ol>
      <div class="il-box mt">
        <h3 class="sub-heading">Impermanent Loss</h3>
        <p class="card-desc">{{ pool.impermanentLossExplained }}</p>
      </div>
    </div>

    <!-- Concepts -->
    <h2 class="section-title sm">Core DeFi Concepts</h2>
    <div class="grid-2">
      <div v-for="concept in concepts" :key="concept.title" class="card">
        <h3 class="card-title">{{ concept.title }}</h3>
        <p class="card-desc">{{ concept.description }}</p>

        <h4 class="mini-heading">Examples</h4>
        <ul class="detail-list">
          <li v-for="ex in concept.examples" :key="ex">{{ ex }}</li>
        </ul>

        <h4 class="mini-heading mt">Related Functions</h4>
        <div class="fn-tags">
          <code v-for="fn in concept.relatedFunctions" :key="fn" class="fn-tag">{{ fn }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb { margin-bottom: 1.5rem; }
.mt { margin-top: 1.25rem; }
.sm { font-size: 1.375rem; margin-bottom: 1rem; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-desc { color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
.sub-heading { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--color-accent); }
.mini-heading { font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.375rem; color: var(--color-text-muted); }
.proto-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }

.tabs { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); }
.tab { padding: 0.625rem 1.25rem; border: none; background: none; color: var(--color-text-muted); font-size: 0.9375rem; font-weight: 500; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
.tab:hover { color: var(--color-text); }
.tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }

.detail-list { padding-left: 1.25rem; font-size: 0.8125rem; color: var(--color-text-muted); }
.detail-list li { margin-bottom: 0.375rem; }
.detail-list code { background: var(--color-bg); padding: 0.25rem 0.5rem; border-radius: var(--radius); border: 1px solid var(--color-border); font-size: 0.75rem; }

.risk-list { list-style: none; font-size: 0.8125rem; }
.risk-list li { margin-bottom: 0.5rem; display: flex; align-items: baseline; gap: 0.5rem; }
.risk-icon { color: var(--color-warning); }

.formula-box { background: var(--color-bg); border: 1px solid var(--color-primary); border-radius: var(--radius); padding: 1rem; font-family: var(--font-mono); font-size: 1.125rem; text-align: center; color: var(--color-primary); margin-bottom: 1rem; }

.flow-list { padding-left: 1.25rem; font-size: 0.8125rem; color: var(--color-text-muted); }
.flow-list li { margin-bottom: 0.375rem; }

.il-box { background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: var(--radius); padding: 1rem; }

.fn-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; }
.fn-tag { background: var(--color-bg); padding: 0.25rem 0.5rem; border-radius: var(--radius); border: 1px solid var(--color-border); font-size: 0.6875rem; }
</style>
