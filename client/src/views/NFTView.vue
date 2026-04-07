<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';

interface NFTProject { name: string; category: string; standard: string; description: string; technicalDetails: string[]; deploymentSteps: string[]; }
interface NFTMetadata { name: string; description: string; image: string; attributes: { trait_type: string; value: string | number }[]; external_url?: string; }
interface NFTMintingFlow { step: number; title: string; description: string; code: string; }
interface NFTStorageSolution { name: string; type: string; description: string; pros: string[]; cons: string[]; }

const projects = ref<NFTProject[]>([]);
const metadata = ref<NFTMetadata | null>(null);
const mintingFlow = ref<NFTMintingFlow[]>([]);
const storage = ref<NFTStorageSolution[]>([]);
const activeProject = ref(0);

onMounted(async () => {
  const [pRes, mRes, fRes, sRes] = await Promise.all([
    api.get('/nft/projects'),
    api.get('/nft/metadata-example'),
    api.get('/nft/minting-flow'),
    api.get('/nft/storage'),
  ]);
  if (pRes.data.success) projects.value = pRes.data.data;
  if (mRes.data.success) metadata.value = mRes.data.data;
  if (fRes.data.success) mintingFlow.value = fRes.data.data;
  if (sRes.data.success) storage.value = sRes.data.data;
});
</script>

<template>
  <div class="container">
    <h1 class="section-title">NFT Development</h1>
    <p class="section-subtitle">Generative art, gaming assets, and soulbound tokens — end-to-end NFT project architecture.</p>

    <!-- Project Types -->
    <div class="tabs">
      <button
        v-for="(p, i) in projects"
        :key="p.name"
        class="tab"
        :class="{ active: activeProject === i }"
        @click="activeProject = i"
      >
        {{ p.category }}
      </button>
    </div>

    <div v-if="projects[activeProject]" class="card mb">
      <div class="proj-header">
        <h2 class="card-title">{{ projects[activeProject].name }}</h2>
        <span class="badge badge-accent">{{ projects[activeProject].standard }}</span>
      </div>
      <p class="card-desc">{{ projects[activeProject].description }}</p>

      <div class="grid-2">
        <div>
          <h3 class="sub-heading">Technical Details</h3>
          <ul class="detail-list">
            <li v-for="d in projects[activeProject].technicalDetails" :key="d">{{ d }}</li>
          </ul>
        </div>
        <div>
          <h3 class="sub-heading">Deployment Steps</h3>
          <ol class="step-list">
            <li v-for="s in projects[activeProject].deploymentSteps" :key="s">{{ s }}</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Minting Flow -->
    <h2 class="section-title sm">Minting Flow</h2>
    <div class="flow-timeline mb">
      <div v-for="step in mintingFlow" :key="step.step" class="flow-card card">
        <div class="step-number">{{ step.step }}</div>
        <h3 class="card-title">{{ step.title }}</h3>
        <p class="card-desc">{{ step.description }}</p>
        <div class="mono">{{ step.code }}</div>
      </div>
    </div>

    <!-- Metadata Example -->
    <div v-if="metadata" class="card mb">
      <h2 class="card-title">📋 ERC-721 Metadata Standard</h2>
      <p class="card-desc">The JSON structure returned by tokenURI() — follows OpenSea metadata standards.</p>
      <pre class="metadata-json">{{ JSON.stringify(metadata, null, 2) }}</pre>
    </div>

    <!-- Storage Solutions -->
    <h2 class="section-title sm">Storage Solutions</h2>
    <div class="grid-3">
      <div v-for="sol in storage" :key="sol.name" class="card">
        <div class="sol-header">
          <h3 class="card-title">{{ sol.name }}</h3>
          <span class="badge" :class="sol.type === 'Decentralized' ? 'badge-success' : sol.type === 'On-Chain' ? 'badge-primary' : 'badge-accent'">
            {{ sol.type }}
          </span>
        </div>
        <p class="card-desc">{{ sol.description }}</p>
        <div class="pros-cons">
          <div>
            <h4 class="pc-label pros-label">Pros</h4>
            <ul class="pc-list"><li v-for="p in sol.pros" :key="p">{{ p }}</li></ul>
          </div>
          <div>
            <h4 class="pc-label cons-label">Cons</h4>
            <ul class="pc-list"><li v-for="c in sol.cons" :key="c">{{ c }}</li></ul>
          </div>
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
.proj-header, .sol-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }

.tabs { display: flex; gap: 0.25rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); }
.tab { padding: 0.625rem 1.25rem; border: none; background: none; color: var(--color-text-muted); font-size: 0.9375rem; font-weight: 500; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
.tab:hover { color: var(--color-text); }
.tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }

.detail-list, .step-list { padding-left: 1.25rem; font-size: 0.8125rem; color: var(--color-text-muted); }
.detail-list li, .step-list li { margin-bottom: 0.375rem; }

.flow-timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
.flow-card { position: relative; padding-top: 2.5rem; }
.step-number { position: absolute; top: 1rem; right: 1rem; width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }

.metadata-json { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 1rem; font-family: var(--font-mono); font-size: 0.75rem; overflow-x: auto; color: var(--color-accent); white-space: pre; }

.pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.pc-label { font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.375rem; }
.pros-label { color: var(--color-success); }
.cons-label { color: var(--color-danger); }
.pc-list { padding-left: 1rem; font-size: 0.75rem; color: var(--color-text-muted); }
.pc-list li { margin-bottom: 0.25rem; }
</style>
