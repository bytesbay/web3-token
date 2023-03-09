import App from "./App.vue";
import { createApp } from 'vue';
import 'normalize.css';
import './styles.scss'

(window as any).$app = createApp(App)
  .mount("#app");