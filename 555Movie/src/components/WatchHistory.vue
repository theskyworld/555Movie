<template>
  <div class="watchHistoryContainer" ref="watchHistoryContainerElem">
    <div class="info">
      <span class="historyIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lishijilu_huaban"></use>
        </svg>
      </span>
      <span>观看历史</span>
    </div>
    <div class="contentCard" v-if="isShowHistory">
      <div class="header">
        <span class="historyIconInner">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lishijilu_huaban"></use>
          </svg>
        </span>
        <span>我的观看历史</span>
      </div>
      <div class="historyContent">
        <ul v-if="watchHistories.length !== 0">
          <li v-for="history in watchHistories">
            <span>{{ history.title }}</span>
          </li>
        </ul>
        <div class="empty" v-if="watchHistories.length === 0">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-empty"></use>
            </svg>
          </div>
          <span>暂无观看影片的记录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";
const watchHistoryContainerElem = ref();
const isShowHistory = ref(false);
const watchHistories = ref([
  {
    title: "偶然遇见的你",
  },
  {
    title: "偶然遇见的你",
  },
  {
    title: "偶然遇见的你",
  },
  {
    title: "偶然遇见的你",
  },
  {
    title: "偶然遇见的你",
  },
]);

onMounted(() => {
  watchHistoryContainerElem.value.addEventListener("mouseover", () => {
    isShowHistory.value = true;
  });
  watchHistoryContainerElem.value.addEventListener("mouseout", () => {
    isShowHistory.value = false;
  });
});
</script>
<style scoped>
.watchHistoryContainer {
  color: var(--color--light--);
  cursor: pointer;
  position: relative;
  height: auto;
}

.info {
  position: absolute;
  left: 100px;
}

.watchHistoryContainer .info:hover {
  color: var(--hover--color--);
}

.watchHistoryContainer .info:hover .historyIcon .icon {
  fill: var(--hover--color--);
}

.icon {
  font-size: 1em;
}

.contentCard {
  box-sizing: border-box;
  width: 300px;
  height: 200px;
  background-color: var(--bg--part1--);
  padding: 10px;
  padding-left: 20px;
  margin-top: 30px;
  float: left;
}

.contentCard .historyIconInner {
  margin-right: 5px;
}
.contentCard .header .icon {
  fill: var(--hover--color--);
}

.historyContent {
  position: relative;
  margin-top: 10px;
}

.historyContent ul {
  position: absolute;
  left: -30px;
}

li {
  margin-top: 5px;
}

.empty {
  box-sizing: border-box;
  padding: 10px;
  padding-left: 80px;
}

.empty .icon {
  font-size: 6em;
}

.empty span {
  font-size: 0.5em;
}
</style>
