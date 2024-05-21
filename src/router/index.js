import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import newDashboard from '../views/newDashboard.vue'
import { isAuthenticated } from '../authentication/Authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: newDashboard,
      beforeEnter: isAuthenticated,
    },
  ]
})

export default router
