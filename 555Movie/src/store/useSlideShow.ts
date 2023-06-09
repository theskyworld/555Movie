import { defineStore } from 'pinia';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";
import { ref } from "vue";

const useSlideShowStore = defineStore('slideShowStore', {
    state: () => {
        const modules = ref([Navigation, Pagination, /*Autoplay,*/ EffectCoverflow]);
        return {
            modules,
        }
    },

    actions: {
        
    },
})

export default useSlideShowStore;