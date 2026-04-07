import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/cryptography', component: { template: '<div />' } },
      { path: '/tokens', component: { template: '<div />' } },
      { path: '/wallets', component: { template: '<div />' } },
      { path: '/defi', component: { template: '<div />' } },
      { path: '/nft', component: { template: '<div />' } },
      { path: '/dapp', component: { template: '<div />' } },
    ],
  });
}

describe('HomeView.vue', () => {
  it('should render hero title with "Blockchain Fundamentals"', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    expect(wrapper.find('.hero-title').text()).toContain('Blockchain');
    expect(wrapper.find('.hero-title').text()).toContain('Fundamentals');
  });

  it('should display 3 section cards for Cryptography, Token Standards, Wallet Integration', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    const cards = wrapper.findAll('.section-card');
    expect(cards).toHaveLength(6);

    const titles = cards.map(c => c.find('.section-card-title').text());
    expect(titles).toContain('Cryptography');
    expect(titles).toContain('Token Standards');
    expect(titles).toContain('Wallet Integration');
    expect(titles).toContain('DeFi Platforms');
    expect(titles).toContain('NFT Development');
    expect(titles).toContain('dApp Architecture');
  });

  it('should show relevant badges for each section', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    const allBadges = wrapper.findAll('.badge').map(b => b.text());
    expect(allBadges).toContain('SHA-256');
    expect(allBadges).toContain('ECC');
    expect(allBadges).toContain('ERC-20');
    expect(allBadges).toContain('ERC-721');
    expect(allBadges).toContain('ERC-1155');
    expect(allBadges).toContain('MetaMask');
    expect(allBadges).toContain('WalletConnect');
  });

  it('should link Cryptography card to /cryptography', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });

    const cryptoCard = wrapper.findAll('.section-card').find(
      c => c.find('.section-card-title').text() === 'Cryptography'
    );
    expect(cryptoCard).toBeDefined();
    expect(cryptoCard!.attributes('href')).toBe('/cryptography');
  });
});
