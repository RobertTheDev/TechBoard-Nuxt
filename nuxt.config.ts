import componentsConfig from "./components.config";

export default defineNuxtConfig({
  components: componentsConfig,
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
});
