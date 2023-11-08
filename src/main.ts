import { createApp } from "vue";
import App from "./App.vue";
import { loading } from "./package/dirctive/loading";
import { wrapLoading } from "./package/dirctive/wrap-loading";

const app = createApp(App);
app.directive("loading", loading);
app.directive("wrap-loading", wrapLoading);
app.mount("#app");
