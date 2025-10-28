<script setup>
import { apiFetch } from '@/consumables/useApi.js';

export default {
    name: 'UsersPage',
    data() {
        return { users: [] };
    },
    async mounted() {
        try {
            const data = await apiFetch('/login'); // Call PHP backend
            this.users = data;
        } catch (err) {
            console.error('API Error:', err.message);
        }
    },
};

</script>
