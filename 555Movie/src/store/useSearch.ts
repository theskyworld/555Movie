import { defineStore } from 'pinia';
import { ref } from 'vue';
const useSearchStore = defineStore('searchStore', {
    state: () => {
        const placeholderValue = ref("偶然遇见的你");
        return {
          placeholderValue,
        };
    },

    actions: {
        
    }
})

export default useSearchStore;
