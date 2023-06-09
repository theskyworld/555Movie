<template>
  <div class="videoPlayingPageContainer">
    <div class="main">
      <div class="video">
        <video ref="videoElem" class="videoElem" controls></video>
      </div>
      <div class="videoInfo">
        <div class="mainInfo">
          <div class="top">
            <div class="title">
              <span>{{ videoInfos.name }}</span>
            </div>
            <div class="label">
              <span class="labelItem" v-for="value in videoInfos.labels">
                {{ value }}
              </span>
            </div>
            <div class="episodeControl">
              <span>选集播放</span>
              <span>线路一</span>
              <span>线路二</span>
              <span>线路三</span>
            </div>
          </div>
          <div class="episodes">
            <span v-for="i in videoInfos.numOfEpisode">
              {{ `第${i}集` }}
            </span>
          </div>
        </div>
        <div class="videoControl">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-paixu"></use>
            </svg>
            排序
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-baocuo-dianji"></use>
            </svg>
            报错
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
            分享
          </span>
        </div>
      </div>
    </div>
    <div class="relevantCommend">
      <div class="header">
        <h4>相关推荐</h4>
      </div>
      <div class="listCards">
        <div v-for="i in numOfListCards">
          <ListCard></ListCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import ListCard from "../components/ListCard.vue";
import { onMounted, ref } from "vue";
import { playM3u8 } from "../../m3u8Parser";
const { videoInfos, numOfListCards } = storeToRefs(useMainStore());

const videoElem = ref();
const m3u8Url = "https://v4.cdtlas.com/20220602/Y2v7PUvS/index.m3u8";

onMounted(() => {
  // playM3u8(m3u8Url, videoElem.value);
});
</script>
<style scoped>
.videoPlayingPageContainer {
  color: var(--color--light--);
  position: relative;
  top: -120px;
}
.main {
  display: flex;
  flex-direction: row;
}
.video {
  width: 75%;
  height: 460px;
  /* border: solid 1px red; */
  z-index: 2;
}

.videoElem {
  width: 100%;
  height: 100%;
}

.videoInfo {
  box-sizing: border-box;
  width: 25%;
  color: var(--color--light--);
  position: relative;
}

.videoInfo .title {
  font-size: 1.3em;
}

.videoInfo .title::before {
  content: "";
  display: inline-block;
  position: relative;
  top: 5px;
  right: 12px;
  width: 8px;
  height: 26px;
  border-radius: 3px;
  background-color: var(--hover--color--);
}

.mainInfo .top {
  background-color: #25252b;
  padding-top: 20px;
  padding-left: 8px;
  padding-bottom: 10px;
}

.mainInfo .label {
  margin-top: 10px;
}

.mainInfo .label span {
  display: inline-block;
  background-color: var(--label--color--);
  width: 3.5em;
  height: 1.5em;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 0.8em;
}

.top .episodeControl {
  margin-top: 30px;
  font-size: 0.9em;
}

.top .episodeControl span {
  margin-right: 10px;
}

.episodes {
  margin-top: 20px;
  margin-left: 5px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.episodes span {
  display: inline-block;
  background-color: var(--label--color--);
  width: 3.5em;
  height: 1.5em;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 0.8em;
  margin-top: 10px;
  cursor: pointer;
}

.episodes span:hover {
  color: var(--hover--color--);
}

.videoControl {
  width: 100%;
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.videoControl span {
  cursor: pointer;
}

.videoControl span:hover {
  color: var(--hover--color--);
}

.videoControl span:hover .icon {
  fill: var(--hover--color--);
}

.videoControl span:not(:last-child)::after {
  content: "";
  display: inline-block;
  height: 15px;
  width: 2px;
  background-color: var(--seperate--line--);
  margin-left: 30px;
}

.relevantCommend .header {
  font-size: 1.5em;
}

.listCards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
</style>
