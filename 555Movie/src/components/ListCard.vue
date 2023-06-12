<template>
  <div id="listCardContainer" class="listCardContainer">
    <div class="mainContent">
      <div class="doubanScore">
        <span>豆瓣 : {{ doubanScore }}</span>
      </div>
      <div class="new">
        <span>new</span>
      </div>
      <div class="poster">
        <div class="imgContainer">
          <img :src="props.pic" :alt="props.title" />
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        <span>{{ props.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from "../store";
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';


const props = defineProps(['url', 'pic', 'title']);
// console.log("🚀 ~ file: ListCard.vue:31 ~ props:", props)
const mainStore = useMainStore();

const { doubanScore } = storeToRefs(mainStore);
</script>

<style scoped>
.listCardContainer {
  margin-right: 5px;
}
.mainContent {
  position: relative;
  box-sizing: content-box;
  width: calc(270px * 0.6);
  height: calc(381px * 0.6);
  border-radius: 0.5em;
}

.mainContent:hover {
  box-shadow: 0 0 20px 0 rgb(130, 205, 232);
  filter: brightness(1) saturate(110%);
}

.doubanScore {
  position: absolute;
  left: 5px;
  top: 5px;
  background-color: #41ac52;
  color: var(--color--light--);
  font-size: 0.5em;
  z-index: 2;
}
.imgContainer {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.5em;
  overflow: clip;
  width: calc(270px * 0.6);
  height: calc(381px * 0.6);
}

img {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.5em;
  overflow: clip;
  width: calc(270px * 0.6);
  height: calc(381px * 0.6);
}

.imgContainer:hover,
img:hover {
  transition-duration: 300ms;
  transform: scale(1.003);
}
.new {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #f96518;
  color: var(--color--light--);
  border-radius: 3px;
  z-index: 2;
  font-size: 0.5em;
}
.title {
  margin-top: 10px;
  width: calc(270px * 0.6);
  text-align: center;
  color: var(--color--light--);
}
.title:hover {
  color: var(--hover--color--);
}
</style>
