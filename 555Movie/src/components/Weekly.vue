<template>
  <div id="weeklyContainer">
    <div class="weeklyWrapper">
      <div class="header">
        <h2>追剧周表</h2>
        <div class="weeks">
          <ul>
            <li v-for="week in weeks" v-key="week">
              <span>{{ week }}</span>
            </li>
          </ul>
        </div>
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
import useMainStore from "../store";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { weeklyCardsNum : cardsNum, weeks } = storeToRefs(mainStore);
</script>
<style scoped>     
.weeklyWrapper {
  width: 100%;
}

.header {
  position: relative;
  width: 100%;
}

.header h2 {
  color: var(--color--light--);
}

.weeks {
  position: absolute;
  box-sizing: content-box;
  right: 10px;
  top: -15px;
  background-color: var(--bg--part1--);
}

.weeks ul {
  margin-right: 50px;
}

li {
  display: inline-block;
  color: var(--color--light--);
  margin: 0 10px;
}

li:hover {
  color: var(--hover--color--);
  cursor: pointer;
}

li span:clicked {
  background-color: var(--active--backgroundColor--);
}

.content {
  width: calc(100% + 50px);
  margin-left: -50px;
  margin-top: 35px;
}
</style>
