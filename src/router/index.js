import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    home: 'home',
    component: Home
  },
  {
    path: '/login',
    home: 'login',
    component: Login
  },
  {
    path: '/register',
    home: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
