import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'querystring'
import router from "../router";
import swal from 'sweetalert'
import * as clientDB from './clientDB'

let botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
let re = new RegExp(botPattern, 'i');
let userAgent = navigator.userAgent;
if (re.test(userAgent)) {
    axios.interceptors.request.use(function (config) {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpib3QiLCJlbWFpbCI6ImJvdEBib3QuYm90IiwibmFtZSI6ImJvdCBhY2Nlc3MiLCJpYXQiOjE2Mjk0Nzk2OTl9.L2oNitBKRLt-vZkkSpHV1vVPZYpg3CA4pT7xYv5xlq4';
        config.headers.authorization = token;
        return config;
    });
}
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        baseURl: 'https://api.filmclub.top',
        splashScreenShow: true,
        //watchList
        watchListMoviesIDs: [],
        isWatchListLoaded: false,
        watchListMoviesList: [],
        //AddNewPost
        searchListMoviesList: [],
        endOrLoad: 'Loading content ...',
        showNavbar: true,
        alternativeAvatar: require('../assets/avatar.jpg'),
        alternativeHeader: require('../assets/header.jpg'),
        token: null,
        // user it self
        userInfo: [],
        isMailAvailable: false,
        isUserNameAvailable: false,
        errMassage: null,
        userProfile: '',
        version: 0,
        isProfileLoaded: false,
        notifications: [],
        statitics: {
            followers: 0,
            followings: 0,
            posts: 0
        },
        myPosts: [],
        isPostsLoaded: false,
        //BOX Office
        boxOfficeList: {
            movies: [],
            series: []
        },
        // other users
        usernameInfo: [],
        searchedUsers: [],
        followStatus: null,
        userFollowers: null,
        userFollowings: null,
        // followers and followings
        followers: [],
        followings: [],
        userPosts: [],
        //single post
        singlePost: [],
        // home posts
        homePosts: [],
        homeHasNextPage: true,
        homeHasPrevPage: true,
        savedPos: false,
        homePageNumber: 0,
        homeReversePageNumber: 1,
        homeReversePageDate: null,
        lastDateFromServer: '',
        //comments
        postComments: [],
        hasNextPage: false,
        usernameInfoFollow: [],
        //likers
        likers: []
    },
    getters: {
        /**
         * @param state
         * @returns {number of posts in watchlist}
         */
        watchListLengthCalc(state) {
            let len = Object.keys(state.watchListMoviesIDs).length
            return Number(len)
        },
        /**
         * @param state
         * @returns {number of notifications that user didn't see them yet}
         */
        notificatonsCalc(state) {
            let notifications = state.notifications.filter((item) => {
                return item.isSeen === false
            });
            let len = Object.keys(notifications).length
            if (Number(len) === 0) {
                return ''
            } else {
                return Number(len)
            }
        }
    },
    mutations: {
        toggleSplashScreen(state) {
            state.splashScreenShow = !state.splashScreenShow
        },
        fetchWatchListMovies(state, payload) {
            state.watchListMoviesList = payload;
        },
        toggleWatchListLoaded(state, payload) {
            this.state.isWatchListLoaded = payload
        },
        fetchSearchListMovies(state, payload) {
            state.searchListMoviesList = payload;
        },
        changeEndLoad(state, payload = '') {
            state.endOrLoad = payload
        },
        toggleNavbar(state, payload) {
            state.showNavbar = payload
        },
        // ---------------- login part
        /**
         * check if token is set and if it's not refresh the page and push to login page
         * @param state
         * @param payload
         */
        setToken(state, payload) {
            state.token = payload
            localStorage.setItem('token', payload)
            if (payload != null) {
                window.location.reload()
            }
        },
        setUserMail(state, user) {
            state.userInfo.email = user.email
            state.userInfo.name = user.name
        },
        setUserName(state, user) {
            state.userInfo.username = user.username
            state.userInfo.password = user.password
            state.userInfo.password_confirm = user.password
        },
        mailAvailability(state, payload) {
            state.isMailAvailable = payload
        },
        usernameAvailability(state, payload) {
            state.isUserName = payload
        },
        // ---------------- end of login part
        changeErrMsg(state, payload) {
            state.errMassage = payload
        },
        botLogin(state) {
            state.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpib3QiLCJlbWFpbCI6ImJvdEBib3QuYm90IiwibmFtZSI6ImJvdCBhY2Nlc3MiLCJpYXQiOjE2Mjk0Nzk2OTl9.L2oNitBKRLt-vZkkSpHV1vVPZYpg3CA4pT7xYv5xlq4'
        },
        // user, it self data fetch
        fetchProfile(state, payload) {
            state.userProfile = payload
        },
        toggleProfileLoaded(state, payload) {
            this.state.isProfileLoaded = payload
        },
        // end of self user
        // ---------------- Watch list
        loadImdbIds(state, payload) {
            state.watchListMoviesIDs = payload
        },
        removeWatchListPost(state, id) {
            state.watchListMoviesList = state.watchListMoviesList.filter((movie) =>
                movie.id !== id
            )
        },
        // ---------------- end of watch list
        getTokenFromLocal(state) {
            let botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
            let re = new RegExp(botPattern, 'i');
            let userAgent = navigator.userAgent;
            if (re.test(userAgent)) {
                state.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpib3QiLCJlbWFpbCI6ImJvdEBib3QuYm90IiwibmFtZSI6ImJvdCBhY2Nlc3MiLCJpYXQiOjE2Mjk0Nzk2OTl9.L2oNitBKRLt-vZkkSpHV1vVPZYpg3CA4pT7xYv5xlq4'
            } else if (state.token == null) {
                if (localStorage.getItem('token') !== null || localStorage.getItem('token') !== 'null') {
                    state.token = localStorage.getItem('token')
                }
            }
        },
        fetchBoxOffice(state, payload) {
            state.boxOfficeList.movies = payload.filter((item) => {
                return item['classify'] === 'movies'
            })
            state.boxOfficeList.series = payload.filter((item) => {
                return item['classify'] === 'series'
            })
        },
        // ---------------- other users data
        fetchUserInfo(state, payload) {
            state.usernameInfo = payload.user
        },
        fetchSearchUsers(state, payload) {
            state.searchedUsers = payload.users.map((user) => {
                user.biography = user.biography.slice(0, 45)
                return user
            })
        },
        fetchNotifications(state, payload) {
            let notifications = payload.notifications.map((item) => {
                item.id = Math.floor(Math.random() * 9999999999999)
                if (item.icon === 'normal') {
                    item.icon = 'mdi:bell-circle-outline'
                    item.color = 'white'
                } else if (item.icon === 'danger') {
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'red'
                } else if (item.icon === 'warn') {
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'orange'
                } else if (item.icon === 'success') {
                    item.icon = 'mdi:arrow-up-circle-outline'
                    item.color = 'green'
                }
                return item
            });
            state.notifications = notifications.sort((function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }))
            state.notifications = [...new Map(state.notifications.map(item => [item["commiter"] + item["message"], item])).values()]
        },
        fetchFollowers(state, payload) {
            state.followers = payload
        },
        fetchFollowings(state, payload) {
            state.followings = payload
        },
        fetchUserFollowers(state, payload) {
            state.userFollowers = payload
        },
        fetchUserFollowings(state, payload) {
            state.userFollowings = payload
        },
        // ---------------- List of posts, follower and following counters
        fetchStatitics(state, payload) {
            state.statitics.followings = payload.following
            state.statitics.followers = payload.followers
            state.statitics.posts = payload.posts
        },
        fetchMyPosts(state, payload) {
            state.isPostsLoaded = true
            state.myPosts = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        },
        toggleMyPostsLoaded(state, payload) {
            state.isPostsLoaded = payload
        },
        toggleHomeSavedPos(state, payload) {
            state.savedPos = payload
        },
        homePageNumberPlus(state) {
            state.homePageNumber += 1
        },
        homePageReverseNumberPlus(state) {
            state.homeReversePageNumber += 1
        },
        fetchHomePostsFromCache(state, payload) {
            state.homePosts.push(...payload)
        },
        updateCachePosts(state, payload) {
            // payload.forEach((post) =>{
            //     let index = state.homePosts.findIndex((homePost) => homePost.id === post.id)
            //     console.log("index" + index)
            //     state.homePosts[index]['likes'] = post.likes
            //     state.homePosts[index]['comments'] = post.comments
            //     state.homePosts[index]['isLiked'] = post.isLiked
            // })
            state.homePosts.forEach((post) => {
                let index = payload.findIndex((payloadPost) => payloadPost.id === post.id)
                post.likes = payload[index]['likes']
                post.comments = payload[index]['comments']
                post.isLiked = payload[index]['isLiked']
            })
        },
        fetchUserPosts(state, payload) {
            state.userPosts = []
            state.userPosts = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        },
        fetchSinglePost(state, payload) {
            payload.post.body = JSON.parse(payload.post.body)
            payload.post.username = payload.username
            payload.post.avatar = payload.avatar
            payload.post.likes = payload.likes
            payload.post.comments = payload.comments
            payload.post.isLiked = payload.isLiked
            state.singlePost = payload.post
        },
        fetchHomePosts(state, payload) {
            // ---------------- sort new packet consist of 10 posts based on date
            payload = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
            // ---------------- Check each post if  it needs a ^full post^ button
            payload.forEach((post) => {
                let paragraph = ''
                let paragraphIsSet = false
                let needFullPost = false
                let hasImageOrHeader = false
                let allTxtLen = 0
                let generalText = ''
                post.body = JSON.parse(post.body)
                post.body.forEach((body) => {
                    if (body.type === 'paragraph') {
                        if (!paragraphIsSet) {
                            paragraph = body.data.text
                            paragraphIsSet = true
                            allTxtLen += body.data.text.length
                            generalText += "\n" + body.data.text
                        } else {
                            needFullPost = true
                            allTxtLen += body.data.text.length
                            generalText += "\n" + body.data.text
                        }
                    } else if (body.type === 'header' || body.type === 'image') {
                        needFullPost = true
                        hasImageOrHeader = true
                    }
                })
                if (allTxtLen < 300 && !hasImageOrHeader) {
                    needFullPost = false
                    paragraph = generalText
                } else if (needFullPost) {
                    paragraph += '...'
                }
                post.fullPostBtn = needFullPost
                post.body = paragraph
                post.truncated = true
                post.isWatchList = state.watchListMoviesIDs.includes(post.imdb_id)
            })
            state.homePosts.unshift(...payload)
            state.homePosts = [...new Map(state.homePosts.map(item => [item["id"], item])).values()]
        },
        fetchOlderHomePosts(state, payload) {
            // ---------------- sort new packet consist of 10 posts based on date
            payload = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
            // ---------------- Check each post if  it needs a ^full post^ button
            payload.forEach((post) => {
                let paragraph = ''
                let paragraphIsSet = false
                let needFullPost = false
                let hasImageOrHeader = false
                let allTxtLen = 0
                let generalText = ''
                post.body = JSON.parse(post.body)
                post.body.forEach((body) => {
                    if (body.type === 'paragraph') {
                        if (!paragraphIsSet) {
                            paragraph = body.data.text
                            paragraphIsSet = true
                            allTxtLen += body.data.text.length
                            generalText += "\n" + body.data.text
                        } else {
                            needFullPost = true
                            allTxtLen += body.data.text.length
                            generalText += "\n" + body.data.text
                        }
                    } else if (body.type === 'header' || body.type === 'image') {
                        needFullPost = true
                        hasImageOrHeader = true
                    }
                })
                if (allTxtLen < 300 && !hasImageOrHeader) {
                    needFullPost = false
                    paragraph = generalText
                } else if (needFullPost) {
                    paragraph += '...'
                }
                post.fullPostBtn = needFullPost
                post.body = paragraph
                post.truncated = true
                post.isWatchList = state.watchListMoviesIDs.includes(post.imdb_id)
            })
            state.homePosts.push(...payload)
            state.homePosts = [...new Map(state.homePosts.map(item => [item["id"], item])).values()]
        },
        fetchPostComments(state, payload) {
            payload.docs = payload.docs.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
            const now = new Date();
            state.hasNextPage = payload.hasNextPage
            payload.docs.forEach((comment) => {
                let commentDate = new Date(comment.createdAt);
                let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60 / 60 / 24)
                if (passed > 0) {
                    comment.date = passed + ' days'
                } else {
                    passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60 / 60)
                    if (passed > 0) {
                        comment.date = passed + ' hours'
                    } else {
                        passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60)
                        if (passed > 0) {
                            comment.date = passed + ' minutes'
                        } else {
                            passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000)
                            comment.date = passed + ' seconds'
                        }
                    }
                }
                comment.child = []
                state.postComments.push(comment)
                state.postComments = [...new Map(state.postComments.map(item => [item["_id"], item])).values()]
            })
        },
        removeDeletedPostFromHome(state, postID) {
            state.homePosts = state.homePosts.filter(post => post.id !== postID)
            clientDB.putHomePosts(state.homePosts).catch(() => {
                console.log("can't access local DB")
            })
        },
        changeUserFollowerPage(state, route) {
            state.usernameInfoFollow = state.usernameInfo
            router.push(route)
        }
    },
    actions: {
        errorHandler({commit}, error) {
            if (!error.response) {
                commit('changeErrMsg', "can't connect to server, check your internet connection")
            } else if (typeof error.response.data.errors != 'undefined') {
                commit('changeErrMsg', error.response.data.errors['0']['msg'])
            } else if (typeof error.response.data != 'undefined') {
                commit('changeErrMsg', error.response.data.message)
            } else {
                commit('changeErrMsg', 'Some error occurred !')
            }
        },
        async getMoviesList({commit, state, dispatch}) {
            let errors = 0
            if (!(state.isWatchListLoaded)) {
                // ---------------- Firstly we send request to server to get imdb id of movies in watch list
                const optionsServer = {
                    method: 'GET',
                    url: `${state.baseURl}/watchlist/`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(optionsServer).then(function (response) {
                    commit('loadImdbIds', response.data.list)
                    if (response.data.list.length === 0) {
                        // ---------------- if watch list is empty we add godfather for ex
                        state.watchListMoviesIDs.push('tt0903747')
                    }
                }).catch(function (error) {
                    errors += 1
                    clientDB.getWatchList().then((result)=>{
                        state.watchListMoviesList = result
                    })
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    }
                    dispatch('errorHandler', error)
                });
                let watchListPosts = []
                let id = null
                // ---------------- for each imdb id we send a request to api of imdb-alt to get movie cast
                for (id in state.watchListMoviesIDs) {
                    const options = {
                        method: 'GET',
                        url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/' + state.watchListMoviesIDs[id],
                        headers: {
                            'x-rapidapi-key': '6bca954daemshef1d69288a7320cp192bb1jsnbc1d047ddea8',
                            'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
                        }
                    };
                    await axios.request(options).then(function (response) {
                        watchListPosts.push(response.data);
                        commit('toggleWatchListLoaded', true)
                    }).catch(function (error) {
                        errors += 1
                        if (!error.response) {
                            swal("Can't connect to server, check your internet connection")
                        }
                        dispatch('errorHandler', error)
                    });
                    if (errors === 0) {
                        await clientDB.putWatchList(watchListPosts)
                    }
                    else {
                        clientDB.getWatchList().then((result)=>{
                            state.watchListMoviesList = result
                        })
                    }
                    commit('fetchWatchListMovies', watchListPosts)
                }
                if (Object.keys(watchListPosts).length <= 0) {
                    commit('changeEndLoad', 'There is no movie in your watch list')
                } else {
                    commit('changeEndLoad')
                }
            }
        },
        async getSearchList({commit, dispatch}, search) {
            let searchListPosts = []
            /**
             * We use this api when adding new post to get the new post movie imdb id
             * and also we use this api for watch list new items
             * @type {{headers: {"x-rapidapi-key": string, "x-rapidapi-host": string}, method: string, params: {r: string, s, page: string}, url: string}}
             */
            const options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                params: {s: search, page: '1', r: 'json'},
                headers: {
                    'x-rapidapi-key': '6bca954daemshef1d69288a7320cp192bb1jsnbc1d047ddea8',
                    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
                }
            };

            await axios.request(options).then(function (response) {
                let res = response.data.Search
                res = res.filter((mov) => {
                    return mov.Poster !== "N/A"
                })
                searchListPosts.push(res)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
            commit('fetchSearchListMovies', searchListPosts)
            if (Object.keys(searchListPosts).length <= 0) {
                commit('changeEndLoad', 'Error loading, maybe the name is wrong')
            } else {
                commit('changeEndLoad')
            }
        },
        async signin({commit, state, dispatch}, user, type) {
            let token = null
            let options = null
            if (type === 1) {
                options = {
                    method: 'POST',
                    url: `${state.baseURl}/users/login`,
                    data: qs.stringify({email: user.userName.toLowerCase(), password: user.password, r: 'json'}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                };
            } else {
                options = {
                    method: 'POST',
                    url: `${state.baseURl}/users/login`,
                    data: qs.stringify({login: user.userName.toLowerCase(), password: user.password, r: 'json'}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                };
            }
            await axios.request(options).then(function (response) {
                token = response.data.token
                commit('changeErrMsg', 'Please wait to redirect')
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
            commit('setToken', token)
        },
        async signup({commit, state, dispatch}) {
            // ---------------- End point for new users
            let token = null
            const options = {
                method: 'POST',
                url: `${state.baseURl}/users/`,
                data: qs.stringify({
                    email: state.userInfo.email,
                    username: state.userInfo.username.toLowerCase(),
                    name: state.userInfo.name,
                    password: state.userInfo.password,
                    password_confirm: state.userInfo.password_confirm
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            await axios.request(options).then(function (response) {
                commit('setToken', null)
                token = response.data.token
                commit('changeErrMsg', 'Please wait to redirect ...')
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
            commit('setToken', token)
        },
        async checkMailAvailable({commit, state, dispatch}, user) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users//is_email_available/${user.email}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            await axios.request(options).then(function (response) {
                if (response.data.availability === true) {
                    commit('mailAvailability', true)
                    commit('setUserMail', user)
                } else if (response.data.availability === false) {
                    commit('changeErrMsg', response.data.message)
                    commit('mailAvailability', false)
                }
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async checkUserNameAvailable({commit, dispatch, state}, user) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users//is_username_available/${user.username}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            await axios.request(options).then(function (response) {
                if (response.data.availability === true) {
                    commit('usernameAvailability', true)
                    commit('setUserName', user)
                    dispatch('signup')
                } else if (response.data.availability === false) {
                    commit('changeErrMsg', response.data.message)
                    commit('usernameAvailability', false)
                }
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getUserProfile({commit, state, dispatch}) {
            /**
             * api for getting user, it self data
             * including :
             * username
             * avatar
             * biographi
             * email
             * etc
             * @type {boolean}
             */
            let NoErr = false
            if (!(state.isProfileLoaded)) {
                let userInf = []
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/users/me/`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(options).then(function (response) {
                    userInf = response.data
                    commit('toggleProfileLoaded', true)
                    NoErr = true
                    state.version += 1
                }).catch(function (error) {
                    clientDB.getUser().then((result) => {
                        state.userProfile = result
                    })
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    } else {
                        let botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
                        let re = new RegExp(botPattern, 'i');
                        let userAgent = navigator.userAgent;
                        if (re.test(userAgent)) {
                            dispatch('botLogin')
                        } else {
                            commit('setToken', null)
                            window.location.reload()
                        }
                    }
                });
                if (NoErr) {
                    await clientDB.putUserInfo(userInf)
                }
                commit('fetchProfile', userInf)
            }
        },
        async updateName({state, dispatch}, name) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/users/update/name`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data: qs.stringify({
                    name: name
                })
            };
            await axios.request(options).then(function () {
                // console.log(response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async updateBio({state, dispatch}, bio) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/users/update/bio`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data: qs.stringify({
                    bio: bio
                })
            };
            await axios.request(options).then(function () {
                // console.log(response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async toggleWatchListPost({state, commit, dispatch}, id) {
            /**
             * This  end point controls delete and add of items in watchlist
             * It gets an IMDB id and toggles it in DB
             * @type {boolean}
             */
            state.isWatchListLoaded = false
            const options = {
                method: 'POST',
                url: `${state.baseURl}/watchlist/`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data: qs.stringify({
                    imdb_id: id
                })
            };
            await axios.request(options).then(function (response) {
                if (response.data.message === 'Item removed successfully!') {
                    commit('removeWatchListPost', id)
                }
                commit('changeErrMsg', response.data.message)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async deleteUser({state, commit, dispatch}, del) {
            /**
             * This api controls two things,
             * ban account with reviewers and also self delete account
             * ( The authentication is being controlled by backend server )
             * if It's a reviewer, target and reason will be set to username/id
             * and reason will be asked to ban
             * i it's a normal user target and reason will be ^default^
             * @type {{headers: {authorization: string}, method: string, data: {reason, password, target}, url: string}}
             */
            const options = {
                method: 'DELETE',
                url: `${state.baseURl}/users/`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data: {
                    password: del.password,
                    target: del.target,
                    reason: del.reason
                }
            };
            await axios.request(options).then(function (response) {
                commit('changeErrMsg', response.data.message)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getBoxOfficeList({state, commit, dispatch}) {
            /**
             * Box office is in the search tab and will display trending
             * movies and series
             * @type {{method: string, url: string}}
             */
            const options = {
                method: 'GET',
                url: `${state.baseURl}/boxoffice`
            };
            await axios.request(options).then(function (response) {
                commit('fetchBoxOffice', response.data.Post)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getUserById({commit, state, dispatch}, user) {
            let userInfo = []
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/users/${user}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then(function (response) {
                userInfo = response.data

            }).catch(function (error) {
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                    router.push('/userNotFound')
                }
            });
            commit('fetchUserInfo', userInfo)
        },
        async toggleFollow({state, dispatch, commit}, user) {
            /**
             * Handle both follow and unfollow
             * @type {{headers: {authorization: string}, method: string, url: string}}
             */
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/follow/${user}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then(() => {
                commit('changeErrMsg', null)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async searchUsers({state, dispatch, commit}, username) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/users/searchUsers`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    username: username
                })
            };
            await axios.request(options).then((response) => {
                commit('fetchSearchUsers', response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getFollowStatus({state, dispatch}, username) {
            /**
             * When opening a new post or visiting a user page
             * It's obligatory to get the status
             * of following and change the text and style of follow btn
             * based on the response
             */
            if (state.token) {
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/users/checkFollow/${username}`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(options).then((response) => {
                    state.followStatus = response.data.isFollowed
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getNotificationList({state, dispatch, commit}) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/notifications`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then((response) => {
                commit('fetchNotifications', response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async updateProfilePhoto({state, dispatch, commit}, packet) {
            /**
             * This endpoint will handle header and profile image of user
             * @type {{headers: {authorization: string, "Content-Type": string}, method: string, data, url: string}}
             */
            const options = {
                method: 'PUT',
                data: packet.image,
                url: `${state.baseURl}/users/upload_${packet.location}`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            await axios.request(options).then(() => {
                commit('toggleProfileLoaded', false)
                dispatch('getUserProfile')
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async setNotificationsSeen({state, dispatch}) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/users/seenNotifications`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                }
            };
            await axios.request(options).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async createNewPost({state, dispatch}, post) {
            state.isPostsLoaded = false
            const options = {
                method: 'POST',
                data: post,
                url: `${state.baseURl}/posts/`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            await axios.request(options).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getFollowers({state, dispatch, commit}) {
            if (state.token) {
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/users/followers`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(options).then((response) => {
                    commit('fetchFollowers', response.data.followers)
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getFollowings({state, dispatch, commit}) {
            if (state.token) {
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/users/followings`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(options).then((response) => {
                    commit('fetchFollowings', response.data.followings)
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getUserFollowers({state, dispatch, commit}, userId) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/userfollowers/${userId}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then((response) => {
                commit('fetchUserFollowers', response.data.followers)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getUserFollowings({state, dispatch, commit}, userId) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/userfollowings/${userId}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then((response) => {
                commit('fetchUserFollowings', response.data.followings)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getCountsInProfile({state, dispatch, commit}) {
            /**
             * This is exactly like user statistic
             */
            if (state.token) {
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/users/userstatitic`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(options).then((response) => {
                    commit('fetchStatitics', response.data)
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getMyPosts({state, dispatch, commit}) {
            if (!(state.isPostsLoaded)) {
                if (state.token) {
                    const options = {
                        method: 'GET',
                        url: `${state.baseURl}/posts/me`,
                        headers: {
                            'authorization': `Bearer ${state.token}`
                        }
                    };
                    await axios.request(options).then((response) => {
                        commit('fetchMyPosts', response.data.posts)
                        clientDB.putUserPosts(response.data.posts)
                    }).catch(function (error) {
                        dispatch('errorHandler', error)
                        clientDB.getUserPosts().then((result) => {
                            state.myPosts = result
                        })
                    });
                }
            }
        },
        async getUserPosts({state, dispatch, commit}, username) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/posts/${username}`
            };
            await axios.request(options).then((response) => {
                commit('fetchUserPosts', response.data.posts)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getSinglePost({state, dispatch, commit}, id) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/single/${id}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then((response) => {
                commit('fetchSinglePost', response.data)
            }).catch(function (error) {
                if (error.response.status === 404) {
                    commit('removeDeletedPostFromHome', id)
                    router.push('/postNotFound')
                }
                dispatch('errorHandler', error)
            });
        },
        async toggleLike({state, dispatch}, post_id) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/posts/like`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data: {
                    post_id: post_id
                }
            };
            await axios.request(options).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getHomePosts({state, dispatch, commit}, homeObj) {
            let oneWeekAgo = ''
            if (!homeObj.date) {
                await dispatch('getDateFromServer')
                oneWeekAgo = state.lastDateFromServer
            } else {
                oneWeekAgo = '2021-07-09T15:19:28.750Z'
            }
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/home/${homeObj.page}/`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                params: {
                    first_date: homeObj.date ? homeObj.date : oneWeekAgo
                }
            };
            await axios.request(options).then((response) => {
                commit('fetchHomePosts', response.data.docs)
                state.homeHasNextPage = response.data.hasNextPage
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getOlderHomePosts({state, dispatch, commit}, homeObj) {
            if (!state.homeReversePageDate) {
                state.homeReversePageDate = homeObj.date
                console.log('change')
            }
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/home_asc/${state.homeReversePageNumber}/`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                params: {
                    first_date: state.homeReversePageDate
                }
            };
            if (state.homeHasPrevPage) {
                await axios.request(options).then((response) => {
                    commit('fetchOlderHomePosts', response.data.docs)
                    state.homeHasPrevPage = response.data.hasNextPage
                    commit('homePageReverseNumberPlus')
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async refreshCachePostsStatus({state, dispatch, commit}, postIDs) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/posts/refresh_cache`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                },
                data: {
                    posts: JSON.stringify(postIDs)
                }
            };
            await axios.request(options).then((response) => {
                commit('updateCachePosts', response.data.updates)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getPostComments({state, dispatch, commit}, getObj) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/comments/post/${getObj.postID}/${getObj.page}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            if (getObj.page === 1) {
                state.postComments = []
            }
            await axios.request(options).then((response) => {
                commit('fetchPostComments', response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async updatePost({state, dispatch}, updateObj) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/posts/edit`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    postID: updateObj.postID,
                    body: JSON.stringify(updateObj.body.blocks),
                    reason: updateObj.reason,
                    target: updateObj.target,
                    spoiler: updateObj.spoiler,
                    critic: updateObj.critic
                })
            };
            await axios.request(options).then(() => {
                // console.log(response.data.message)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async deleteAPost({state, dispatch, commit}, delObj) {
            const options = {
                method: 'DELETE',
                url: `${state.baseURl}/posts/delete`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    postID: delObj.postID,
                    reason: delObj.reason,
                    target: delObj.target,
                })
            };
            await axios.request(options).then((response) => {
                commit('changeErrMsg', response.data.message)
                state.isPostsLoaded = false
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async addNewComment({state, dispatch}, comment) {
            if (comment.parent) {
                let options = {
                    method: 'POST',
                    url: `${state.baseURl}/posts/comment`,
                    headers: {
                        'authorization': `Bearer ${state.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify({
                        comment: comment.text,
                        post_id: comment.postID,
                        parent: comment.parent
                    })
                };
                await axios.request(options).then((response) => {
                    state.postComments.forEach((item) => {
                        if (item._id === comment.upperParent) {
                            item.child.unshift({
                                _id: response.data.comment.id,
                                content: response.data.comment.content,
                                user: response.data.comment.user,
                                createdAt: new Date(),
                                specialID: comment.spacialID,
                                userId: {
                                    avatar: state.userProfile.avatar,
                                    username: state.userProfile.username
                                },
                                child: []
                            })
                        }
                    })
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            } else {
                let options = {
                    method: 'POST',
                    url: `${state.baseURl}/posts/comment`,
                    headers: {
                        'authorization': `Bearer ${state.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify({
                        comment: comment.text,
                        post_id: comment.postID,
                    })
                };
                await axios.request(options).then((response) => {
                    state.postComments.unshift({
                        _id: response.data.comment.id,
                        content: response.data.comment.content,
                        user: response.data.comment.user,
                        createdAt: new Date(),
                        specialID: comment.spacialID,
                        userId: {
                            avatar: state.userProfile.avatar
                        },
                        child: []
                    })
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getCommentsByParent({state, dispatch}, parent) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/comments/parent/${parent.parent}`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            };
            await axios.request(options).then((response) => {
                state.postComments.forEach((item) => {
                    if (item._id === parent.upperParent) {
                        response.data.comments.forEach((commentItem) => {
                            item.child.push(commentItem)
                        })
                    } else {
                        item.child.forEach((subComment) => {
                            if (subComment._id === parent.parent) {
                                response.data.comments.forEach((commentItem) => {
                                    item.child.push(commentItem)
                                })
                            }
                        })
                    }
                })
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async deleteAComment({state, dispatch}, id) {
            /**
             * Delete comment will be available for two groups
             * 1 -  reviewers can delete every single comment
             * 2 - Normal user can delete a comment only before he/she leaves the
             * comments page
             * @type {{headers: {authorization: string, "Content-Type": string}, method: string, data: string, url: string}}
             */
            const options = {
                method: 'DELETE',
                url: `${state.baseURl}/posts/comment/delete`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    commentID: id
                })
            };
            await axios.request(options).then(() => {
                // console.log(response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getLikersList({state, dispatch}, id) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/likes/users/${id}`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            await axios.request(options).then((response) => {
                state.likers = response.data.users
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async report({state, dispatch}, report) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/reports`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    reported_content_type: report.content_type,
                    refrence: report.refrence,
                    type: report.type
                })
            };
            await axios.request(options).then(() => {
                state.errMassage = null
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async subscribeToNajva({state, dispatch}, token) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/push/web`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    subscription: token,
                })
            };
            await axios.request(options).then(() => {
                localStorage.setItem('filmclub-najva', token)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async subscribeToNajvaApp({state, dispatch}, token) {
            if (token !== null && token !== 'null' && token !== '') {
                const options = {
                    method: 'POST',
                    url: `${state.baseURl}/push/app`,
                    headers: {
                        'authorization': `Bearer ${state.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify({
                        subscription: token,
                    })
                };
                await axios.request(options).then(() => {
                    localStorage.setItem('filmclub-najva', token)
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getDateFromServer({state}) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/lastDate`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            await axios.request(options).then((response) => {
                state.lastDateFromServer = response.data.date
            }).catch(function () {
                console.log('first time sign in')
                state.lastDateFromServer = '2021-07-09T15:19:28.750Z'
            });
        },
        async setDateFromServer({state}, date) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/users/lastDate`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    date: date
                })
            };
            await axios.request(options).catch(function () {
                console.log('COULD NOT ACCESS SERVER')
            });
        }
    },
    modules: {}
})
