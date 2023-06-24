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

const mainStore = useMainStore();
const { placeholderValue, urlsRes,
  picsRes,
  titlesRes,
  perPageNum, } = storeToRefs(mainStore);
const {
  setSearchValue,
  setSearchRes,
  getInfos,
  getDetails,
  getUniqueInfos,
} = mainStore;
const inputIconElem = ref();
const inputElem = ref();
let wdv = ref("");

onMounted(() => {
  const searchCallBack = async () => {
    const searchValue = inputElem.value.value;
    wdv.value = searchValue;
    setSearchValue(searchValue);
    inputElem.value.value = "";

    // 如果输入的搜索内容为空，直接返回
    if (!searchValue.trim()) return;

    try {
      // 发起初始的axios请求
      console.log("axios");
      // 发起请求前清空上次搜索的urlsRes,picsRes,titlesRes,
      urlsRes.value = [];
      picsRes.value = [];
      titlesRes.value = [];
      const infos = await getInfos(searchValue);

      const uniqueInfos = await getUniqueInfos(infos);

      // 根据所有唯一的info来获取当前info对应的url和pic地址
      // 请求第一页中的数据
      uniqueInfos.forEach(async (info, index) => {
        console.log(perPageNum.value)
        if (index < perPageNum.value) {
          const res = await getDetails(info);

          const { url, pic, title } = res;
          urlsRes.value.push(url);
          picsRes.value.push(pic);
          titlesRes.value.push(title);
        }
      });

      // 存储获取到的结果值
      setSearchRes(urlsRes.value, picsRes.value, titlesRes.value);
    } catch (err) {
      console.log(err);
    }

    // 跳转到结果页面
    router.push({
      name: "searchResult",
    });
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
