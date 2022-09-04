import { createWebHistory, createRouter } from "vue-router"
import Budget from './components/Budget.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Budget
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router