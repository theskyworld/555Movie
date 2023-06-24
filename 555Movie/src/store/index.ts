import { createPinia, defineStore } from "pinia";
import { storeToRefs } from "pinia";
import useWeeklyStore from "./useWeekly";
import useSlideShowStore from "./useSlideShow";
import useListCardStore from "./useListCard";
import usePersonCenterStore from "./usePersonCenter";
import useSearchStore from "./useSearch";
import useSlideBarStore from "./useSlideBar";
import useWatchHistoryStore from "./useWatchHistory";
import useComicLandingPageStore from "./useComicLandingPage";
import useComicLibraryPageStore from "./useComicLibraryPage";
import useMovieLandingPageStore from "./useMovieLandingPage";
import useMovieLibraryPageStore from "./useMovieLibraryPage";
import useTVLandingPageStore from "./useTVLandingPage";
import useTVLibraryPageStore from "./useTVLibraryPage";
import useTVShowLandingPageStore from "./useTVShowLandingPage";
import useTvShowLibraryPageStore from "./useTvShowLibraryPage";
import useVideoDetailPageStore from "./useVideoDetailPage";
import useVideoPlayingPageStore from "./useVideoPlayingPage";
import useSearchResultStore from "./useSearchResult";

const pinia = createPinia();
const weeklyStore = useWeeklyStore(pinia);
const slideShowStore = useSlideShowStore(pinia);
const listCardStore = useListCardStore(pinia);
const personCenterStore = usePersonCenterStore(pinia);
const searchStore = useSearchStore(pinia);
const slideBarStore = useSlideBarStore(pinia);
const watchHistoryStore = useWatchHistoryStore(pinia);
const comicLandingPageStore = useComicLandingPageStore(pinia);
const comicLibraryPageStore = useComicLibraryPageStore(pinia);
const movieLandingPageStore = useMovieLandingPageStore(pinia);
const movieLibraryPageStore = useMovieLibraryPageStore(pinia);
const tvLandingPageStore = useTVLandingPageStore(pinia);
const tvLibraryPageStore = useTVLibraryPageStore(pinia);
const tvShowLandingPageStore = useTVShowLandingPageStore(pinia);
const tvShowLibraryPageStore = useTvShowLibraryPageStore(pinia);
const videoDetailPageStore = useVideoDetailPageStore(pinia);
const videoPlayingPageStore = useVideoPlayingPageStore(pinia);
const searchResultStore = useSearchResultStore(pinia);

const useMainStore = defineStore("mainStore", {
  state: () => {
    const { weeklyCardsNum, weeks } = storeToRefs(weeklyStore);
    const { modules } = storeToRefs(slideShowStore);
    const { imgProps, doubanScore, title } = storeToRefs(listCardStore);
    const { isShowInfo } = storeToRefs(personCenterStore);
    const {
      placeholderValue,
      searchValue,
      uniqueInfos,
      urlsRes,
      picsRes,
      titlesRes,
      initialInfos,
    } = storeToRefs(searchStore);
    const { sideBarMenus } = storeToRefs(slideBarStore);
    const { isShowHistory, watchHistories } = storeToRefs(watchHistoryStore);
    const { comicLandingPageCardsNum, comicLandingPageListTitles } =
      storeToRefs(comicLandingPageStore);
    const { cardsNumPerPage, thisYear, filterItems } = storeToRefs(
      comicLibraryPageStore
    );
    const { movieLandingPageCardsNum, movieLandingPageListTitles } =
      storeToRefs(movieLandingPageStore);
    const { movieLibraryPageFilterItems } = storeToRefs(movieLibraryPageStore);
    const { tvLandingPageCardsNum, tvLandingPageListTitles } =
      storeToRefs(tvLandingPageStore);
    const { tvLibraryPageFilterItems } = storeToRefs(tvLibraryPageStore);
    const { tvShowLandingPageCardsNum, tvShowLandingPageListTitles } =
      storeToRefs(tvShowLandingPageStore);
    const { tvShowLibraryPageLilterItems } = storeToRefs(
      tvShowLibraryPageStore
    );
    const {
      ENToCNMapHelper,
      latestEpisode,
      videoDetailPageDoubanScore,
      videoInfo,
      numOfEpisodesRef,
      numOfRelevantRecommend,
    } = storeToRefs(videoDetailPageStore);
    const { videoInfos, numOfListCards } = storeToRefs(videoPlayingPageStore);
    const { searchRes, searchResultPerPageNum, curPageStartIndex } =
      storeToRefs(searchResultStore);
    return {
      weeklyCardsNum,
      weeks,
      modules,
      imgProps,
      doubanScore,
      title,
      isShowInfo,
      placeholderValue,
      searchValue,
      sideBarMenus,
      isShowHistory,
      watchHistories,
      comicLandingPageCardsNum,
      comicLandingPageListTitles,
      cardsNumPerPage,
      thisYear,
      filterItems,
      movieLandingPageCardsNum,
      movieLandingPageListTitles,
      movieLibraryPageFilterItems,
      tvLandingPageCardsNum,
      tvLandingPageListTitles,
      tvLibraryPageFilterItems,
      tvShowLandingPageCardsNum,
      tvShowLandingPageListTitles,
      tvShowLibraryPageLilterItems,
      ENToCNMapHelper,
      latestEpisode,
      videoDetailPageDoubanScore,
      videoInfo,
      numOfEpisodesRef,
      numOfRelevantRecommend,
      videoInfos,
      numOfListCards,
      searchRes,
      searchResultPerPageNum,
      curPageStartIndex,
      uniqueInfos,
      initialInfos,
      urlsRes,
      picsRes,
      titlesRes,
    };
  },

  actions: {
    setSearchValue(val) {
      searchStore.setSearchValue(val);
    },
    getInfos : async function(keyWord) {
      const res = await searchStore.getInfos(keyWord);
      return res;
    },
    getDetails(info) {
      return searchStore.getDetails(info);
    },
    getUniqueInfos(infos) {
      return searchStore.getUniqueInfos(infos);
    },
    setSearchRes(urls, pics, titles) {
      searchResultStore.setSearchRes(urls, pics, titles);
    },
    setCurPageStartIndex(isPrev) {
      searchResultStore.setCurPageStartIndex(isPrev);
    },
    setlistCardTitle(val) {
      listCardStore.setlistCardTitle(val);
    },
    setlistCardImgProps(props) {
      listCardStore.setlistCardImgProps(props);
    },
  },
});

export default useMainStore;
