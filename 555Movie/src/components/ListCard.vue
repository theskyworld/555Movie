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
          <img :src="imgProps.src" :alt="imgProps.alt" />
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const imgProps = reactive({
  dataOriginal: "",
  alt: "",
  src: "https://t1.szrtcpa.com/upload/vod/20220314-24/bca38c18f708aef70cac8b65a0fd2849.jpg",
});

const doubanScore = ref(7.5);

const title = ref("偶然遇见的你");
</script>

<style scoped>
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
  color: #fff;
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
  color: #fff;
  border-radius: 3px;
  z-index: 2;
  font-size: 0.5em;
}
.title {
  margin-top: 10px;
  width: calc(270px * 0.6);
  text-align: center;
  color: #fff;
}
.title:hover {
  color: #f96518;
}
</style>
