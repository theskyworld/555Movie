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
              <a href="">
                <svg class="icon" aria-hidden="true">
                  <use class="menuIcon" v-bind:xlink:href="menu.icon"></use>
                </svg>
                <span>{{ menu.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import("http://at.alicdn.com/t/c/font_4106328_md2bg42ghgq.js");
const sideBarMenus = ref([
  {
    key: "001",
    name: "首页",
    icon: "#icon-shouye",
  },
  {
    key: "002",
    name: "NetFlix",
    icon: "#icon-netflix-line",
  },
  {
    key: "003",
    name: "电影",
    icon: "#icon-movie",
  },
  {
    key: "004",
    name: "连续剧",
    icon: "#icon-dianshiju",
  },
  {
    key: "005",
    name: "动漫",
    icon: "#icon-dongman",
  },
  {
    key: "006",
    name: "综艺记录",
    icon: "#icon-zongyi",
  },
  {
    key: "007",
    name: "追剧周表",
    icon: "#icon-zhuizhuiju",
  },
  {
    key: "008",
    name: "今日更新",
    icon: "#icon-gengxin",
  },
  {
    key: "009",
    name: "专题列表",
    icon: "#icon-zhuanti",
  },
  {
    key: "010",
    name: "排行榜",
    icon: "#icon-paixing",
  },
  {
    key: "011",
    name: "留言求片",
    icon: "#icon-liuyan",
  },
  {
    key: "012",
    name: "APP",
    icon: "#icon-APP",
  },
]);
</script>
<style scoped>
.sideBarContainer {
  background-color: #16161a;
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
  color: #e1e3e5;
  font-size: 18px;
  margin: 15px 0;
}

.menusContent li:hover::after {
  position: absolute;
  left: 170px;
  content: "→";
  color: #f96518;
  animation: arrowLeftToRight 0.1s linear;
}

.menusContent li:hover span {
  color: #f96518;
}
.menusContent li:hover .icon {
  fill: #f96518;
}

.menusContent li a {
  text-decoration: none;
  color: #e1e3e5;
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
