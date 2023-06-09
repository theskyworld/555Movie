import { defineStore } from "pinia";
import { ref } from "vue";

const usePersonCenterStore = defineStore("personCenterStore", {
  state: () => {
    const isShowInfo = ref(false);
    return {
      isShowInfo,
    };
  },

  actions: {},
});

export default usePersonCenterStore;
