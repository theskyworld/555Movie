<template>
  <div id="searchContainer">
    <div class="inputWrapper">
      <input ref="inputElem" type="text" :placeholder="placeholderValue" />
      <div class="inputIcon" ref="inputIconElem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../router";
import Service from "../web/axios/axios.ts";

const mainStore = useMainStore();
const { placeholderValue } = storeToRefs(mainStore);
const { setSearchValue, setSearchRes } = mainStore;
const inputIconElem = ref();
const inputElem = ref();
let wdv = ref("");

// 从所有获取到的infos来获取所有唯一的info，避免重复请求
function getUniqueInfos(infos) {
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

  return res;
}

onMounted(() => {
  const searchCallBack = async () => {
    const searchValue = inputElem.value.value;
    wdv.value = searchValue;
    setSearchValue(searchValue);
    inputElem.value.value = "";


    try {
      // 发起初始的axios请求
      console.log("axios");
      const initalRes = await new Service({
        wd: searchValue
      });

      const infos = initalRes.info;
      const uniqueInfos = getUniqueInfos(infos);
      // 分别存储最终获得的m3u8文件、图片地址和标题
      const urlsRes = ref([]);
      const picsRes = ref([]);
      const titlesRes = ref([]);

      // 根据所有唯一的info来获取当前info对应的url和pic地址
      uniqueInfos.forEach(async (info) => {
        const { id, flag } = info;
        const res = await new Service({
          id,
          flag,
        });

        const { url, pic, title } = res;
        urlsRes.value.push(url);
        picsRes.value.push(pic);
        titlesRes.value.push(title);
      });

      // 存储获取到的结果值
      setSearchRes(urlsRes, picsRes, titlesRes);
      // 跳转到结果页面
      router.push({
        name: "searchResult",
      });

    } catch (err) {
        console.log(err);
    };

  
  };



  // 点击搜索框进行搜索
  inputIconElem.value.addEventListener("click", searchCallBack);
  // 按回车进行搜索
  inputElem.value.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      searchCallBack();
    }
  });
});
</script>

<style scoped>
input {
  box-sizing: border-box;
  width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #25252b;
  padding: 10px;
  border: none;
  color: var(--color--light--);
}

.inputWrapper {
  width: 350px;
  position: relative;
}

input::placeholder {
  color: rgba(196, 193, 193, 0.3);
}

input:focus {
  outline: none;
  border: none;
}

.inputIcon {
  position: absolute;
  right: 10px;
  top: 7px;
  cursor: pointer;
}

.icon {
  fill: var(--color--light--);
}
</style>
