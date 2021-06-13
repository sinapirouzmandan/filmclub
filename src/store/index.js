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
        token: null,
        userInfo: [],
        isMailAvailable: false,
        isUserNameAvailable: false,
        errMassage: 'wrong values',
        userProfile: '',
        isProfileLoaded: false
    },
    getters: {
        watchListLengthCalc(state) {
            let len = Object.keys(state.watchListMoviesIDs).length
            return Number(len)
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
        changeEndLoad(state, payload = 'End of Content') {
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
        }
    },
    actions: {
        errorHandler({commit}, error) {
            if (!error.response) {
                commit('changeErrMsg', "can't connect to server, check your internet connection")
                return
            }
            if (error.response.data.errors['0']['msg']) {
                commit('changeErrMsg', error.response.data.errors['0']['msg'])
            } else if (error.response.data.message != undefined) {
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
            if(type == 1){
                options = {
                    method: 'POST',
                    url: `${state.baseURl}/users/login`,
                    data: qs.stringify({email: user.userName.toLowerCase(), password: user.password, r: 'json'}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                };
            }
            else {
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
                        router.go("/signin")
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
        }
    },
    modules: {}
})
