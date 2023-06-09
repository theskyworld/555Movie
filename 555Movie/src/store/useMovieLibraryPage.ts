import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const useMovieLibraryPageStore = defineStore("movieLibraryPageStore", {
    state: () => {
        const cardsNumPerPage = ref(30);

        const thisYear = new Date().getFullYear();

        const movieLibraryPageFilterItems = reactive({
          byStory: {
            title: "剧情",
            content: [
              {
                key: "1",
                title: "全部",
              },
              {
                key: "2",
                title: "Netflix",
              },
              {
                key: "3",
                title: "仙侠",
              },
              {
                key: "4",
                title: "剧情",
              },
              {
                key: "5",
                title: "科幻",
              },
              {
                key: "6",
                title: "动作",
              },
              {
                key: "7",
                title: "喜剧",
              },
              {
                key: "8",
                title: "爱情",
              },
              {
                key: "9",
                title: "冒险",
              },
              {
                key: "10",
                title: "儿童",
              },
              {
                key: "11",
                title: "歌舞",
              },
              {
                key: "12",
                title: "音乐",
              },
              {
                key: "13",
                title: "奇幻",
              },
              {
                key: "14",
                title: "动画",
              },
              {
                key: "15",
                title: "恐怖",
              },
              {
                key: "16",
                title: "惊悚",
              },
              {
                key: "17",
                title: "丧尸",
              },
              {
                key: "18",
                title: "战争",
              },
              {
                key: "19",
                title: "传记",
              },
              {
                key: "20",
                title: "犯罪",
              },
            ],
          },
          byArea: {
            title: "地区",
            content: [
              {
                key: "1",
                title: "全部",
              },
              {
                key: "2",
                title: "大陆",
              },
              {
                key: "3",
                title: "香港",
              },
              {
                key: "4",
                title: "台湾",
              },
              {
                key: "5",
                title: "美国",
              },
              {
                key: "6",
                title: "日本",
              },
              {
                key: "7",
                title: "韩国",
              },
              {
                key: "8",
                title: "英国",
              },
              {
                key: "9",
                title: "法国",
              },
              {
                key: "10",
                title: "德国",
              },
              {
                key: "11",
                title: "印度",
              },
              {
                key: "12",
                title: "泰国",
              },
              {
                key: "13",
                title: "丹麦",
              },
              {
                key: "14",
                title: "瑞典",
              },
              {
                key: "15",
                title: "巴西",
              },
            ],
          },
          byLanguage: {
            title: "语言",
            content: [
              {
                key: "1",
                title: "全部",
              },
              {
                key: "2",
                title: "英语",
              },
              {
                key: "3",
                title: "法语",
              },
              {
                key: "4",
                title: "国语",
              },
              {
                key: "5",
                title: "粤语",
              },
              {
                key: "6",
                title: "日语",
              },
              {
                key: "7",
                title: "韩语",
              },
              {
                key: "8",
                title: "泰语",
              },
              {
                key: "9",
                title: "德语",
              },
              {
                key: "10",
                title: "俄语",
              },
              {
                key: "11",
                title: "闽南语",
              },
              {
                key: "12",
                title: "丹麦语",
              },
              {
                key: "13",
                title: "波兰语",
              },
              {
                key: "14",
                title: "瑞典语",
              },
            ],
          },
          byYear: {
            title: "年份",
            content: [
              {
                key: "1",
                title: "全部",
              },
              {
                key: "2",
                title: `${thisYear}`,
              },
              {
                key: "3",
                title: `${thisYear - 1}`,
              },
              {
                key: "4",
                title: `${thisYear - 2}`,
              },
              {
                key: "5",
                title: `${thisYear - 3}`,
              },
              {
                key: "6",
                title: `${thisYear - 4}`,
              },
              {
                key: "7",
                title: `${thisYear - 5}`,
              },
              {
                key: "8",
                title: `${thisYear - 6}`,
              },
              {
                key: "9",
                title: `${thisYear - 7}`,
              },
              {
                key: "10",
                title: `${thisYear - 8}`,
              },
              {
                key: "11",
                title: `${thisYear - 9}`,
              },
              {
                key: "12",
                title: `${thisYear - 10}`,
              },
              {
                key: "13",
                title: `${thisYear - 11}`,
              },
              {
                key: "14",
                title: `${thisYear - 12}`,
              },
              {
                key: "15",
                title: `${thisYear - 13}`,
              },
              {
                key: "16",
                title: `${thisYear - 14}`,
              },
              {
                key: "17",
                title: `${thisYear - 15}`,
              },
            ],
          },
          byOrder: {
            title: "排序",
            content: [
              {
                key: "1",
                title: "时间排序",
              },
              {
                key: "2",
                title: "人气排序",
              },
              {
                key: "3",
                title: "评分排序",
              },
            ],
          },
        });
        return {
          movieLibraryPageFilterItems,
        };
    },

    actions: {
        
    }
});

export default useMovieLibraryPageStore;