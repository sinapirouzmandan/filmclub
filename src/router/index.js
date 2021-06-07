import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bookmark from "../views/Bookmark";
import search from "../views/search";
import login from "../views/login";
import NewPost from "../views/NewPost";
import postDetail from "../components/NewPost/postDetail";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>  import('../views/profile')
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
    component: login
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

export default router
