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
        <li v-for="i in titles.length">
          <ListCard
            :url="urls[i - 1]"
            :pic="pics[i - 1]"
            :title="titles[i - 1]"
          ></ListCard>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000" />
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

const searchResultNum = ref(10);
const mainStore = useMainStore();
const { searchValue, searchRes } = storeToRefs(mainStore);
const { urls, pics, titles } = searchRes.value;
// console.log("🚀 ~ file: SearchResultPage.vue:35 ~ searchRes:", searchRes.value);
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
