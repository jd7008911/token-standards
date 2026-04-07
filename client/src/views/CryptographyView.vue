<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api';
import type { ApiResponse, HashResult, KeyPair, SignatureResult, VerifyResult } from '@/types';

// Hashing
const hashInput = ref('Hello, Blockchain!');
const hashAlgorithm = ref('keccak256');
const hashResult = ref<HashResult | null>(null);

async function computeHash(): Promise<void> {
  const { data } = await api.post<ApiResponse<HashResult>>('/crypto/hash', {
    input: hashInput.value,
    algorithm: hashAlgorithm.value,
  });
  if (data.success) hashResult.value = data.data!;
}

// Avalanche Effect
const avalancheInput = ref('Blockchain');
const avalancheResult = ref<{ original: HashResult; modified: HashResult } | null>(null);

async function demonstrateAvalanche(): Promise<void> {
  const { data } = await api.post<ApiResponse<{ original: HashResult; modified: HashResult }>>('/crypto/avalanche', {
    input: avalancheInput.value,
  });
  if (data.success) avalancheResult.value = data.data!;
}

// Key Pair
const keyPair = ref<KeyPair | null>(null);

async function generateKeys(): Promise<void> {
  const { data } = await api.post<ApiResponse<KeyPair>>('/crypto/keypair');
  if (data.success) keyPair.value = data.data!;
}

// Digital Signature
const signMessage = ref('Send 2 ETH to Bob');
const signPrivateKey = ref('');
const signatureResult = ref<SignatureResult | null>(null);

async function createSignature(): Promise<void> {
  if (!signPrivateKey.value) return;
  const { data } = await api.post<ApiResponse<SignatureResult>>('/crypto/sign', {
    message: signMessage.value,
    privateKey: signPrivateKey.value,
  });
  if (data.success) signatureResult.value = data.data!;
}

// Verify
const verifyMessage = ref('');
const verifySignatureInput = ref('');
const verifyResult = ref<VerifyResult | null>(null);

async function verifySign(): Promise<void> {
  const { data } = await api.post<ApiResponse<VerifyResult>>('/crypto/verify', {
    message: verifyMessage.value,
    signature: verifySignatureInput.value,
  });
  if (data.success) verifyResult.value = data.data!;
}
</script>

<template>
  <div class="container">
    <h1 class="section-title">Cryptography Principles</h1>
    <p class="section-subtitle">The foundation of blockchain — hash functions, public-key cryptography, and digital signatures.</p>

    <!-- Hash Functions -->
    <div class="card mb">
      <h2 class="card-title">🔑 Hash Functions</h2>
      <p class="card-desc">
        A cryptographic hash function takes an input and returns a fixed-size digest — deterministic, fast, collision-resistant, and irreversible.
      </p>
      <div class="form-group">
        <label class="label">Input</label>
        <input v-model="hashInput" class="input" placeholder="Enter text to hash" />
      </div>
      <div class="form-group">
        <label class="label">Algorithm</label>
        <select v-model="hashAlgorithm" class="input">
          <option value="keccak256">Keccak-256 (Ethereum)</option>
          <option value="sha256">SHA-256 (Bitcoin)</option>
          <option value="id">Solidity id()</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="computeHash">Compute Hash</button>
      <div v-if="hashResult" class="result">
        <div class="label">{{ hashResult.algorithm }} Hash:</div>
        <div class="mono">{{ hashResult.hash }}</div>
      </div>
    </div>

    <!-- Avalanche Effect -->
    <div class="card mb">
      <h2 class="card-title">🌊 Avalanche Effect</h2>
      <p class="card-desc">A tiny change in input produces a completely different hash — demonstrating collision resistance.</p>
      <div class="form-group">
        <input v-model="avalancheInput" class="input" placeholder="Enter text" />
      </div>
      <button class="btn btn-primary" @click="demonstrateAvalanche">Demonstrate</button>
      <div v-if="avalancheResult" class="result">
        <div class="avalanche-row">
          <div class="label">Original: "{{ avalancheResult.original.input }}"</div>
          <div class="mono">{{ avalancheResult.original.hash }}</div>
        </div>
        <div class="avalanche-row">
          <div class="label">Modified: "{{ avalancheResult.modified.input }}"</div>
          <div class="mono">{{ avalancheResult.modified.hash }}</div>
        </div>
      </div>
    </div>

    <!-- Key Pair Generation -->
    <div class="card mb">
      <h2 class="card-title">🔐 Public-Key Cryptography (ECC)</h2>
      <p class="card-desc">
        Generate an Ethereum key pair using the secp256k1 elliptic curve — a public key (address) and private key.
      </p>
      <button class="btn btn-primary" @click="generateKeys">Generate Key Pair</button>
      <div v-if="keyPair" class="result">
        <div class="form-group">
          <div class="label">Address</div>
          <div class="mono">{{ keyPair.address }}</div>
        </div>
        <div class="form-group">
          <div class="label">Public Key</div>
          <div class="mono">{{ keyPair.publicKey }}</div>
        </div>
        <div class="form-group">
          <div class="label">Private Key <span class="badge badge-danger">Keep Secret!</span></div>
          <div class="mono">{{ keyPair.privateKey }}</div>
        </div>
      </div>
    </div>

    <!-- Digital Signatures -->
    <div class="grid-2">
      <div class="card">
        <h2 class="card-title">✍️ Sign Message (ECDSA)</h2>
        <p class="card-desc">Prove authenticity and integrity by signing a message with your private key.</p>
        <div class="form-group">
          <label class="label">Message</label>
          <input v-model="signMessage" class="input" />
        </div>
        <div class="form-group">
          <label class="label">Private Key</label>
          <input v-model="signPrivateKey" class="input" type="password" placeholder="Paste private key from above" />
        </div>
        <button class="btn btn-primary" @click="createSignature">Sign</button>
        <div v-if="signatureResult" class="result">
          <div class="form-group">
            <div class="label">Message Hash</div>
            <div class="mono">{{ signatureResult.messageHash }}</div>
          </div>
          <div class="form-group">
            <div class="label">Signature</div>
            <div class="mono">{{ signatureResult.signature }}</div>
          </div>
          <div class="form-group">
            <div class="label">Signer Address</div>
            <div class="mono">{{ signatureResult.signerAddress }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="card-title">✅ Verify Signature</h2>
        <p class="card-desc">Recover the signer's address from a message and its signature.</p>
        <div class="form-group">
          <label class="label">Message</label>
          <input v-model="verifyMessage" class="input" placeholder="Original message" />
        </div>
        <div class="form-group">
          <label class="label">Signature</label>
          <textarea v-model="verifySignatureInput" class="input" placeholder="Paste signature" />
        </div>
        <button class="btn btn-primary" @click="verifySign">Verify</button>
        <div v-if="verifyResult" class="result">
          <div class="form-group">
            <div class="label">Recovered Address</div>
            <div class="mono">{{ verifyResult.recoveredAddress }}</div>
          </div>
          <div class="badge badge-success">✓ Valid Signature</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb { margin-bottom: 1.5rem; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card-desc { color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem; }
.form-group { margin-bottom: 0.875rem; }
.label { font-size: 0.8125rem; font-weight: 500; margin-bottom: 0.375rem; color: var(--color-text-muted); }
.result { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }
.avalanche-row { margin-bottom: 1rem; }
.badge-danger {
  background: rgba(248, 113, 113, 0.15);
  color: var(--color-danger);
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
}
</style>
