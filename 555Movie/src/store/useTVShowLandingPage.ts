import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const useTVShowLandingPageStore = defineStore("tvShowLandingPageStore", {
    state: () => {
        const tvShowLandingPageCardsNum = reactive({
          top10: 10,
          newtvShow: 12,
          topList: 12,
          latestUpdate: 12,
        });

        const tvShowLandingPageListTitles = ref([
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
          tvShowLandingPageCardsNum,
          tvShowLandingPageListTitles,
        };
  },

  actions: {},
});


export default useTVShowLandingPageStore;