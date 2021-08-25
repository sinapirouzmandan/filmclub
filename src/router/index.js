import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PullToRefresh from 'pulltorefreshjs';

Vue.use(VueRouter)
let token = localStorage.getItem('token') === null || localStorage.getItem('token') === 'null'
let botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
let re = new RegExp(botPattern, 'i');
let userAgent = navigator.userAgent;
if (re.test(userAgent)) {
    token= false
}
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
        path: '/userFollowings',
        name: 'Userfollowing',
        component: () => import(/* webpackPrefetch: true */ "../views/userFollowView")
    },
    {
        path: '/userFollowers',
        name: 'UserFollowers',
        component: () => import(/* webpackPrefetch: true */ "../views/userFollowView")
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
        path: '/likes/:postID',
        name: 'likes',
        component: () => import(/* webpackPrefetch: true */ "../views/likes"),
    },
    {
        path: "*",
        component: () => import(/* webpackPrefetch: true */ '../views/notFound')
    }
]

const router = new VueRouter({
    routes,
    mode: "history",
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
    if ((to.name !== 'login' && to.name !== 'signin') && token && !re.test(userAgent)) next({name: 'login'})
    else if ((to.name === 'login') && !token) {
        next({name: 'Home'})
    } else if ((to.name === 'signin') && !token) {
        next({name: 'Home'})
    } else next()
})
export default router
