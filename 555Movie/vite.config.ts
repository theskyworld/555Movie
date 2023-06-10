import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': join(__dirname, '/src'),
  //   }
  // },
  server: {
    proxy: {
      "/apis.php": {
        target: "http://jx.kuvun.cc",
        changeOrigin: true,
      },
    },
  },
});
