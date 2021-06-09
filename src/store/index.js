import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'querystring'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchListMoviesIDs: ['tt1375666','tt1974419','tt0105323', 'tt6723592', 'tt0108778', 'tt0052357','tt0068646', 'tt0137523', 'tt2582802'],
    watchListMoviesList: [],
    searchListMoviesList: [],
    endOrLoad: 'Loading content ...',
    showNavbar: true,
    token: null,
    userInfo: [],
    isMailAvailable: false,
    isUserNameAvailable: false,
    errMassage:''
  },
  getters: {
    watchListLengthCalc(state){
      let len = Object.keys(state.watchListMoviesIDs).length
      return Number(len)
    }
  },
  mutations: {
    fetchWatchListMovies(state,payload) {
      state.watchListMoviesList = payload;
    },
    fetchSearchListMovies(state,payload) {
      state.searchListMoviesList = payload;
    },
    changeEndLoad(state,payload = 'End of Content'){
      state.endOrLoad = payload
    },
    toggleNavbar(state,payload){
      state.showNavbar = payload
    },
    setToken(state,payload){
      state.token = payload
      localStorage.setItem('token', payload)
    },
    setUserMail(state,user){
    state.userInfo.email = user.email
      state.userInfo.name= user.name
    },
    setUserName(state,user){
      state.userInfo.username = user.username
      state.userInfo.password = user.password
      state.userInfo.password_confirm = user.password
    },
    mailAvailability(state,payload){
      state.isMailAvailable = payload
    },
    usernameAvailability(state,payload){
      state.isUserName = payload
    },
    changeErrMsg(state,payload){
      state.errMassage = payload
    }
  },
  actions: {
    async getMoviesList({commit,state}){
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
        }).catch(function (error) {
          console.error(error);
        });
        commit('fetchWatchListMovies', watchListPosts)
      }
      if (Object.keys(watchListPosts).length <= 0) {
        commit('changeEndLoad', 'Error loading, maybe the name is wrong')
      }
      else{
        commit('changeEndLoad')
      }
    },
    async getSearchList({commit}, search){
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
        console.error(error);
      });
      commit('fetchSearchListMovies', searchListPosts)
      if (Object.keys(searchListPosts).length <= 0) {
        commit('changeEndLoad', 'Error loading, maybe the name is wrong')
      }
      else{
        commit('changeEndLoad')
      }
    },
    async signin({commit}, user){
      let token = null
      const options = {
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: qs.stringify({login: user.userName,  password:user.password, r: 'json'}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      await axios.request(options).then(function (response) {
        token = response.data.token
      }).catch(function (error) {
        commit('changeErrMsg', error.response.data.errors['0']['msg'])
      });
      commit('setToken', token)
    },
    async signup({commit, state}){
      let token = null
      const options = {
        method: 'POST',
        url: 'http://localhost:3000/users/',
        data: qs.stringify({email: state.userInfo.email,  username:state.userInfo.username,name: state.userInfo.name,password: state.userInfo.password,password_confirm:state.userInfo.password_confirm}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      await axios.request(options).then(function (response) {
        commit('setToken', null)
        token = response.data.token
      }).catch(function (error) {
        commit('changeErrMsg', error.response.data.errors['0']['msg'])
      });
      commit('setToken', token)
    },
    async checkMailAvailable({commit},user){
      const options = {
        method: 'GET',
        url: `http://localhost:3000/users//is_email_available/${user.email}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      await axios.request(options).then(function (response) {
        if (response.data.availability === true){
          commit('mailAvailability', true)
          commit('setUserMail', user)
        }
        else if(response.data.availability === false){
          commit('changeErrMsg', response.data.message)
          commit('mailAvailability', false)
        }
      }).catch(function (error) {
        commit('changeErrMsg', error.response.data.errors['0']['msg'])
      });
    },
    async checkUserNameAvailable({commit,dispatch},user){
      const options = {
        method: 'GET',
        url: `http://localhost:3000/users//is_username_available/${user.username}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      await axios.request(options).then(function (response) {
        if (response.data.availability === true){
          commit('usernameAvailability', true)
          commit('setUserName', user)
          dispatch('signup')
        }
        else if(response.data.availability === false){
          commit('changeErrMsg', response.data.message)
          commit('usernameAvailability', false)
        }
      }).catch(function (error) {
        commit('changeErrMsg', error.response.data.errors['0']['msg'])
      });
    }
  },
  modules: {
  }
})
