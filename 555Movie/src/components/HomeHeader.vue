<template>
  <div class="homeHeaderContainer">
    <div class="homeHeaderContainer">
      <Search></Search>
    </div>
    <div class="personInfo">
      <PersonInfo></PersonInfo>
    </div>
  </div>
</template>
<script setup>
import Search from "./Search.vue";
import PersonInfo from "./PersonInfo.vue";
</script>
<style scoped>
.homeHeaderContainer {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-left: 5px;
  clear: both;
}

.personInfo {
  position: absolute;
  transform: translate(700px, 0);
  /* right: 35px; */
  top: 10px;
}
</style>
