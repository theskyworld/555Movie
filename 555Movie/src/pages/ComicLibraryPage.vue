<template>
  <div class="comicLibraryPageContainer">
    <div class="header">
      <div class="comicFilter">
        <div v-for="section in filterItems" v-key="section.title">
          <div class="title">
            <span>{{ section.title }}</span>
          </div>
          <div>
            <ul>
              <li
                class="items"
                v-for="item in section.content"
                v-key="item.key"
              >
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="listCards">
        <ul>
          <li v-for="card in cardsNumPerPage">
            <ListCard></ListCard>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import { ElPagination } from "element-plus";

const { cardsNumPerPage, thisYear, filterItems } = storeToRefs(useMainStore());
</script>
<style scoped>
.comicLibraryPageContainer {
  position: relative;
  left: 15px;
  top: 20px;
}

.comicFilter {
  color: var(--color--light--);
}

.title {
  font-weight: bolder;
  font-size: 1.1em;
}

.items {
  display: inline-block;
}

.items span {
  display: inline-block;
  background-color: var(--bg--part1--);
  margin: 0 10px;
  width: 6em;
  border-radius: 3px;
  height: 2em;
  text-align: center;
  line-height: 2em;
  font-size: 0.6em;
  cursor: pointer;
}

.content {
  position: absolute;
  left: -45px;
  width: 100%;
}

li {
  display: inline-block;
  margin: 5px;
}

:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next),
:deep(.el-pagination.is-background .el-pager li) {
  background-color: var(--bg--pagination--);
  color: var(--color--light--);
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
  color: var(--active--color--);
}

:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover),
:deep(.el-pagination.is-background .el-pager li:hover) {
  color: var(--hover--color--);
}
</style>
