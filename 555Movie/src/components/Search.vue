<template>
  <div id="searchContainer">
    <div class="inputWrapper">
      <input ref="inputElem" type="text" :placeholder="placeholderValue" />
      <div class="inputIcon" ref="inputIconElem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import useMainStore from "../store";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";

const inputElem = ref();
const inputIconElem = ref();
let wdv = ref("");
onMounted(() => {
  inputIconElem.value.addEventListener("click", () => {
    wdv.value = inputElem.value.value;

    axios({
      // url: "apis.php",
      method: "get",
      baseURL: "/apis.php",
      params: {
        out: "jsonp",
        wd: wdv.value,
        cb: "jQuery182023040031454501975_1686140616505",
        _: "1686141636030",
      },
      timeout: 5000,
    })
      .then((res) => {
        console.log(JSON.parse(res));
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
const { placeholderValue } = storeToRefs(useMainStore());
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
