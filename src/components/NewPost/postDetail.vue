<template>
  <div class="writeBox">
    <newPostTools/>
    <div class="headerImage">
      <div class="xinu">
        <vs-button
            :active="true"
            flat
            color="#5B3CC4"
            gradient
        >
          specify Post header image
        </vs-button>
      </div>
      <div class="search" v-if="!Movietitle">
            <vs-input
                color="#5B3CC4"
                gradient
                v-model="searchMov"
                placeholder="Movie or series name" />
            <vs-button
                @click="active = !active; getSearch()"
                circle
                color="#5B3CC4"
                gradient
            >
              Search
            </vs-button>
          </div>
      <div class="rating">
        <vs-row>
        </vs-row>
        <vs-input v-model="score" :state="state" danger icon-after label-placeholder="My score to : " type="number"
                  @change="checkRate()" warn v-if="Movietitle != ''">
          <template #icon>
            /10
          </template>
        </vs-input>
        <vs-switch v-model="active" class="margin-2" v-if="Movietitle != ''">
          has spoilers
        </vs-switch>
        <vs-switch v-model="active" class="margin-2" v-if="Movietitle != ''">
          is critic
        </vs-switch>
      </div>
    </div>
    <h1 style="margin-top: 4rem;" v-if="Movietitle != ''">{{ Movietitle }}</h1>
    <div class="editorContainer" dir="auto" v-show="Movietitle != ''">
    <div id="editor" dir="rtl">
    </div>
    </div>
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
import newPostTools from "./newPostTools";
import swal from 'sweetalert'
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import { mapState } from 'vuex'
export default {
  name: "postDetail",
  data() {
    return {
      score: null,
      state: 'warn',
      active:false,
      searchMov: '',
      Movieid: '',
      Movietitle: ''
    }
  },
  methods: {
    checkRate() {
      if (1 <= Number(this.score) && Number(this.score) <= 10){
        this.state = 'success'
      }
      else {
        swal('Score should be between 1  and 10')
        this.state = 'danger'
      }
    },
    getSearch(){
      this.$store.dispatch('getSearchList',this.searchMov)
    },
    nextPage(movie){
      this.Movieid = movie.imdbID
      this.Movietitle = movie.Title
      this.active = false
    }
  },
  created() {
    this.$store.commit('toggleNavbar',false);
  },
  computed:{
    ...mapState(['searchListMoviesList','endOrLoad']),
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new EditorJS({
      holder: 'editor',
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            }
          }
        }
      }
    })
  },
  components: {newPostTools}
}
</script>

<style scoped>
.headerImage {
  width: 100%;
  max-width: 500px;
  height: 250px;
  margin: 0 auto;
  background: url('https://i.stack.imgur.com/y9DpT.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.xinu {
  margin-top: 230px;
  color: black;
  font-size: 20px;
}

.rating {
  width: 100px;
  position: absolute;
  top: 420px;
}
.writeBox >>> .vs-input{
  width: 100px;
}
h1{
  font-size: 20px;
}
.editorContainer{
  width: 90%;
  min-height:500px;
  height: auto;
  margin-left: 5%;
  margin-top: 17rem;
  border: 2px dotted var(--vs-buttons);
  padding: 10px;
  text-align: right;
}
.margin-2{
  margin-top: 1rem;
}
.writeBox >>> .vs-switch{
  background-color: #8e949c;;
}
.search{
  position: absolute;
  top:2rem;
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width: 100%;
}
.search >>> .vs-input{
  background-color: var(--vs-navs) !important;
  width: 70vw;
  max-width: 400px;
  color:white;
}
.search >>> .vs-input__label{
  width: 60%;
}
.writeBox >>> .vs-dialog{
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