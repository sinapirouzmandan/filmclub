import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchListMoviesIDs: ['tt1375666','tt1974419','tt0105323', 'tt6723592', 'tt0108778', 'tt0052357','tt0068646', 'tt0137523', 'tt2582802'],
    watchListMoviesList: [],
    searchListMoviesList: [],
    endOrLoad: 'Loading content ...',
    showNavbar: true
  },
  getters: {
  },
  mutations: {
    fetchWatchListMovies(state,payload) {
      state.watchListMoviesList = payload;
    },
    fetchSearchListMovies(state,payload) {
      state.searchListMoviesList = payload;
    },
    changeEndLoad(state){
      state.endOrLoad = 'End of Content'
    },
    toggleNavbar(state,payload){
      state.showNavbar = payload
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
    commit('changeEndLoad')
    },
    async getSearchList({commit}, search){
      console.log(search)
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
      commit('changeEndLoad')
    }
  },
  modules: {
  }
})
