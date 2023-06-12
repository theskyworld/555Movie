<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
import HomeHeader from "./components/HomeHeader.vue";
import VideoDetailPage from "./pages/VideoDetailPage.vue";
import SearchResultPage from "./pages/SearchResultPage.vue";
</script>

<template>
  <div id="appContainer" class="appContainer">
    <div class="side">
      <SideBar class="sideBar"></SideBar>
    </div>
    <div class="left">
      <div class="header">
        <HomeHeader></HomeHeader>
      </div>
      <div class="mainContent">
        <div class="routerView">
          <router-view></router-view>
          <!-- <VideoDetailPage></VideoDetailPage> -->
          <!-- <SearchResultPage></SearchResultPage> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appContainer {
  min-width: 880px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  margin-top: -7px;
  margin-right: 10px;
}

.side {
  width: 15vw;
}

.left {
  margin-left: 30px;
}

.header {
  position: fixed;
  z-index: 2;
  /* border: solid 1px green; */
  height: 65px;
  display: flex;
  align-items: center;
  width: 80%;
}

.mainContent {
  width: 80vw;
  height: 86vh;
  overflow: auto;
  margin-top: 80px;
  /* border: solid 1px red; */
}

.mainContent::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.routerView {
  margin-top: 100px;
}
</style>
