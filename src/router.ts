import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import DirectPlay from './views/DirectPlay.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/play/:language',
            name: 'direct-play',
            component: DirectPlay,
            props: true,
        }
    ],
})

export default router
