import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import FoundTicket from '../views/FoundTicket'
import Admin from '../views/Admin'
import Profile from '../views/Profile'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/foundTicket',
    name: 'foundTicket',
    component: FoundTicket
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      requireAuth: true
    },
    component: Profile
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireAuth: true
    },
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(store.state.offline)
  console.log(to.meta.requireAuth)
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (!store.state.offline) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})


export default router
