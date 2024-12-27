import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import DirectPlay from './views/DirectPlay.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home,
        // },
        {
            path: '/',
            name: 'direct-play',
            component: DirectPlay,
        },
    ],
})

export default router
