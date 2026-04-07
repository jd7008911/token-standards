import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@/App.vue';

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/cryptography', component: { template: '<div>Crypto</div>' } },
      { path: '/tokens', component: { template: '<div>Tokens</div>' } },
      { path: '/wallets', component: { template: '<div>Wallets</div>' } },
      { path: '/defi', component: { template: '<div>DeFi</div>' } },
      { path: '/nft', component: { template: '<div>NFT</div>' } },
      { path: '/dapp', component: { template: '<div>dApp</div>' } },
    ],
  });
}

describe('App.vue — Navigation', () => {
  it('should render the app with header and navigation links', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.find('.logo-text').text()).toBe('TokenStandards');
    const navLinks = wrapper.findAll('.nav-link');
    expect(navLinks).toHaveLength(6);
    expect(navLinks[0].text()).toBe('Cryptography');
    expect(navLinks[1].text()).toBe('Token Standards');
    expect(navLinks[2].text()).toBe('Wallet Integration');
    expect(navLinks[3].text()).toBe('DeFi');
    expect(navLinks[4].text()).toBe('NFTs');
    expect(navLinks[5].text()).toBe('dApps');
  });

  it('should have footer with topic summary', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.find('.app-footer').text()).toContain('Cryptography');
    expect(wrapper.find('.app-footer').text()).toContain('Token Standards');
    expect(wrapper.find('.app-footer').text()).toContain('Wallet Integration');
  });
});
