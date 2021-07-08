import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'querystring'
import router from "../router";
import swal from 'sweetalert'
import * as clientDB from './clientDB'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        baseURl: 'http://filmclub.ap-1.evennode.com',
        splashScreenShow: true,
        //watchList
        watchListMoviesIDs: [],
        watchListMoviesList: [],
        isWatchListLoaded: false,
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
        // followers and followings
        followers:[],
        followings: [],
        userPosts: [],
        //single post
        singlePost: [],
        // home posts
        homePosts: [],
        homeHasNextPage: true,
        savedPos: false,
        homePageNumber: 0,
        //comments
        postComments: [],
        hasNextPage: false,
    },
    getters: {
        watchListLengthCalc(state) {
            let len = Object.keys(state.watchListMoviesIDs).length
            return Number(len)
        },
        notificatonsCalc(state) {
            let notifications = state.notifications.filter((item) => {
                return item.isSeen == false
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
        setToken(state, payload) {
            state.token = payload
            localStorage.setItem('token', payload)
            if (payload != null) {
                router.go()
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
        changeErrMsg(state, payload) {
            state.errMassage = payload
        },
        fetchProfile(state, payload) {
            state.userProfile = payload
        },
        toggleProfileLoaded(state, payload) {
            this.state.isProfileLoaded = payload
        },
        loadImdbIds(state, payload) {
            state.watchListMoviesIDs = payload
        },
        removeWatchListPost(state, id) {
            const watch = state.watchListMoviesList.filter((movie) =>
                movie.id !== id
            )
            state.watchListMoviesList = watch
        },
        getTokenFromLocal(state) {
            if (state.token == null) {
                if (localStorage.getItem('token') !== null || localStorage.getItem('token') !== 'null') {
                    state.token = localStorage.getItem('token')
                }
            }
        },
        fetchBoxOffice(state, payload) {
            state.boxOfficeList.movies = payload.filter((item) => {
                return item['classify'] == 'movies'
            })
            state.boxOfficeList.series = payload.filter((item) => {
                return item['classify'] == 'series'
            })
        },
        fetchUserInfo(state, payload) {
            state.usernameInfo = payload.user
        },
        fetchSearchUsers(state, payload) {
            let users = payload.users.map((user) => {
                user.biography = user.biography.slice(0, 45)
                return user
            })
            state.searchedUsers = users
        },
        fetchNotifications(state, payload) {
            let notifications = payload.notifications.map((item) => {
                item.id = Math.floor(Math.random() * 9999999999999)
                if (item.icon == 'normal') {
                    item.icon = 'mdi:bell-circle-outline'
                    item.color = 'white'
                } else if (item.icon == 'danger') {
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'red'
                } else if (item.icon == 'warn') {
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'orange'
                } else if (item.icon == 'success') {
                    item.icon = 'mdi:arrow-up-circle-outline'
                    item.color = 'green'
                }
                return item
            });
            state.notifications = notifications.sort((function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }))
        },
        fetchFollowers(state,payload) {
            state.followers = payload
        },
        fetchFollowings (state,payload) {
            state.followings = payload
        },
        fetchStatitics (state,payload) {
            state.statitics.followings = payload.following
            state.statitics.followers = payload.followers
            state.statitics.posts = payload.posts
        },
        fetchMyPosts (state,payload) {
            state.isPostsLoaded = true
                state.myPosts = payload.sort((function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }))
        },
        toggleMyPostsLoaded (state,payload) {
            state.isPostsLoaded = payload
        },
        toggleHomeSavedPos (state,payload) {
            state.savedPos = payload
        },
        homePageNumberPlus(state){
            state.homePageNumber += 1
        },
        fetchHomePostsFromCache (state,payload) {
            state.homePosts.push(...payload)
        },
        fetchUserPosts (state,payload) {
            state.userPosts = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        },
        fetchSinglePost (state,payload) {
            payload.post.body = JSON.parse(payload.post.body)
            payload.post.username = payload.username
            payload.post.avatar = payload.avatar
            payload.post.likes = payload.likes
            payload.post.comments = payload.comments
            payload.post.isLiked = payload.isLiked
            state.singlePost = payload.post
        },
        fetchHomePosts (state,payload) {
            payload = payload.sort((function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
            var now = new Date()
            payload.forEach((post)=>{
                let paragraph = ''
                let paragraphIsSet = false
                let needFullPost = false
                post.body = JSON.parse(post.body)
                post.body.forEach((body)=>{
                    if (body.type === 'paragraph') {
                        if (!paragraphIsSet) {
                            paragraph = body.data.text
                            paragraphIsSet = true
                        }
                        else {
                            needFullPost = true
                        }
                    }
                    else if (body.type === 'header' || body.type === 'image'){
                        needFullPost = true
                    }
                })
                // eslint-disable-next-line no-unused-vars
                var postDate = new Date(post.createdAt)
                var Difference_In_Time = Math.floor((now.getTime() - postDate.getTime()));
                if (Math.floor(Difference_In_Time / 1000 / 60 / 60 / 24) > 0) {
                    Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 / 60 / 24) + ' days ago'
                }
                else if(Math.floor(Difference_In_Time / 1000 / 60 / 60) > 0) {
                    Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 / 60) + ' hours ago'
                }
                else {
                    Difference_In_Time = Math.floor(Difference_In_Time / 1000 / 60 ) + ' minutes ago'
                }
                post.past = Difference_In_Time
                post.fullPostBtn = needFullPost
                post.body = paragraph
                post.truncated = true
                post.isWatchList = state.watchListMoviesIDs.includes(post.imdb_id)
            })
            state.homePosts.unshift(...payload)
            state.homePosts = [...new Map(state.homePosts.map(item => [item["id"], item])).values()]
        },
        fetchPostComments (state,payload) {
            const now = new Date();
            state.hasNextPage = payload.hasNextPage
            payload.docs.forEach((comment)=>{
                let commentDate = new Date(comment.createdAt);
                let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60 / 60)
                if (passed > 0) {
                    comment.date = passed + ' hours'
                }
                else {
                    let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60)
                    comment.date = passed + ' minutes'
                }
                comment.child =[]
                state.postComments.push(comment)
            })
        },

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
                const optionsServer = {
                    method: 'GET',
                    url: `${state.baseURl}/watchlist/`,
                    headers: {
                        'authorization': `Bearer ${state.token}`
                    }
                };
                await axios.request(optionsServer).then(function (response) {
                    commit('loadImdbIds', response.data.list)
                    if (response.data.list.length == 0) {
                        commit('loadImdbIds', ['tt0068646'])
                    }
                }).catch(function (error) {
                    errors += 1
                    clientDB.getWatchList().then((result)=>{
                        console.log(result)
                        state.watchListMoviesList = result
                    })
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    }
                    dispatch('errorHandler', error)
                });
                let watchListPosts = []
                let id = null
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
                            console.log(result)
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
            if (type == 1) {
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
        async getUserProfile({commit, state}) {
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
                }).catch(function (error) {
                    clientDB.getUser().then((result)=>{
                        state.userProfile = result
                    })
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    } else {
                        commit('setToken', null)
                        router.go(0)
                    }
                });
                if (NoErr){
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
            await axios.request(options).then(function (response) {
                console.log(response.data)
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
            await axios.request(options).then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async toggleWatchListPost({state, commit, dispatch}, id) {
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
                if (response.data.message === 'Item removed successfully!'){
                    commit('removeWatchListPost', id)
                }
                commit('changeErrMsg', response.data.message)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async deleteUser({state, commit, dispatch}, del) {
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
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/follow/${user}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then(()=>{
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
        async createNewPost ({state, dispatch}, post) {
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
        async getCountsInProfile({state, dispatch, commit}) {
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
        async getMyPosts ({state, dispatch, commit}) {
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
                        clientDB.getUserPosts().then((result)=>{
                            state.myPosts = result
                        })
                    });
                }
            }
        },
        async getUserPosts ({state, dispatch, commit}, username) {
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
        async getSinglePost ({state, dispatch, commit}, id) {
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
                dispatch('errorHandler', error)
            });
        },
        async toggleLike ({state, dispatch}, post_id) {
            const options = {
                method: 'POST',
                url: `${state.baseURl}/posts/like`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                data:{
                    post_id: post_id
                }
            };
            await axios.request(options).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getHomePosts ({state, dispatch, commit}, homeObj) {
            const oneWeekAgo  = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/home/${homeObj.page}/`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                },
                params:{
                    first_date: homeObj.date ? homeObj.date : oneWeekAgo
                }
            };
            await axios.request(options).then((response)=>{
                commit('fetchHomePosts', response.data.docs)
                state.homeHasNextPage = response.data.hasNextPage
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async getPostComments ({state, dispatch, commit}, getObj) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/comments/post/${getObj.postID}/${getObj.page}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).then((response)=>{
                state.postComments = []
                commit('fetchPostComments', response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async updatePost ({state, dispatch},updateObj) {
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
                    target:updateObj.target,
                    spoiler: updateObj.spoiler,
                    critic: updateObj.critic
                })
            };
            await axios.request(options).then((response)=>{
                console.log(response.data.message)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async deleteAPost ({state, dispatch, commit},delObj) {
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
                    target:delObj.target,
                })
            };
            await axios.request(options).then((response)=>{
                commit('changeErrMsg', response.data.message)
                state.isPostsLoaded = false
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async addNewComment ({state, dispatch},comment) {
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
                await axios.request(options).then((response)=>{
                    state.postComments.forEach((item)=>{
                        if (item._id === comment.upperParent) {
                            item.child.unshift({
                                _id:  response.data.comment.id,
                                content: response.data.comment.content,
                                user:response.data.comment.user,
                                date: 0,
                                specialID: comment.spacialID,
                                userId:{
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
            }
            else {
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
                await axios.request(options).then((response)=>{
                    state.postComments.unshift({
                        _id:  response.data.comment.id,
                        content: response.data.comment.content,
                        user:response.data.comment.user,
                        date: 0,
                        specialID: comment.spacialID,
                        userId:{
                            avatar: state.userProfile.avatar
                        },
                        child: []
                    })
                }).catch(function (error) {
                    dispatch('errorHandler', error)
                });
            }
        },
        async getCommentsByParent ({state, dispatch},parent) {
            const now = new Date()
            const options = {
                method: 'GET',
                url: `${state.baseURl}/posts/comments/parent/${parent.parent}`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            };
            await axios.request(options).then((response)=>{
                state.postComments.forEach((item)=>{
                    if (item._id === parent.upperParent) {
                        response.data.comments.forEach((commentItem)=>{
                            let commentDate = new Date(commentItem.createdAt);
                            let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60 / 60)
                            if (passed > 0) {
                                commentItem.date = passed + ' hours'
                            }
                            else {
                                let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60)
                                commentItem.date = passed + ' minutes'
                            }
                            item.child.push(commentItem)
                        })
                    }
                    else {
                        item.child.forEach((subComment)=>{
                            if (subComment._id === parent.parent) {
                                response.data.comments.forEach((commentItem)=>{
                                    let commentDate = new Date(commentItem.createdAt);
                                    let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60 / 60)
                                    if (passed > 0) {
                                        commentItem.date = passed + ' hours'
                                    }
                                    else {
                                        let passed = Math.floor((now.getTime() - commentDate.getTime()) / 1000 / 60)
                                        commentItem.date = passed + ' minutes'
                                    }
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
        async deleteAComment ({state, dispatch},id) {
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
            await axios.request(options).then((response)=>{
                console.log(response.data)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
    },
    modules: {}
})
