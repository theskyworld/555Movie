<template>
  <div class="searchResultPageContainer">
    <div class="header">
      <span>
        搜索
        <span>"{{ searchValue }}"</span>
        ,找到
        <span>{{ titles.length }}</span>
        部影片
      </span>
    </div>
    <div class="listCard">
      <ul>
        <li v-for="i in searchResultPerPageNum">
          <ListCard
            :url="urls[i - 1 + curPageStartIndex]"
            :pic="pics[i - 1 + curPageStartIndex]"
            :title="titles[i - 1 + curPageStartIndex]"
          ></ListCard>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        background
        :hide-on-single-page="true"
        @prev-click="toPrevPage()"
        @next-click="toNextPage()"
        @current-change="getCurrentPage"
        layout="prev, pager, next"
        :total="titles.length"
      />
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import { ElPagination } from "element-plus";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useMainStore from "../store";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
let {
  searchValue,
  searchRes,
  curPageStartIndex,
  uniqueInfos,
  urlsRes,
  picsRes,
  titlesRes,
} = storeToRefs(mainStore);
let { searchResultPerPageNum } = storeToRefs(mainStore);

// 如果获取到的uniqueInfos的长度小于15，则总共就展示uniqueInfos的长度个卡片
// 否则按照初始的方式进行展示（从第一个开始每页15个卡片，直到最后一页可能小于15个）
searchResultPerPageNum.value =
  uniqueInfos.value.length <= 15
    ? uniqueInfos.value.length
    : searchResultPerPageNum.value;
const { setCurPageStartIndex, getDetails, setSearchRes } = mainStore;
let { urls, pics, titles } = searchRes.value;
const pageCounts = Math.ceil(titles.length / searchResultPerPageNum.value);
const searchResultLastPageNum = ref(
  titles.length % searchResultPerPageNum.value
);

function toPrevPage() {
  searchResultPerPageNum.value = 15;
  setCurPageStartIndex(true);
}
function toNextPage() {
  // 请求第二页中的数据
  uniqueInfos.value.forEach(async (info, index) => {
    if (index >= 15 && index < 30) {
      const res = await getDetails(info);

      const { url, pic, title } = res;
      urlsRes.value.push(url);
      picsRes.value.push(pic);
      titlesRes.value.push(title);
    }
  });
  // 存储获取到的结果值
  setSearchRes(urlsRes.value, picsRes.value, titlesRes.value);
  searchRes = storeToRefs(mainStore).searchRes;
  urls = searchRes.value.urls;
  pics = searchRes.value.pics;
  titles = searchRes.value.titles;

  setCurPageStartIndex();
}
function getCurrentPage(val) {
  if (val === pageCounts) {
    searchResultPerPageNum.value = searchResultLastPageNum.value;
  }
}
</script>
<style scoped>
.searchResultPageContainer {
  position: relative;
  top: -100px;
  left: 30px;
  width: 100%;
}
.header {
  width: 100%;
  font-size: 1.1em;
  color: var(--color--light--);
}
.header span span {
  color: var(--hover--color--);
}
.header::after {
  content: "";
  display: block;
  position: relative;
  top: 15px;
  width: 100%;
  border: solid 1px var(--seperate--line--);
}

.listCard ul {
  position: relative;
  left: -45px;
  top: 15px;
}

.listCard li {
  display: inline-block;
  margin: 5px;
}

:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next),
:deep(.el-pagination.is-background .el-pager li) {
  background-color: var(--bg--pagination--);
  color: var(--color--light--);
}

:deep(.el-pagination.is-background .el-pager li.is-active),
:deep(.el-pagination.is-background .btn-prev.is-active),
:deep(.el-pagination.is-background .btn-next.is-active) {
  background-color: transparent;
  color: var(--active--color--);
}

:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover),
:deep(.el-pagination.is-background .el-pager li:hover) {
  color: var(--hover--color--);
}

:deep(.el-pagination.is-background .btn-prev:disabled),
:deep(.el-pagination.is-background .btn-next:disabled) {
  background-color: transparent;
}
</style>
