import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "element-plus/dist/index.css";
import router from "./router";

// 阿里巴巴图标
import("//at.alicdn.com/t/c/font_4106328_u8mgboojxdi.js");

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount("#app");

