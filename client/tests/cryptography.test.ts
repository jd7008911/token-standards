import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CryptographyView from '@/views/CryptographyView.vue';

describe('CryptographyView.vue', () => {
  it('should render page title', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    expect(wrapper.find('.section-title').text()).toContain('Cryptography');
  });

  it('should have Hash Functions section with input field', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    const hashCard = wrapper.findAll('.card').find(c =>
      c.find('.card-title').text().includes('Hash Functions')
    );
    expect(hashCard).toBeDefined();
    expect(hashCard!.find('input').exists()).toBe(true);
  });

  it('should have algorithm selector with keccak256, sha256, id', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    const options = wrapper.findAll('select option');
    const values = options.map(o => o.attributes('value'));
    expect(values).toContain('keccak256');
    expect(values).toContain('sha256');
    expect(values).toContain('id');
  });

  it('should have Avalanche Effect section', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    const card = wrapper.findAll('.card').find(c =>
      c.find('.card-title').text().includes('Avalanche')
    );
    expect(card).toBeDefined();
  });

  it('should have Key Pair generation section referencing ECC', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    const card = wrapper.findAll('.card').find(c =>
      c.find('.card-title').text().includes('Public-Key')
    );
    expect(card).toBeDefined();
    expect(card!.text()).toContain('secp256k1');
  });

  it('should have Sign Message and Verify Signature sections', () => {
    const wrapper = mount(CryptographyView, {
      global: { stubs: { RouterLink: true } },
    });
    const titles = wrapper.findAll('.card-title').map(t => t.text());
    expect(titles.some(t => t.includes('Sign'))).toBe(true);
    expect(titles.some(t => t.includes('Verify'))).toBe(true);
  });
});
