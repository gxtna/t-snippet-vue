import {createRouter, createWebHistory} from 'vue-router'
import home from '@/views/home.vue'
import callback from '@/views/callback.vue'
import edit from '@/views/content/edit.vue'
import detail from '@/views/content/detail.vue'

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/callback',
        component: callback
    },
    {
        path: '/edit',
        component: edit
    },
    {
        path: '/detail',
        component: detail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router