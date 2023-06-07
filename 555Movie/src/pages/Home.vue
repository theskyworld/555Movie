<template>
  <div id="homeContainer">
    <div class="homeContent">
      <div class="slideShow">
        <!-- <SlideShow></SlideShow> -->
      </div>
      <div class="weekly">
        <Weekly></Weekly>
      </div>
      <div class="bestInMonth">
        <BestInMonth></BestInMonth>
      </div>
      <div class="bestInWeek">
        <BestInWeek></BestInWeek>
      </div>
      <div class="netfilx">
        <Netflix></Netflix>
      </div>
      <div class="hotEurAndAmer">
        <HotEurAndAmer></HotEurAndAmer>
      </div>
      <div class="hotJapanAndKore">
        <HotJapanAndKore></HotJapanAndKore>
      </div>
      <div class="hotHongAndTai">
        <HotHongAndTai></HotHongAndTai>
      </div>
      <div class="hotTvs">
        <HotTvs></HotTvs>
      </div>
      <div class="hotComics">
        <HotComics></HotComics>
      </div>
      <div class="hotTvShows">
        <HotTvShows></HotTvShows>
      </div>
    </div>
  </div>
</template>

<script setup>
import SlideShow from "../components/slideShow.vue";
import ListCard from "../components/ListCard.vue";
import Weekly from "../components/Weekly.vue";
import BestInMonth from "../components/BestInMonth.vue";
import BestInWeek from "../components/BestInWeek.vue";
import Netflix from "../components/Netflix.vue";
import HotEurAndAmer from "../components/HotEurAndAmer.vue";
import HotJapanAndKore from "../components/HotJapanAndKore.vue";
import HotHongAndTai from "../components/HotHongAndTai.vue";
import HotTvs from "../components/HotTvs.vue";
import HotComics from "../components/HotComics.vue";
import HotTvShows from "../components/HotTvShows.vue";
</script>

<style scoped>
.weekly {
  margin-top: 430px;
}

.bestInMonth {
  margin-top: 50px;
}
.bestInWeek {
  margin-top: 50px;
}

.netfilx {
  margin-top: 50px;
}

.hotEurAndAmer {
  margin-top: 50px;
}

.hotJapanAndKore {
  margin-top: 50px;
}

.hotHongAndTai {
  margin-top: 50px;
}

.hotTvs {
  margin-top: 50px;
}

.hotComics {
  margin-top: 50px;
}

.hotTvShows {
  margin-top: 50px;
}
</style>
