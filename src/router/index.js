import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PullToRefresh from 'pulltorefreshjs';

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
        component: () => import(/* webpackPrefetch: true */ '../views/profile')
    },
    {
        path: '/MyList',
        name: 'MyList',
        component: () => import(/* webpackPrefetch: true */ '../views/Bookmark')
    },
    {
        //lazy load search component
        path: '/search',
        name: 'search',
        component: () => import(/* webpackPrefetch: true */ '../views/search')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
    },
    {
        path: '/NewPost',
        name: 'NewPost',
        component: () => import(/* webpackPrefetch: true */ '../views/NewPost')
    },
    {
        path: '/NewPost/detail',
        name: 'postDetail',
        component: () => import(/* webpackPrefetch: true */ '../components/NewPost/postDetail'),
        props: true
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import('../components/login/signin')
    },
    {
        path: '/users/:user',
        name: 'users',
        component: () => import(/* webpackPrefetch: true */ '../views/userPage')
    },
    {
        path: '/Notifications',
        name: 'Notifications',
        component: () => import(/* webpackPrefetch: true */ "../views/Notifications")
    },
    {
        path: '/followers',
        name: 'follower',
        component: () => import(/* webpackPrefetch: true */ "../views/followView")
    },
    {
        path: '/followings',
        name: 'following',
        component: () => import(/* webpackPrefetch: true */ "../views/followView")
    },
    {
        path: '/post/:title/:id',
        name: 'single-post',
        component: () => import(/* webpackPrefetch: true */ "../views/singlePost")
    },
    {
        path: '/comments/:postID',
        name: 'comments',
        component: () => import(/* webpackPrefetch: true */ "../views/comments"),
    },
    {
        path: "*",
        component: () => import(/* webpackPrefetch: true */ '../views/notFound')
    }
]

const router = new VueRouter({
    routes,
    mode: "hash",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})
const originalPush = router.push
router.push = function push(location, onResolve, onReject)
{
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }

    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }

        return Promise.reject(err)
    })
}
router.beforeEach((to, from, next) => {
    PullToRefresh.destroyAll();
    if ((to.name !== 'login' && to.name !== 'signin') && token) next({name: 'login'})
    else if ((to.name === 'login') && !token) {
        next({name: 'Home'})
    } else if ((to.name === 'signin') && !token) {
        next({name: 'Home'})
    } else next()
})
export default router
