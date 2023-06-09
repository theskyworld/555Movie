import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
const useVideoDetailPageStore = defineStore("videoDetailPageStore", {
    state: () => {
        const ENToCNMapHelper = {
          director: "导演",
          writer: "编剧",
          stars: "主演",
          releaseDate: "上映",
          updateDate: "更新",
          numOfEpisodes: "集数",
          douban: "豆瓣",
        };
        const latestEpisode = "06";
        const videoDetailPageDoubanScore = 7.5;
        const videoInfo = reactive({
          name: "09届探员",
          labels: {
            year: "2023",
            area: "美国",
            // story: ["剧情", "惊悚", "犯罪", "欧美剧"],
          },
          storySummary:
            "故事讲述在近未来美国的司法系统已经被人工智能所改变，主角是一群FBI探员，这群在09年毕业的探员因为一名共同好友过世而重聚。整个故事会横跨30年，在三条时间线里谈及正义、人性及角色的选择将导致什么事情发生",
          others: {
            director: "汤姆·罗伯·史密斯",
            writer: "汤姆·罗伯·史密斯",
            stars: [
              "凯特·玛拉",
              "布莱恩·泰里·亨利",
              "布莱恩·J·史密斯",
              "罗莎琳德·以利亚撒",
              "塞皮德·莫阿菲",
            ],
            releaseDate: "2023-05-10(美国)",
            updateDate: "2023-06-08",
            numOfEpisodes: `更新至${latestEpisode}集`,
            douban: `${videoDetailPageDoubanScore}分`,
          },
        });

        const numOfEpisodesRef = ref(6);
        const numOfRelevantRecommend = ref(8);
        return {
          ENToCNMapHelper,
          latestEpisode,
          videoDetailPageDoubanScore,
          videoInfo,
          numOfEpisodesRef,
          numOfRelevantRecommend,
        };
  },

  actions: {},
});

export default useVideoDetailPageStore;
