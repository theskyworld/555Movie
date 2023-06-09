import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const useComicLandingPageStore = defineStore("comicLandingPageStore", {
  state: () => {
    const comicLandingPageCardsNum = reactive({
      top10: 10,
      newcomic: 12,
      topList: 12,
      latestUpdate: 12,
    });

    const comicLandingPageListTitles = ref([
      {
        key: "1",
        title: "日榜",
      },
      {
        key: "2",
        title: "周榜",
      },
      {
        key: "3",
        title: "月榜",
      },
    ]);
    return {
      comicLandingPageCardsNum,
      comicLandingPageListTitles,
    };
  },

  actions: {},
});

export default useComicLandingPageStore;
