<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api';

interface ArchComponent { name: string; description: string; technologies: string[]; }
interface DAppArchitecture { layer: string; components: ArchComponent[]; }
interface DeploymentPipeline { stage: string; description: string; tools: string[]; bestPractices: string[]; }
interface SmartContractPattern { name: string; category: string; description: string; implementation: string; when: string; }
interface AuditItem { check: string; severity: string; }
interface AuditChecklist { category: string; items: AuditItem[]; }

const architecture = ref<DAppArchitecture[]>([]);
const pipeline = ref<DeploymentPipeline[]>([]);
const patterns = ref<SmartContractPattern[]>([]);
const audit = ref<AuditChecklist[]>([]);

onMounted(async () => {
  const [aRes, dRes, pRes, auRes] = await Promise.all([
    api.get('/dapp/architecture'),
    api.get('/dapp/deployment'),
    api.get('/dapp/patterns'),
    api.get('/dapp/audit'),
  ]);
  if (aRes.data.success) architecture.value = aRes.data.data;
  if (dRes.data.success) pipeline.value = dRes.data.data;
  if (pRes.data.success) patterns.value = pRes.data.data;
  if (auRes.data.success) audit.value = auRes.data.data;
});

const severityColor = (s: string) => {
  switch (s) {
    case 'Critical': return 'badge-danger';
    case 'High': return 'badge-warning';
    case 'Medium': return 'badge-accent';
    default: return 'badge-primary';
  }
};
</script>

<template>
  <div class="container">
    <h1 class="section-title">dApp Development & Deployment</h1>
    <p class="section-subtitle">Full-stack dApp architecture, smart contract patterns, deployment pipeline, and security audit checklist.</p>

    <!-- Architecture -->
    <h2 class="section-title sm">Architecture Layers</h2>
    <div class="arch-layers mb">
      <div v-for="layer in architecture" :key="layer.layer" class="card">
        <h3 class="card-title layer-title">{{ layer.layer }}</h3>
        <div class="components">
          <div v-for="comp in layer.components" :key="comp.name" class="component">
            <h4 class="comp-name">{{ comp.name }}</h4>
            <p class="comp-desc">{{ comp.description }}</p>
            <div class="tech-tags">
              <span v-for="t in comp.technologies" :key="t" class="badge badge-primary">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deployment Pipeline -->
    <h2 class="section-title sm">Deployment Pipeline</h2>
    <div class="pipeline mb">
      <div v-for="(stage, i) in pipeline" :key="stage.stage" class="card pipeline-card">
        <div class="stage-header">
          <span class="stage-num">{{ i + 1 }}</span>
          <h3 class="card-title">{{ stage.stage }}</h3>
        </div>
        <p class="card-desc">{{ stage.description }}</p>

        <h4 class="mini-heading">Tools</h4>
        <div class="tech-tags mb-sm">
          <span v-for="t in stage.tools" :key="t" class="badge badge-accent">{{ t }}</span>
        </div>

        <h4 class="mini-heading">Best Practices</h4>
        <ul class="practice-list">
          <li v-for="bp in stage.bestPractices" :key="bp">{{ bp }}</li>
        </ul>
      </div>
    </div>

    <!-- Smart Contract Patterns -->
    <h2 class="section-title sm">Smart Contract Patterns</h2>
    <div class="grid-2 mb">
      <div v-for="pattern in patterns" :key="pattern.name" class="card">
        <div class="pattern-header">
          <h3 class="card-title">{{ pattern.name }}</h3>
          <span class="badge badge-accent">{{ pattern.category }}</span>
        </div>
        <p class="card-desc">{{ pattern.description }}</p>
        <div class="mono impl">{{ pattern.implementation }}</div>
        <div class="when-box mt">
          <strong>When:</strong> {{ pattern.when }}
        </div>
      </div>
    </div>

    <!-- Audit Checklist -->
    <h2 class="section-title sm">🛡️ Security Audit Checklist</h2>
    <div class="card">
      <div v-for="section in audit" :key="section.category" class="audit-section">
        <h3 class="audit-category">{{ section.category }}</h3>
        <div v-for="item in section.items" :key="item.check" class="audit-item">
          <span class="audit-check">☐</span>
          <span class="audit-text">{{ item.check }}</span>
          <span class="badge" :class="severityColor(item.severity)">{{ item.severity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb { margin-bottom: 1.5rem; }
.mb-sm { margin-bottom: 0.75rem; }
.mt { margin-top: 1rem; }
.sm { font-size: 1.375rem; margin-bottom: 1rem; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-desc { color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
.mini-heading { font-size: 0.8125rem; font-weight: 600; margin-bottom: 0.375rem; color: var(--color-text-muted); }

.arch-layers { display: flex; flex-direction: column; gap: 1rem; }
.layer-title { color: var(--color-accent); font-size: 1rem; margin-bottom: 0.75rem; }
.components { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
.component { background: var(--color-bg); padding: 1rem; border-radius: var(--radius); border: 1px solid var(--color-border); }
.comp-name { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.375rem; }
.comp-desc { font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 0.625rem; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; }

.pipeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
.stage-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.stage-num { width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }
.practice-list { padding-left: 1.25rem; font-size: 0.8125rem; color: var(--color-text-muted); }
.practice-list li { margin-bottom: 0.25rem; }

.pattern-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.impl { font-size: 0.6875rem; white-space: pre-wrap; }
.when-box { font-size: 0.8125rem; color: var(--color-text-muted); padding: 0.625rem; background: var(--color-bg); border-radius: var(--radius); border: 1px solid var(--color-border); }

.audit-section { margin-bottom: 1.25rem; }
.audit-section:last-child { margin-bottom: 0; }
.audit-category { font-size: 1rem; font-weight: 600; margin-bottom: 0.625rem; padding-bottom: 0.375rem; border-bottom: 1px solid var(--color-border); }
.audit-item { display: flex; align-items: center; gap: 0.625rem; padding: 0.5rem 0; font-size: 0.8125rem; }
.audit-check { color: var(--color-text-muted); }
.audit-text { flex: 1; }

.badge-danger { background: rgba(248, 113, 113, 0.15); color: var(--color-danger); }
.badge-warning { background: rgba(251, 191, 36, 0.15); color: var(--color-warning); }
</style>
