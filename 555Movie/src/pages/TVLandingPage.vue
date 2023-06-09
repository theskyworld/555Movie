<template>
  <div class="tvLandingPageContainer">
    <div class="content">
      <div class="top10">
        <div class="header">
          <h3>Top 10</h3>
        </div>
        <div class="listCards">
          <ul>
            <li v-for="card in cardsNum.top10">
              <ListCard></ListCard>
            </li>
          </ul>
        </div>
      </div>
      <div class="newtv">
        <div class="header">
          <h3>新片上线</h3>
          <span class="more">更多></span>
        </div>
        <div class="listCards">
          <ul>
            <li v-for="card in cardsNum.newtv">
              <ListCard></ListCard>
            </li>
          </ul>
        </div>
      </div>
      <div class="topList">
        <div class="header">
          <h3>排行榜</h3>
          <div class="listTitle">
            <ul>
              <li v-for="title in listTitles" v-key="title.key">
                <span>{{ title.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="listCards">
          <ul>
            <li v-for="card in cardsNum.topList">
              <ListCard></ListCard>
            </li>
          </ul>
        </div>
      </div>
      <div class="latestUpdate">
        <div class="header">
          <h3>最近更新</h3>
          <span class="more">更多></span>
        </div>
        <div class="listCards">
          <ul>
            <li v-for="card in cardsNum.latestUpdate">
              <ListCard></ListCard>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ListCard from "../components/ListCard.vue";
import useMainStore from '../store';
import { storeToRefs } from 'pinia';
import { ElPagination } from "element-plus";

const { tvLandingPageCardsNum : cardsNum, tvLandingPageListTitles : listTitles } = storeToRefs(useMainStore());
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.content .header {
  transform: translate(20px, 0);
  position: relative;
  width: 100%;
}

h3 {
  color: var(--color--light--);
}

.content .header .more {
  color: var(--color--light--);
  font-size: 0.8em;
  cursor: pointer;
  position: absolute;
  right: 100px;
  top: 5px;
}

.content .header .more:hover {
  color: var(--hover--color--);
}
.content .listCards {
  transform: translate(-35px, 0);
}

li {
  display: inline-block;
  margin: 5px;
}

.topList .header {
  position: relative;
}
.listTitle {
  position: absolute;
  box-sizing: content-box;
  right: 30px;
  top: -10px;
  font-size: 0.8em;
}

.listTitle ul {
  margin-right: 50px;
}

.listTitle ul li {
  display: inline-block;
  color: var(--color--light--);
  margin: 0 10px;
}

.listTitle ul li:hover {
  color: var(--hover--color--);
  cursor: pointer;
}
</style>
