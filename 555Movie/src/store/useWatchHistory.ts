import { defineStore } from "pinia";
import { ref } from "vue";
const useWatchHistoryStore = defineStore("watchHistoryStore", {
  state: () => {
    const isShowHistory = ref(false);
    const watchHistories = ref([
      {
        title: "偶然遇见的你",
      },
      {
        title: "偶然遇见的你",
      },
      {
        title: "偶然遇见的你",
      },
      {
        title: "偶然遇见的你",
      },
      {
        title: "偶然遇见的你",
      },
    ]);
    return { isShowHistory, watchHistories };
  },

  actions: {},
});

export default useWatchHistoryStore;
