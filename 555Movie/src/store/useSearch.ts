import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { getService } from "../web/axios/axios";

const useSearchStore = defineStore("searchStore", {
  state: () => {
    const placeholderValue = ref("偶然遇见的你");
    let searchValue = ref("");
    const uniqueInfos = ref([]);
    const initialInfos = ref([]);
    // 分别存储最终获得的m3u8文件、图片地址和标题
    const urlsRes = ref([]);
    const picsRes = ref([]);
    const titlesRes = ref([]);
    return {
      placeholderValue,
      searchValue,
      uniqueInfos,
      initialInfos,
      urlsRes,
      picsRes,
      titlesRes,
    };
  },

  actions: {
    setSearchValue(val) {
      this.searchValue = val;
    },

    getInfos: async function (keyWord) {
      const res = await getService({
        wd: keyWord,
      });
      const infos = res.info;

      this.initialInfos = infos;

      return infos;
    },

    getDetails: async function (info) {
      const { id, flag } = info;
      const res = getService({
        id,
        flag,
      });
      return res;
    },

    // 从所有获取到的infos来获取所有唯一的info，避免重复请求
    getUniqueInfos(infos) {
      const copyOfInfos = infos ? infos : [];
      const titles = new Set();
      const res = [];
      copyOfInfos.forEach((info) => {
        titles.add(info.title);
      });

      const titlesArr = [...titles];
      for (let i = 0; i < titlesArr.length; i++) {
        copyOfInfos.forEach((info, index) => {
          if (info && info.title === titlesArr[i]) {
            // 删除已获取到的唯一的info，且不影响源数组中值的索引
            titlesArr[i] = null;
            copyOfInfos[index] = null;
            res.push(info);
          }
        });
      }
      this.uniqueInfos = res;

      return res;
    },
  },
});

export default useSearchStore;
