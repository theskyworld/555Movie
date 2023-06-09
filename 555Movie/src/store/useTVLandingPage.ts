import { defineStore } from 'pinia';
import { ref, reactive } from "vue";

const useTVLandingPageStore = defineStore("tvLandingPageStore", {
    state: () => {
        const tvLandingPageCardsNum = reactive({
          top10: 10,
          newtv: 12,
          topList: 12,
          latestUpdate: 12,
        });

        const tvLandingPageListTitles = ref([
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
          tvLandingPageCardsNum,
          tvLandingPageListTitles,
        };
    },

    actions: {
        
    }
});


export default useTVLandingPageStore;