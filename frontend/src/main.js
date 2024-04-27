import { createApp } from 'vue'
import App from './App.vue'
import "leaflet/dist/leaflet.css";

import {createRouter, createWebHistory} from 'vue-router'

import Map from "@/components/pages/Map.vue";
import landing from "@/components/pages/landing.vue";
import mitt from "mitt";
const routes = [
    { path: '/', component: landing },
    { path: '/map', component: Map },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


const app = createApp(App)
app.use(router)
app.mount('#app')
