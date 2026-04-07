import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api';
import type { ApiResponse, TokenStandard } from '@/types';

export const useTokenStore = defineStore('tokens', () => {
  const standards = ref<TokenStandard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchStandards(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<ApiResponse<TokenStandard[]>>('/tokens/standards');
      if (data.success) standards.value = data.data!;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch standards';
    } finally {
      loading.value = false;
    }
  }

  function getByType(type: string): TokenStandard | undefined {
    return standards.value.find(s => s.type.toLowerCase() === type.toLowerCase());
  }

  return { standards, loading, error, fetchStandards, getByType };
});
