<template>
  <div id="bestInMonthContainer">
    <div class="bestInMonthWrapper">
      <div class="header">
        <h2>本月最佳电影</h2>
      </div>
      <div class="content">
        <ul>
          <li v-for="i in cardsNum">
            <ListCard> </ListCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ListCard from "../components/ListCard.vue";

const cardsNum = ref(6);
</script>
<style scoped>
.bestInMonthWrapper {
  width: 100%;
}

.header {
  position: relative;
  width: 100%;
}

.header h2 {
  color: var(--color--light--);
}

li {
  display: inline-block;
  color:  var(--color--light--);
  margin: 0 10px;
}

li:hover {
  color: var(--hover--color--);
  cursor: pointer;
}

.content {
  margin-left: -50px;
  margin-top: 35px;
}
</style>
