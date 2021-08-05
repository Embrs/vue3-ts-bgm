import { createApp } from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import Antd from "@/plugins/antd";
import i18n from "@/plugins/i18n";
import "@/plugins/loaclStorage";

const app = createApp(App);
app.use(i18n);
app.use(Antd).use(store).use(router).mount("#app");
