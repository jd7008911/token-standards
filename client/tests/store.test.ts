import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTokenStore } from '@/stores/token.store';

describe('Token Store', () => {
  it('should initialize with empty standards', () => {
    setActivePinia(createPinia());
    const store = useTokenStore();
    expect(store.standards).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('should return undefined for unknown type via getByType', () => {
    setActivePinia(createPinia());
    const store = useTokenStore();
    expect(store.getByType('ERC-999')).toBeUndefined();
  });
});
