<template>
  <div id="searchContainer">
    <div class="inputWrapper">
      <input type="text" :placeholder="placeholderValue" />
      <div class="inputIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const values = ["1", "2", "3", "4"];
const placeholderValue = ref("偶然遇见的你");
</script>
<style scoped>
input {
  box-sizing: border-box;
  width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #25252b;
  padding: 10px;
  border: none;
  color: var(--color--light--);
}

.inputWrapper {
  width: 350px;
  position: relative;
}

input::placeholder {
  color: rgba(196, 193, 193, 0.3);
}

input:focus {
  outline: none;
  border: none;
}

.inputIcon {
  position: absolute;
  right: 10px;
  top: 7px;
  cursor: pointer;
}

.icon {
  fill: var(--color--light--);
}
</style>
