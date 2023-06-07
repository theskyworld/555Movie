<template>
  <div id="hotJapanAndKoreContainer">
    <div class="hotJapanAndKoreWrapper">
      <div class="header">
        <h2>每周热门日韩剧排行</h2>
        <div class="more">
          <span>更多></span>
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

const cardsNum = ref(6);
</script>
<style scoped>
.hotJapanAndKoreWrapper {
  width: 100%;
}

.header {
  position: relative;
  width: 100%;
}

.header h2 {
  color: #fff;
}

.more {
  position: absolute;
  box-sizing: content-box;
  right: 50px;
  top: 10px;
  background-color: var(--bg--part1--);
  color: #fff;
  cursor: pointer;
  font-size: 0.8em;
}

.more:hover {
  color: var(--hover--color--);
}

li {
  display: inline-block;
  color: #fff;
  margin: 0 10px;
}

.content {
  margin-left: -50px;
  margin-top: 35px;
}
</style>
