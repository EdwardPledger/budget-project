import { createWebHistory, createRouter } from "vue-router"
import Budget from './components/Budget.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Budget
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router