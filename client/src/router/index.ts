import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/cryptography',
    name: 'Cryptography',
    component: () => import('@/views/CryptographyView.vue'),
  },
  {
    path: '/tokens',
    name: 'TokenStandards',
    component: () => import('@/views/TokenStandardsView.vue'),
  },
  {
    path: '/wallets',
    name: 'WalletIntegration',
    component: () => import('@/views/WalletIntegrationView.vue'),
  },
  {
    path: '/defi',
    name: 'DeFi',
    component: () => import('@/views/DeFiView.vue'),
  },
  {
    path: '/nft',
    name: 'NFT',
    component: () => import('@/views/NFTView.vue'),
  },
  {
    path: '/dapp',
    name: 'DApp',
    component: () => import('@/views/DAppView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
