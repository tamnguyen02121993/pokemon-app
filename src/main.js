import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./config";

// Styles
import "./assets/scss/style.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");
