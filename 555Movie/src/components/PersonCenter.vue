<template>
  <div class="personCenterContainer">
    <div class="avatar" ref="avatarElem">
      <img src="../../public/imgs/1.jpg" alt="" />
    </div>
    <div class="info" v-if="isShowInfo">
      <div class="userCenter">
        <span class="infoIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gerenzhongxin"></use>
          </svg>
        </span>
        <span>个人中心</span>
      </div>
      <div class="userSetting">
        <span class="infoIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi"></use>
          </svg>
        </span>
        <span>账号设置</span>
      </div>
      <div class="userCollection">
        <span class="infoIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
        </span>
        <span>我的收藏</span>
      </div>
      <div class="userExit">
        <span class="infoIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuichu"></use>
          </svg>
        </span>
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import("//at.alicdn.com/t/c/font_4106328_4i3rbnyb9f2.js");
import { ref, onMounted } from "vue";

const isShowInfo = ref(false);
const avatarElem = ref();

onMounted(() => {
  avatarElem.value.addEventListener("mouseover", () => {
    isShowInfo.value = true;
  });
  avatarElem.value.addEventListener("mouseout", () => {
    isShowInfo.value = false;
  });
});
</script>
<style scoped>
.personCenterContainer {
  position: relative;
  top: -5px;
  right: 30px;
}
.avatar img {
  width: 45px;
  height: 45px;
  border-radius: 22px;
  cursor: pointer;
}

.info {
  box-sizing: border-box;
  width: 100px;
  height: 150px;
  background-color: var(--bg--part1--);
  position: absolute;
  left: -25px;
  color: #fff;
  padding: 15px;
  padding-top: 0;
  font-size: 0.8em;
}

.info div {
  margin-top: 10px;
  cursor: pointer;
}

.info div:hover {
  color: var(--hover--color--);
}

.info div:hover .infoIcon .icon {
  fill: var(--hover--color--);
}

.info div:last-child {
  margin-top: 30px;
}

.infoIcon {
  display: inline-block;
  margin-right: 5px;
  font-size: 1em;
}
</style>
