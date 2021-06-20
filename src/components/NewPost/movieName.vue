<template>
  <div class="father">
    <vs-row>
      <vs-col w="12">
        <div class="postInfo"></div>
        <div class="postReal">
          <div class="search">
          <i class="iconify" data-icon="mdi:movie-search"></i>
            <vs-input
                loading
                color="#7d33ff"
                v-model="searchMov"
                placeholder="Movie or series name" />
            <vs-button
                @click="active = !active; getSearch()"
                circle
            >
              New Post
            </vs-button>
          </div>
          </div>
      </vs-col>
    </vs-row>
    <vs-dialog v-model="active" blur>
      <template #header>
        <h4 class="not-margin">
          Select the Movie
        </h4>
      </template>
<vs-row>
  <vs-col xs="6" sm="4" lg="3" v-for="(option,index) in searchListMoviesList['0']" :key="index">
    <div class="chooseMov">
    <img v-lazy="option.Poster" :alt="option.Title" @click="nextPage(option)">
    </div>
  </vs-col>
</vs-row>
      <template #footer>
        <div class="con-footer">
          <p style="margin-bottom: 5rem; opacity: 1; font-size:15px;">{{endOrLoad}}</p>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "movieName",
  data(){
    return{
      active:false,
      searchMov: ''
    }
  },
  methods:{
    getSearch(){
      this.searchMov = this.searchMov.replace(/\s/g, '');
      this.$store.dispatch('getSearchList',this.searchMov)
    },
    nextPage(movie){
      this.$router.push({name: 'postDetail', params: {id: movie.imdbID, title: movie.Title}})
    }
  },
  computed:{
    ...mapState(['searchListMoviesList','endOrLoad']),

  },
  created() {
    this.$store.commit('toggleNavbar',true);
  }
}
</script>

<style scoped>
:root{
  --vs-gray-3: 0,0,0 !important;
  --vs-mainback: #0a0d0e;
  --vs-navs: #1e2023;
  --vs-cardback: #121818;
}
.father{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width: 100%;
}
.postInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  padding-top:100%;
  border-radius: 50%;
}
.postReal{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.postReal >>> .vs-input{
  background-color: var(--vs-navs) !important;
  width: 300px;
  color:white;
}
.postReal >>> .vs-input__label{
  width: 60%;
}
.search{
  margin-top: 5rem;
  font-size: 70px;
}
.iconify{
  -webkit-box-shadow: 10px 10px 10px -1px rgba(0,0,0,0.59);
  box-shadow: 10px 10px 10px -1px rgba(0,0,0,0.59), 2px 5px 16px 0px rgba(12, 13, 16, 0.46), 0px 6px 50px -8px rgba(14, 12, 12, 0);
  margin-bottom: 3rem;
}
.postReal >>> .vs-button{
  margin: 2rem auto 0;
}
.postReal >>> .vs-dialog{
  background-color: #080a0b;
}
.chooseMov{
  margin: 5px;
  background-color: #2c3e50;
}
.chooseMov img{
  width: 100%;
  height: 200px;
}
h4{
  color: #c4baba;
}
</style>