import { defineStore } from "pinia";
import { ref, reactive } from "vue";

const useListCardStore = defineStore("listCardStore", {
  state: () => {
    const title = ref("");
    const imgProps = reactive({
      dataOriginal: "https://t1.szrtcpa.com/2023/06/02/5d14da53ec5b1.jpg",
      alt: title.value,
      src: "https://t1.szrtcpa.com/2023/06/02/5d14da53ec5b1.jpg",
    });
    const doubanScore = ref(7.5);

    return {
      imgProps,
      doubanScore,
      title,
    };
  },

  actions: {
    setlistCardTitle(val) {
      this.title = val;
    },
    setlistCardImgProps(props = { dataOriginal: "", src: "" }) {
      const { dataOriginal, src } = props;
      this.imgProps.dataOriginal = dataOriginal;
      this.imgProps.src = src;
    },
  },
});

export default useListCardStore;
