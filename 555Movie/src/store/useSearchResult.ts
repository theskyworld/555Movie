import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const useSearchResultStore = defineStore("searchResultStore", {
    state: () => {
        // 当前页中数据起始的索引值，第一页为0，每下一个就+=每页中总数据的数量值
        const curPageStartIndex = ref(0);
        const searchRes = reactive({
            urls: [],
            pics: [],
            titles: [],
            curPageStartIndex: curPageStartIndex,
        });
        // 每页展示的数据的数量，最后一个为总的数据数量/每页展示的数据数量
        const searchResultPerPageNum = ref(15);
        return {
            searchRes,
            searchResultPerPageNum,
            curPageStartIndex,
        };
    },

    actions: {
        setSearchRes(urls, pics, titles) {
            // console.log("🚀 ~ file: useSearchResult.ts:18 ~ setSearchRes ~ titles:", titles)
            // console.log("🚀 ~ file: useSearchResult.ts:18 ~ setSearchRes ~ pics:", pics)
            // console.log("🚀 ~ file: useSearchResult.ts:18 ~ setSearchRes ~ urls:", urls)

            this.searchRes.urls = urls;
            this.searchRes.pics = pics;
            this.searchRes.titles = titles;
        },
        setCurPageStartIndex(isPrev = false) {
            if (isPrev) {
                this.curPageStartIndex -= 15;
                return;
            }
            this.curPageStartIndex += 15;
            
    },
  },
});

export default useSearchResultStore;
