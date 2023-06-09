import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const useMovieLandingPageStore = defineStore("movieLandingPageStore", {
    state: () => {
        const movieLandingPageCardsNum = reactive({
          top10: 10,
          newMovie: 12,
          topList: 12,
          latestUpdate: 12,
        });

        const movieLandingPageListTitles = ref([
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
          movieLandingPageCardsNum,
          movieLandingPageListTitles,
        };
    },

    actions: {
        
    }
});

export default useMovieLandingPageStore;