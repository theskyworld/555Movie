<template>
  <div id="sideBarContainer" class="sideBarContainer">
    <div class="sideBarContent">
      <div class="logoWrapper">
        <h1>
          <div class="logo">
            <img src="../../public/555.png" alt="" />
          </div>
          <div class="logoTextContent">
            <div class="websiteName">
              <p>666电影</p>
            </div>
            <div class="websiteUrl">
              <p>666DY.com</p>
            </div>
          </div>
        </h1>
      </div>
      <div class="menusWrapper">
        <div class="menusContent">
          <ul>
            <li v-for="menu in sideBarMenus" v-key="menu.key">
              <router-link :to="menu.targetUrl">
                <svg class="icon" aria-hidden="true">
                  <use class="menuIcon" v-bind:xlink:href="menu.icon"></use>
                </svg>
                <span>{{ menu.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import useMainStore from "../store";
import { storeToRefs } from "pinia";

const { sideBarMenus } = storeToRefs(useMainStore());
</script>
<style scoped>
.sideBarContainer {
  background-color: var(--bg--part1--);
  height: 98vh;
  width: 200px;
  margin-left: -7px;
  /* margin-top: -7px; */
}

.sideBarContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logoWrapper {
  cursor: pointer;
}

.logoWrapper h1 {
  display: flex;
  flex-direction: row;
}

.logoTextContent {
  margin-top: -20px;
  margin-left: 5px;
}

.websiteName {
  color: #367586;
  font-size: 20px;
}

.websiteUrl {
  color: #8d5e0e;
  font-size: 12px;
  margin-top: -20px;
  margin-left: 5px;
}

.menusContent {
  position: relative;
  top: -20px;
  right: 25px;
}

.menusContent li {
  color: var(--color--light--);
  font-size: 18px;
  margin: 15px 0;
}

.menusContent li:hover::after {
  position: absolute;
  left: 170px;
  content: "→";
  color: var(--hover--color--);
  animation: arrowLeftToRight 0.1s linear;
}

.menusContent li:hover span {
  color: var(--hover--color--);
}
.menusContent li:hover .icon {
  fill: var(--hover--color--);
}

.menusContent li a {
  text-decoration: none;
  color: var(--color--light--);
}

.menusContent li span {
  margin-left: 15px;
}

@keyframes arrowLeftToRight {
  0% {
    left: 160px;
  }

  50% {
    left: 165px;
  }

  100% {
    left: 170px;
  }
}
</style>
