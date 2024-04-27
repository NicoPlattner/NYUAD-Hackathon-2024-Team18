import { createApp } from 'vue'
import App from './App.vue'
import "leaflet/dist/leaflet.css";

import { createMemoryHistory, createRouter } from 'vue-router'

import Map from "@/components/pages/Map.vue";

const routes = [
    { path: '/', component: Map },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})


const app = createApp(App)
app.use(router)
app.mount('#app')
