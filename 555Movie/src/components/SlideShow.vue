<template>
  <div class="slideShowContainer">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :spaceBetween="50"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :navigation="{ clickable: true }"
      :modules="modules"
      :pagination="{
        dynamicBullets: true,
        clickable: true,
      }"
      :longSwipersMs="500"
      class="mySwiper"
      ref="mySwiperElem"
    >
      <swiper-slide lazy="true">
        <img
          loading="lazy"
          src="https://t1.szrtcpa.com/2023/05/27/26aad50622ce1.jpg"
          alt="slide1"
        />
      </swiper-slide>
      <swiper-slide lazy="true">
        <img
          loading="lazy"
          src="https://t1.szrtcpa.com/2023/05/28/27c31bf86e4e4.jpg"
          alt="slide2"
        />
      </swiper-slide>
      <swiper-slide lazy="true">
        <img
          loading="lazy"
          src="https://t1.szrtcpa.com/2023/04/28/6f3750d234edb.jpg"
          alt="slide3"
        />
      </swiper-slide>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next" ref="nextElem"></div>
    </swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";

const mainStore = useMainStore();
const { modules } = storeToRefs(mainStore);
</script>
<style scoped>
.slideShowContainer {
  position: relative;
  height: 360px;
  color: var(--color--light--);
  margin: 0;
  padding: 0;
  top: -100px;
  /* border: solid 1px green; */
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background-color: var(--color--light--);
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
