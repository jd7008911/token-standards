import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api';
export const useTokenStore = defineStore('tokens', () => {
    const standards = ref([]);
    const loading = ref(false);
    const error = ref(null);
    async function fetchStandards() {
        loading.value = true;
        error.value = null;
        try {
            const { data } = await api.get('/tokens/standards');
            if (data.success)
                standards.value = data.data;
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to fetch standards';
        }
        finally {
            loading.value = false;
        }
    }
    function getByType(type) {
        return standards.value.find(s => s.type.toLowerCase() === type.toLowerCase());
    }
    return { standards, loading, error, fetchStandards, getByType };
});
