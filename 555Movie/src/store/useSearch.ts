import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
const useSearchStore = defineStore("searchStore", {
  state: () => {
    const placeholderValue = ref("偶然遇见的你");
    let searchValue = ref("");
    return {
      placeholderValue,
      searchValue,
    };
  },

  actions: {
    setSearchValue(val) {
      this.searchValue = val;
    },
  },
});

export default useSearchStore;
