<template>
  <div class="personInfoContainer">
    <div class="watchHistory">
      <WatchHistory></WatchHistory>
    </div>
    <div class="personCenter">
      <PersonCenter></PersonCenter>
    </div>
  </div>
</template>
<script setup>
import WatchHistory from "./WatchHistory.vue";
import { ref, onMounted } from "vue";
import PersonCenter from "./PersonCenter.vue";
</script>
<style scoped>
.personInfoContainer {
  display: flex;
  flex-direction: row;
}

.watchHistory {
  width: 300px;
  transform: translate(130px, 0);
}

.personCenter {
  width: 100px;
  margin-left: 20px;
  transform: translate(80px, 0);
}
</style>
