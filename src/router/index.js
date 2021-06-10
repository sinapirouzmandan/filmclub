import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bookmark from "../views/Bookmark";
import search from "../views/search";
import NewPost from "../views/NewPost";
import postDetail from "../components/NewPost/postDetail";
import profile from "../views/profile";
Vue.use(VueRouter)
let token = localStorage.getItem('token') === null || localStorage.getItem('token') === 'null'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component:profile
  },
  {
    path: '/MyList',
    name: 'MyList',
    component: Bookmark
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path:'/login',
    name: 'login',
    component: () =>  import('../views/login')
  },
  {
    path:'/NewPost',
    name: 'NewPost',
    component: NewPost
  },
  {
    path:'/NewPost/detail',
    name: 'postDetail',
    component: postDetail,
    props: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: () =>  import('../components/login/signin')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode:"hash",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  if ((to.name !== 'login' && to.name !== 'signin') && token) next({ name: 'login' })
      else if((to.name === 'login') && !token){ next({ name: 'Home' })}
  else if((to.name === 'signin') && !token){ next({ name: 'Home' })}
  else next()
})
export default router
