import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import 'element-plus/dist/index.css';
import router from "./router";
// 阿里巴巴图标
import("//at.alicdn.com/t/c/font_4106328_u8mgboojxdi.js");


const uses = [router];

createApp(App).use(...uses).mount('#app')


