<template>
  <div class="moviePageContainer">
    <div class="header">
      <router-link to="/movielanding">
        <span class="movieHomePage">
          <h2>电影首页</h2>
        </span>
      </router-link>
      <span class="seperate"></span>
      <router-link to="/movielibrary">
        <span class="movieLibrary">
          <h2>电影库</h2>
        </span>
      </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.moviePageContainer {
  position: relative;
  top: -100px;
}

.header {
  display: flex;
  flex-direction: row;
}

.header h2 {
  transform: translate(0, -35px);
}

.header span {
  margin-left: 10px;
}
.seperate {
  display: inline-block;
  height: 18px;
  border: solid 1px rgb(64, 63, 63);
  transform: translate(0, 15px);
}

h2 {
  color: var(--color--light--);
  cursor: pointer;
}

h2:hover {
  color: var(--hover--color--);
}

.content {
  display: flex;
  flex-direction: column;
  transform: translate(0, -50px);
}
</style>
