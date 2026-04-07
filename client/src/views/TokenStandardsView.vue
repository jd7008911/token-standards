<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';
import type { ApiResponse, TokenStandard } from '@/types';

const standards = ref<TokenStandard[]>([]);
const activeTab = ref<string>('ERC-20');
const comparison = ref<Record<string, Record<string, string>> | null>(null);

onMounted(async () => {
  const [stdRes, cmpRes] = await Promise.all([
    api.get<ApiResponse<TokenStandard[]>>('/tokens/standards'),
    api.get<ApiResponse<Record<string, Record<string, string>>>>('/tokens/compare'),
  ]);
  if (stdRes.data.success) standards.value = stdRes.data.data!;
  if (cmpRes.data.success) comparison.value = cmpRes.data.data!;
});

const activeStandard = () => standards.value.find(s => s.type === activeTab.value);

const featureLabels: Record<string, string> = {
  tokenType: 'Token Type',
  uniqueness: 'Uniqueness',
  divisibility: 'Divisibility',
  metadata: 'Metadata',
  batchOperations: 'Batch Operations',
  gasEfficiency: 'Gas Efficiency',
};
</script>

<template>
  <div class="container">
    <h1 class="section-title">Token Standards</h1>
    <p class="section-subtitle">ERC-20, ERC-721, and ERC-1155 — the technical specifications that define how digital assets behave on EVM blockchains.</p>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="std in standards"
        :key="std.type"
        class="tab"
        :class="{ active: activeTab === std.type }"
        @click="activeTab = std.type"
      >
        {{ std.name }}
      </button>
    </div>

    <!-- Active Standard Detail -->
    <div v-if="activeStandard()" class="card mb">
      <div class="standard-header">
        <h2 class="card-title">{{ activeStandard()!.name }}</h2>
        <span class="badge badge-primary">{{ activeStandard()!.features.tokenType }}</span>
      </div>
      <p class="card-desc">{{ activeStandard()!.description }}</p>

      <div class="grid-2">
        <div>
          <h3 class="sub-heading">Key Functions</h3>
          <ul class="fn-list">
            <li v-for="fn in activeStandard()!.keyFunctions" :key="fn" class="fn-item">
              <code>{{ fn }}</code>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="sub-heading">Use Cases</h3>
          <ul class="use-list">
            <li v-for="uc in activeStandard()!.useCases" :key="uc">{{ uc }}</li>
          </ul>
          <h3 class="sub-heading mt">Features</h3>
          <div class="feature-grid">
            <div v-for="(val, key) in activeStandard()!.features" :key="key" class="feature-row">
              <span class="feature-label">{{ featureLabels[key] || key }}</span>
              <span class="feature-value">{{ val }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <div v-if="comparison" class="card">
      <h2 class="card-title">📊 Comparison Table</h2>
      <div class="table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>ERC-20</th>
              <th>ERC-721</th>
              <th>ERC-1155</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(values, feature) in comparison" :key="feature">
              <td class="feature-name">{{ featureLabels[feature] || feature }}</td>
              <td>{{ values['ERC-20'] }}</td>
              <td>{{ values['ERC-721'] }}</td>
              <td>{{ values['ERC-1155'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb { margin-bottom: 1.5rem; }
.mt { margin-top: 1.25rem; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-desc { color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1.25rem; }
.standard-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.sub-heading { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.625rem; color: var(--color-accent); }

.tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0;
}

.tab {
  padding: 0.625rem 1.25rem;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab:hover { color: var(--color-text); }
.tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }

.fn-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.fn-item code {
  background: var(--color-bg);
  padding: 0.375rem 0.625rem;
  border-radius: var(--radius);
  font-size: 0.8125rem;
  border: 1px solid var(--color-border);
  display: inline-block;
}

.use-list {
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.use-list li { margin-bottom: 0.25rem; }

.feature-grid { display: flex; flex-direction: column; gap: 0.375rem; }
.feature-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8125rem;
  padding: 0.375rem 0;
  border-bottom: 1px solid var(--color-border);
}
.feature-label { color: var(--color-text-muted); }
.feature-value { font-weight: 500; text-align: right; max-width: 60%; }

.table-wrap { overflow-x: auto; }
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}
.compare-table th,
.compare-table td {
  padding: 0.625rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}
.compare-table th {
  color: var(--color-primary);
  font-weight: 600;
}
.feature-name {
  color: var(--color-text-muted);
  font-weight: 500;
}
</style>
