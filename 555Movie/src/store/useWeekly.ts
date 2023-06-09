import { defineStore } from "pinia";
import { ref } from "vue";

const useWeeklyStore = defineStore("weeklyStore", {
  state: () => {
    const weeklyCardsNum = ref(6);
    const weeks = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
    return {
      weeklyCardsNum,
      weeks,
    };
  },

  actions: {},
});


export default useWeeklyStore;
