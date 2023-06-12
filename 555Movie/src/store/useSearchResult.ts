import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useSearchResultStore = defineStore("searchResultStore", {
    state: () => {
        const searchRes = reactive({
            urls: [],
            pics: [],
            titles : [],
        });
        return {
          searchRes,
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
        }
    },
});

export default useSearchResultStore;