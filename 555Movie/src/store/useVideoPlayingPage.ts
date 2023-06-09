import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const useVideoPlayingPageStore = defineStore("videoPlayingPageStore", {
    state: () => {
        const videoInfos = reactive({
          name: "09届探员",
          labels: {
            year: "2023",
            area: "美国",
            // story : ['剧情', "惊悚", "科幻"]
          },
          numOfEpisode: 6,
        });

        const numOfListCards = ref(12);
        return {
            videoInfos,
            numOfListCards,
        };
  },

  actions: {},
});

export default useVideoPlayingPageStore;
