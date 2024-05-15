import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SecuredView from '../views/SecuredView.vue'

const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/secured',
    name: 'Secured',
    component: SecuredView
    
  }

]

const router = createRouter({
  history: createWebHistory(),  
  routes
})

export default router
