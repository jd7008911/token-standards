import { ref } from 'vue';

export function useLoading() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function withLoading<T>(fn: () => Promise<T>): Promise<T | null> {
    loading.value = true;
    error.value = null;
    try {
      return await fn();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred';
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, withLoading };
}
