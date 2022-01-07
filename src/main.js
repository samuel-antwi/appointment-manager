import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './index.css'

library.add(fas)

const app = createApp(App)

app.component('fa', FontAwesomeIcon).use(router).use(createPinia()).mount('#app')
