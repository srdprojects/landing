import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload';


const app = createApp(App)
app.use(router)
app.use(VueLazyLoad);
app.mount('#app')
