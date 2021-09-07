<template>
  <div>
  <vs-dialog :loading="isLoadingData" v-model="activateDownload" @close="$emit('close')" blur id="downloadBox">
    <template #header>
      <h3 class="not-margin yekan white">
         {{selectedMovie}}
      </h3>
    </template>
      <div style="display: flex; justify-content: center; margin-top: -1.5rem;">
        <h2 class="white yekan">{{error}}</h2>
        <p class="white yekan">{{notInArchive}}</p>
        <div v-if="movieData.postType === 'movie'">
        <div class="mg-3" v-for="(link,index) in movieData.links" :key="index"  style="text-align: left;">
        <a :href="link.link" style="text-decoration: none;" target="_blank">
          <span class="white links">
          <i class="iconify" data-icon="bx:bxs-download" style="font-size:14px; padding-right: 7px;"></i> {{link.caption}}
          </span>
        </a>
        </div>
        </div>
        <div v-else-if="movieData.postType === 'series'">
          <div class="mg-3" v-for="(link,index) in movieData.links.seasons" :key="index"  style="text-align: left;" @click="selectedSeason = index">
          <span class="white">
          <i class="iconify" data-icon="bx:bxs-download" style="font-size:16px; padding-right: 7px;"></i>
             Season {{index}}
          </span>
          </div>
        </div>
      </div>
    <div style="display: flex; justify-content: center;">
    <vs-button v-if="notInArchive !== ''" @click="requestMovie" :loading="loadingReqMovie"><span class="yekan">درخواست</span></vs-button>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <div class="new mg-3">
          Archive by AlmasMovie
        </div>
      </div>
    </template>
  </vs-dialog>
  <vs-dialog v-model="selectedSeason" blur>
    <template #header>
      <h3 class="not-margin yekan white">
        {{selectedMovie}} season {{selectedSeason}}
      </h3>
    </template>
    <div style="display: flex; justify-content: center; margin-top: -1.5rem;">
      <div v-if="movieData.postType === 'series' && this.selectedSeason">
        <div class="mg-3" v-for="(link,index) in movieData.links.seasons[selectedSeason].rows" :key="index"  style="text-align: left;">
          <a :href="link.link" style="text-decoration: none;" target="_blank">
          <span class="white links">
          <i class="iconify" data-icon="bx:bxs-download" style="font-size:14px; padding-right: 7px;"></i> {{link.caption}}
          </span>
          </a>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer-dialog">
        <div class="new mg-3">
          Archive by AlmasMovie
        </div>
      </div>
    </template>
  </vs-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {mapState} from 'vuex';
import qs from "querystring";
export default {
  name: "download",
  data() {
    return{
      isLoadingData:false,
      error:null,
      movieData: [],
      notInArchive: '',
      selectedSeason: null,
      loadingReqMovie: false
    }
  },
  computed:{
    ...mapState(['baseURl', 'token']),
    activateDownload() {
      return this.activeDownload
    }
  },
  props: [
    'activeDownload',
    'selectedMovieID',
    'selectedMovie',
     'selectedMovieRate'
  ],
  methods:{
    async getMovieLinks() {
      const options = {
        method: 'GET',
        url: `${this.baseURl}/download/byid/${this.selectedMovieID}`
      };
      await axios.request(options).then((response)=>{
        this.movieData=response.data
        this.isLoadingData=false
        if(this.movieData.length === 0){
          this.notInArchive = 'این فیلم/سریال در آرشیو ما وجود نداشت! از طریق دکمه زیر میتوانید درخواست دهید'
        }
        else {
          this.notInArchive = ''
        }
        this.error=null
      }).catch(function () {
        this.error="خطا در دریافت لینک ها"
        this.isLoadingData=false
      });
    },
    async requestMovie() {
      this.loadingReqMovie=true
        const options = {
          method: 'POST',
          url: `${this.baseURl}/download/request`,
          headers: {
            'authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify({
            movieTitle: this.selectedMovie,
            imdbRate: this.selectedMovieRate
          })
        };
        await axios.request(options).then(() => {
          this.loadingReqMovie=false
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'top-center',
            color: '#296186',
            title: 'We will check your request soon.',
          })
        }).catch(function () {
          this.loadingReqMovie=false
        });
    },
  },
  watch: {
    selectedMovieID: function () {
      if(this.selectedMovieID !== null){
        this.isLoadingData=true;
        this.getMovieLinks();
      }
    },
  }
}
</script>

<style scoped>
.white{
  color:whitesmoke;
  text-decoration: none;
}
.mg-3{
  margin-top:25px;
}
.links{
  font-size: 14px;
}
</style>