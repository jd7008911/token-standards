import { ref } from 'vue';
export function useLoading() {
    const loading = ref(false);
    const error = ref(null);
    async function withLoading(fn) {
        loading.value = true;
        error.value = null;
        try {
            return await fn();
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'An error occurred';
            return null;
        }
        finally {
            loading.value = false;
        }
    }
    return { loading, error, withLoading };
}
