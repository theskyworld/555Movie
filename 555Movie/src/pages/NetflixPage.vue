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
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import { ref } from "vue";
import { ElPagination } from "element-plus";
const cardsNumPerPage = ref(30);
</script>
<style scoped>
.netflixPageContainer {
  position: relative;
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

.pagination {
  padding-left: 350px;
  margin-top: 30px;
}
</style>
