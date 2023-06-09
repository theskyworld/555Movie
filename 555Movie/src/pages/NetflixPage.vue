<template>
  <div class="netflixPageContainer">
    <div class="header">
      <h2>Netflix美剧</h2>
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
        <el-pagination background layout="prev, pager, next" :total="20" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import { ElPagination } from "element-plus";

const { cardsNumPerPage } = storeToRefs(useMainStore());
</script>
<style scoped>
.netflixPageContainer {
  position: relative;
  top: -100px;
}

h2 {
  color: var(--color--light--);
}
.content {
  position: absolute;
  left: -35px;
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
