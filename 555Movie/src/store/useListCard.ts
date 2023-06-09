import { defineStore } from "pinia";
import { ref, reactive } from "vue";
const useListCardStore = defineStore("listCardStore", {
  state: () => {
    const imgProps = reactive({
      dataOriginal: "",
      alt: "",
      src: "https://t1.szrtcpa.com/upload/vod/20220314-24/bca38c18f708aef70cac8b65a0fd2849.jpg",
    });
    const doubanScore = ref(7.5);

    const title = ref("偶然遇见的你");
    return {
      imgProps,
      doubanScore,
      title,
    };
  },

  actions: {},
});

export default useListCardStore;
