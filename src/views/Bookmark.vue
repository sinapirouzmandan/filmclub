<template>
  <div class="bodyMargin">
    <div class="headerH2">
      <vs-avatar badge badge-color="success" size="70" style="margin: 0 auto;" circle>
        <img :src="userAvatar" alt="avatar" class="profileImg">
        <template #badge>
          {{ watchListLengthCalc }}
        </template>
      </vs-avatar>
      <h2 style="display: inline-block;">watch list</h2>
    </div>
    <hr>
    <loading v-if="loadingNew"></loading>
    <bookmarkPost @endLoad="endOrLoad = 'End of Content'"/>
    <p style="margin-bottom: 5rem; opacity: 0.5; font-size:15px;">{{ endOrLoad }}</p>
    <vs-button
        circle
        class="addNewIcon"
        color="#3b5999"
        floating
        gradient
        icon
        @click="active=true;"
    >
      <i class='iconify' data-icon="mdi:movie-open-plus-outline"></i>
    </vs-button>

    <vs-dialog v-model="active" blur>
      <template #header>
        <h4 class="not-margin">
          Name of movie or series
        </h4>
      </template>


      <div class="con-form">
        <vs-input v-model="searchMov" class="input-field" color="#5b3cc4" placeholder="name">
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block color="#5B3CC4" gradient @click="active2 = true;getSearch()">
            search movie
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="active2" blur>
      <template #header>
        <h4 class="not-margin">
          Select the Movie
        </h4>
      </template>
      <vs-row>
        <vs-col v-for="(option,index) in searchListMoviesList['0']" :key="index" lg="3" sm="4" xs="6">
          <div class="chooseMov">
            <img v-lazy="option.Poster" :alt="option.Title" @click="addItem(option.imdbID)">
          </div>
        </vs-col>
      </vs-row>
      <template #footer>
        <div class="con-footer">
          <p style="margin-bottom: 5rem; opacity: 1; font-size:15px;">{{ endOrLoad }}</p>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import bookmarkPost from "../components/Bookmark/bookmarkPost";
import {mapActions, mapGetters, mapState} from 'vuex'
import loading from "../components/loading";

export default {
  name: "Bookmark",
  metaInfo: {
    title: 'WatchList',
    titleTemplate: '%s | FilmClub'
  },
  components: {
    bookmarkPost,
    loading,
  },
  data() {
    return {
      active: false,
      active2: false,
      searchMov: '',
      loadingNew: false
    }
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
  },
  computed: {
    ...mapState(['endOrLoad', 'watchListLength', 'searchListMoviesList', 'userProfile', 'baseURl', 'alternativeAvatar']),
    ...mapGetters(['watchListLengthCalc']),
    userAvatar() {
      if (this.userProfile.avatar) {
        return this.baseURl + this.userProfile.avatar
      } else {
        return this.alternativeAvatar
      }
    },
  },
  methods: {
    getSearch() {
      this.$store.dispatch('getSearchList', this.searchMov)
    },
    ...mapActions(['toggleWatchListPost', "getMoviesList"]),
    addItem(id) {
      this.loadingNew=true
      this.toggleWatchListPost(id)
      this.active2 = false;
      this.active = false
      this.getMoviesList().then(()=>{
        this.loadingNew=false
      }).catch(()=>{
        this.loadingNew=false
      })
    }
  }
}
</script>
<style scoped>
.ptr--ptr{
  background-color: white;
}
</style>
<style scoped>
.headerH2 {
  margin-top: 1.5rem;
}

hr {
  margin: 40px auto 0;
  width: 60%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
}

.addNewIcon {
  position: fixed;
  z-index: 9;
  bottom: 4rem;
  right: 1rem;
  font-size: 35px;
}

.input-field >>> .vs-input {
  background-color: var(--vs-inputs) !important;
  color: #ffffff;
  width: 100%;
}

.chooseMov {
  margin: 5px;
  background-color: #2c3e50;
}

.chooseMov img {
  width: 100%;
  height: 200px;
}

h4 {
  color: #c4baba;
}

.profileImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>