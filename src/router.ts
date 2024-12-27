import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LearnerOverview from './views/LearnerOverview.vue'
import CollectionPlay from './views/CollectionPlay.vue'
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
        {
            path: '/overview',
            name: 'learnerOverview',
            component: LearnerOverview
        },
        {
            path: '/collection/:id/play',
            component: CollectionPlay,
            name: 'collectionPlay',
            props: route => ({
                id: route.params.id
            })
        }
    ],
})

export default router
