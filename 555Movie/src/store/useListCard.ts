import { defineStore } from "pinia";
import { ref, reactive } from "vue";
const useListCardStore = defineStore("listCardStore", {
  state: () => {
    const title = ref('');
    const imgProps = reactive({
      dataOriginal: "",
      alt: title.value,
      src: "",
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
    setlistCardImgProps(props = { dataOriginal : '', src : ''}) {
      const { dataOriginal, src } = props;
      this.imgProps.dataOriginal = dataOriginal;
      this.imgProps.src = src;
    },
  },
});

export default useListCardStore;
