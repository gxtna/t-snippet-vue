import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
//import 'reset.css';
import 'element-plus/dist/index.css'
import router from '@/router/index'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { createPinia } from 'pinia'
let app  = createApp(App)
app.use(ElementPlus).use(router).use(MdEditor).use(createPinia()).mount('#app')