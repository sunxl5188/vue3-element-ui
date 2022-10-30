import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "./assets/js/vant";

const app = createApp(App);

app.use(Vant).use(store).use(router).mount("#app");
