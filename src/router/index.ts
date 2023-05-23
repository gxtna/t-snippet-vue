import { createRouter ,createWebHistory} from 'vue-router'
import home from '@/views/home.vue'
import callback from '@/views/callback.vue'

const routes =[
    {
        path:'/',
        component:home
    },
    {
        path:'/callback',
        component:callback
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router