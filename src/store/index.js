import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'querystring'
import router from "../router";
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURl: 'http://192.168.1.35:3000',
        //watchList
        watchListMoviesIDs: [],
        watchListMoviesList: [],
        isWatchListLoaded: false,
        //AddNewPost
        searchListMoviesList: [],
        endOrLoad: 'Loading content ...',
        showNavbar: true,
        alternativeAvatar: 'http://192.168.1.35:3000' + '/public/images/avatar.jpg',
        alternativeHeader: 'http://192.168.1.35:3000' + '/public/images/header.jpg',
        token: null,
        // user it self
        userInfo: [],
        isMailAvailable: false,
        isUserNameAvailable: false,
        errMassage: null,
        userProfile: '',
        isProfileLoaded: false,
        notifications: [],
        //BOX Office
        isBoxOfficeLoaded: false,
        boxOfficeList: {
            movies: [],
            series: []
        },
        // other users
        usernameInfo: [],
        searchedUsers:  [],
        followStatus: null
    },
    getters: {
        watchListLengthCalc(state) {
            let len = Object.keys(state.watchListMoviesIDs).length
            return Number(len)
        },
        notificatonsCalc(state) {
            let notifications = state.notifications.filter((item)=>{
                return item.isSeen == false
            });
            let len = Object.keys(notifications).length
            if (Number(len) === 0){
                return ''
            }
            else {
            return Number(len)
            }
        }
    },
    mutations: {
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
        fetchBoxOffice(state,payload){
            state.boxOfficeList.movies = payload.filter((item)=>{
                return item['classify'] == 'movies'
            })
            state.boxOfficeList.series = payload.filter((item)=>{
                return item['classify'] == 'series'
            })
        },
        fetchUserInfo(state,payload){
            state.usernameInfo = payload.user
        },
        fetchSearchUsers(state,payload){
            let users = payload.users.map((user)=>{
                user.biography = user.biography.slice(0,50)
                return user
            })
            state.searchedUsers = users
        },
        fetchNotifications(state,payload){
            let notifications = payload.notifications.map((item)=>{
                item.id = Math.floor(Math.random() * 9999999999999)
                if (item.icon == 'normal'){
                    item.icon = 'mdi:bell-circle-outline'
                    item.color = 'white'
                }
                else if (item.icon == 'danger'){
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'red'
                }
                else if (item.icon == 'warn'){
                    item.icon = 'mdi:alert-circle-outline'
                    item.color = 'orange'
                }
                else if (item.icon == 'success') {
                    item.icon = 'mdi:arrow-up-circle-outline'
                    item.color = 'green'
                }
                return item
            });
            state.notifications = notifications.sort((function(a,b){
                return new Date(b.date) - new Date(a.date);
            }))
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
                    if (response.data.list.length == 0){
                        commit('loadImdbIds', ['tt0068646'])
                    }
                }).catch(function (error) {
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
                        dispatch('errorHandler', error)
                    });
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
                commit('changeErrMsg', 'Please wait to redirect')
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
                }).catch(function (error) {
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    } else {
                        commit('setToken', null)
                        router.go(0)
                    }
                });
                commit('fetchProfile', userInf)
            }
        },
        async updateName({state, commit, dispatch}, name) {
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
                commit('changeErrMsg', response.data.message)
                console.log(state.errMassage)
            }).catch(function (error) {
                dispatch('errorHandler', error)
            });
        },
        async updateBio({state, commit, dispatch}, bio) {
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
                commit('changeErrMsg', response.data.message)
                console.log(state.errMassage)
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
                commit('removeWatchListPost', id)
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
            if (!(state.isBoxOfficeLoaded)) {
                const options = {
                    method: 'GET',
                    url: `${state.baseURl}/boxoffice`
                };
                await axios.request(options).then(function (response) {
                    commit('fetchBoxOffice', response.data.Post)
                    state.isBoxOfficeLoaded = true
                }).catch(function (error) {
                    state.isBoxOfficeLoaded = false
                    dispatch('errorHandler', error)
                });
            }
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
        async toggleFollow({state, dispatch}, user) {
            const options = {
                method: 'GET',
                url: `${state.baseURl}/users/follow/${user}`,
                headers: {
                    'authorization': `Bearer ${state.token}`
                }
            };
            await axios.request(options).catch(function (error) {
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                }
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
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                }
            });
        },
        async getFollowStatus({state, dispatch}, username) {
            if (state.token){
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
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                }
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
                    if (!error.response) {
                        swal("Can't connect to server, check your internet connection")
                    } else {
                        dispatch('errorHandler', error)
                    }
                });
        },
        async updateProfilePhoto ({state, dispatch, commit}, packet) {
            const options = {
                method: 'PUT',
                data: packet.image,
                url: `${state.baseURl}/users/upload_${packet.location}`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            await axios.request(options).then(()=>{
                commit('toggleProfileLoaded', false)
                dispatch('getUserProfile')
            }).catch(function (error) {
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                }
            });
        },
        async setNotificationsSeen ({state, dispatch}) {
            const options = {
                method: 'PUT',
                url: `${state.baseURl}/users/seenNotifications`,
                headers: {
                    'authorization': `Bearer ${state.token}`,
                }
            };
            await axios.request(options).catch(function (error) {
                if (!error.response) {
                    swal("Can't connect to server, check your internet connection")
                } else {
                    dispatch('errorHandler', error)
                }
            });
        }
},
    modules: {}
})
