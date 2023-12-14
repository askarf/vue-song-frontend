import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import Songs from "./components/Songs.vue";
import Artists from "./components/Artists.vue";

const routes = [
  { path: "/songs", component: Songs },
  { path: "/artists", component: Artists },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).use(router).mount("#app");
