<template>
  <div class="father">
    <vs-row>
      <vs-col w="12">
        <div class="postInfo">
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
              Search Movie
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
  <vs-col w="4" class="chooseMov" v-for="(option,index) in searchListMoviesList['0']" :key="index">
    <img :src="option.Poster" :alt="option.Title" @click="nextPage(option)">
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
      this.$store.dispatch('getSearchList',this.searchMov)
    },
    nextPage(movie){
      this.$router.push({name: 'postDetail', params: {id: movie.imdbID, title: movie.Title}})
    }
  },
  computed:{
    ...mapState(['searchListMoviesList','endOrLoad']),

  }

}
</script>

<style scoped>
.father{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  height:100%;
  width: 100%;
}
.postInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.56);
  padding-top: 100%;
  border-radius: 50%;

}
.postInfo >>> .vs-input{
  background-color: #171b1d !important;
  width: 300px;
  color:white;
}
.postInfo >>> .vs-input__label{
  width: 60%;
}
.search{
  position: absolute;
  top: 25%;
  font-size: 70px;
}
.iconify{
  -webkit-box-shadow: 10px 10px 10px -1px rgba(0,0,0,0.59);
  box-shadow: 10px 10px 10px -1px rgba(0,0,0,0.59), 2px 5px 16px 0px rgba(12, 13, 16, 0.46), 0px 6px 50px -8px rgba(14, 12, 12, 0);
  margin-bottom: 3rem;
}
.postInfo >>> .vs-button{
  margin: 2rem auto 0;
}
.postInfo >>> .vs-dialog{
  background-color: #080a0b;
}
.chooseMov{
  margin: 5px;
  width: 30%;
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