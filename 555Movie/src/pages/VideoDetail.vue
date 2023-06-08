<template>
  <div class="videoDetailContainer">
    <div class="videoInfo">
      <div class="videoName">
        <h4>{{ videoInfo.name }}</h4>
      </div>
      <div class="videoLabels">
        <span class="labelItem" v-for="label in videoInfo.labels">
          {{ label }}
        </span>
      </div>
      <div class="videoInfos">
        <div class="storySummary">
          <span>
            {{ videoInfo.storySummary }}
          </span>
        </div>
        <div class="videoPoster">
          <img
            src="https://t1.szrtcpa.com/2023/05/10/17c671d6e4db5.jpg"
            alt=""
          />
        </div>
        <div class="others">
          <div class="othersItem" v-for="(value, key) in videoInfo.others">
            <span class="title"> {{ `${ENToCNMapHelper[key]}:` }}</span>
            <span class="content"> {{ value }}</span>
          </div>
        </div>
        <div class="controllers">
          <span class="share">
            <button>分享</button>
          </span>
          <span class="collect">
            <button>收藏</button>
          </span>
        </div>
      </div>
    </div>
    <div class="play">
      <div class="title">
        <h5>选集播放</h5>
      </div>
      <div class="content">
        <span class="contentItems" v-for="i in numOfEpisodesRef">
          {{ `第${i}集` }}
        </span>
      </div>
    </div>
    <div class="relevantRecommend">
      <div class="title">
        <h5>相关推荐</h5>
      </div>
      <div class="content">
        <div v-for="i in numOfRelevantRecommend">
          <ListCard></ListCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref } from "vue";
import ListCard from "../components/ListCard.vue";

const ENToCNMapHelper = {
  director: "导演",
  writer: "编剧",
  stars: "主演",
  releaseDate: "上映",
  updateDate: "更新",
  numOfEpisodes: "集数",
  douban: "豆瓣",
};
const latestEpisode = "06";
const doubanScore = 7.5;
const videoInfo = reactive({
  name: "09届探员",
  labels: {
    year: "2023",
    area: "美国",
    // story: ["剧情", "惊悚", "犯罪", "欧美剧"],
  },
  storySummary:
    "故事讲述在近未来美国的司法系统已经被人工智能所改变，主角是一群FBI探员，这群在09年毕业的探员因为一名共同好友过世而重聚。整个故事会横跨30年，在三条时间线里谈及正义、人性及角色的选择将导致什么事情发生",
  others: {
    director: "汤姆·罗伯·史密斯",
    writer: "汤姆·罗伯·史密斯",
    stars: [
      "凯特·玛拉",
      "布莱恩·泰里·亨利",
      "布莱恩·J·史密斯",
      "罗莎琳德·以利亚撒",
      "塞皮德·莫阿菲",
    ],
    releaseDate: "2023-05-10(美国)",
    updateDate: "2023-06-08",
    numOfEpisodes: `更新至${latestEpisode}集`,
    douban: `${doubanScore}分`,
  },
});

const numOfEpisodesRef = ref(6);
const numOfRelevantRecommend = ref(8);
</script>
<style scoped>
.videoDetailContainer {
  width: 100%;
  color: var(--color--light--);
  position: relative;
}

.videoName {
  font-size: 2em;
}

.labelItem {
  display: inline-block;
  width: 3.5em;
  height: 1.5em;
  text-align: center;
  line-height: 1.5em;
  border-radius: 5px;
  background-color: var(--babel--color--);
  margin: 0 5px;
  cursor: pointer;
}

.videoInfos {
  width: 97%;
  box-sizing: border-box;
  background-color: var(--bg--part1--);
  margin-top: 35px;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.7em;
}

.storySummary {
  width: 70%;
}

.videoPoster {
  position: absolute;
  top: 0;
  right: 27px;
}

.videoPoster img {
  transform: scale(0.8);
}
.storySummary::after {
  display: block;
  content: "";
  margin-top: 15px;
  margin-bottom: 25px;
  height: 1px;
  background-color: var(--seperate--line--);
}

.othersItem span {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
}

.othersItem .title {
  font-size: 1em;
  font-weight: bolder;
}

.others::after {
  display: block;
  content: "";
  margin-top: 15px;
  margin-bottom: 25px;
  height: 1px;
  background-color: var(--seperate--line--);
}

.controllers span button {
  display: inline-block;
  width: 5em;
  height: 2em;
  border-radius: 5px;
  background-color: green;
  outline: none;
  border: none;
  margin-right: 20px;
  cursor: pointer;
  color: var(--color--light--);
}

.play .title {
  font-size: 1.7em;
}

.play .content {
  width: 97%;
  box-sizing: border-box;
  background-color: var(--bg--part1--);
  border-radius: 5px;
  position: relative;
  top: -20px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.play .content .contentItems {
  display: inline-block;
  background-color: var(--label--color--);
  width: 3.5em;
  height: 1.5em;
  border-radius: 5px;
  margin-left: 15px;
  text-align: center;
  font-size: 0.9em;
  cursor: pointer;
}

.play .content .contentItems:hover {
  color: var(--hover--color--);
}

.relevantRecommend .title {
  font-size: 1.7em;
}

.relevantRecommend .content {
  width: 97%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
