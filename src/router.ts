import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LearnerOverview from './views/LearnerOverview.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/overview',
            name: 'learnerOverview',
            component: LearnerOverview
        }
    ],
})

export default router
