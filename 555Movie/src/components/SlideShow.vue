<template>
  <swiper :navigation="true" :modules="modules" class="swiper" ref="swiperElem">
    <swiper-slide lazy="true">
      <img loading="lazy" src="../../public/imgs/1.jpg" alt="slide1" />
    </swiper-slide>
    <swiper-slide lazy="true">
      <img loading="lazy" src="../../public/imgs/2.jpg" alt="slide2" />
    </swiper-slide>
    <swiper-slide lazy="true">
      <img loading="lazy" src="../../public/imgs/3.jpg" alt="slide3" />
    </swiper-slide>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>
<script setup>
import("../assets/index-1.css");
import("../assets/index-1.js");
import { ref, onMounted } from "vue";
import { register } from "swiper/element/bundle";
import { Navigation } from "swiper";

register();

const modules = ref([Navigation]);
</script>
<style scoped>
.swiper {
  background-color: var(--bg--main);
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: var(--bg--main);

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
