<template>
  <div class="tvPageContainer">
    <div class="header">
      <span class="tvHomePage">
        <h2>连续剧首页</h2>
      </span>
      <span class="seperate"></span>
      <span class="tvLibrary">
        <h2>连续剧库</h2>
      </span>
    </div>
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
import { ref, reactive } from "vue";

const cardsNum = reactive({
  top10: 10,
  newtv: 12,
  topList: 12,
  latestUpdate: 12,
});

const listTitles = ref([
  {
    key: "1",
    title: "日榜",
  },
  {
    key: "2",
    title: "周榜",
  },
  {
    key: "3",
    title: "月榜",
  },
]);
</script>
<style scoped>
.tvPageContainer {
  position: relative;
  top: -100px;
}

.header {
  display: flex;
  flex-direction: row;
}

.header span {
  margin-left: 10px;
}
.seperate {
  display: inline-block;
  height: 18px;
  border: solid 1px rgb(64, 63, 63);
  transform: translate(5px, 27px);
}

h2,
h3 {
  color: var(--color--light--);
  cursor: pointer;
}

h2:hover,
h3:hover {
  color: var(--hover--color--);
}
.content {
  position: absolute;
  display: flex;
  flex-direction: column;
}

.content .header {
  transform: translate(20px, 0);
  position: relative;
  width: 100%;
}

.content .header .more {
  color: var(--color--light--);
  font-size: 0.8em;
  cursor: pointer;
  position: absolute;
  right: 130px;
  top: 25px;
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
  right: 50px;
  top: 5px;
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
