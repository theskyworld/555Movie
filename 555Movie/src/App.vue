<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
import HomeHeader from "./components/HomeHeader.vue";
import NetflixPage from "./pages/NetflixPage.vue";
import Home from "./pages/Home.vue";
import MoviePage from "./pages/MoviePage.vue";
import MovieLibraryPage from "./pages/MovieLibraryPage.vue";
import TVPage from "./pages/TVPage.vue";
import TVLibraryPage from "./pages/TVLibraryPage.vue";
import ComicPage from "./pages/ComicPage.vue";
import ComicLibraryPage from "./pages/ComicLibraryPage.vue";
import TvShowPage from "./pages/TvShowPage.vue";
import TvShowLibraryPage from "./pages/TvShowLibraryPage.vue";
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
        <div class="netflix">
          <Home></Home>
          <!-- <NetflixPage></NetflixPage> -->

          <!-- <MoviePage></MoviePage> -->
          <!-- <MovieLibraryPage></MovieLibraryPage> -->

          <!-- <TVPage></TVPage> -->
          <!-- <TVLibraryPage></TVLibraryPage> -->

          <!-- <ComicPage></ComicPage> -->
          <!-- <ComicLibraryPage></ComicLibraryPage> -->

          <!-- <TvShowPage></TvShowPage> -->
          <!-- <TvShowLibraryPage></TvShowLibraryPage> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appContainer {
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

.netflix {
  margin-top: 100px;
}
</style>
