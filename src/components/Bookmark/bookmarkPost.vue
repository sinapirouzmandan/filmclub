<template>
  <div>
    <download :active-download="activeDownload" @close="activeDownload=false" :selectedMovie="selectedMovie"
    :selectedMovieID="selectedMovieID" :selectedMovieRate="selectedMovieRate"/>
    <vs-row>
      <vs-col v-for="post in watchListMoviesList" :key="post.id" w="12">
        <div id="B-bright" class="B-movie_card">
          <div class="B-info_section">
            <!-- -----------------        post header       --------------------- -->
            <div class="B-movie_header">
              <img :src="post.poster" :alt="post.title" class="B-locandina"/>
              <h1>{{ post.title }}</h1>
              <span class="B-minutes">{{ post.length }}</span>
              <p class="B-type">{{ post.plot }}</p>
              <br>
              <i class="iconify" data-icon="bx:bxl-imdb" data-inline="true"
                 style="font-size: 40px; color: rgba(0, 0, 0, 0.5);"></i>
              <p style="display: inline-block; position: relative; bottom: 10px; left:7px; color: rgba(0, 0, 0, 0.7);">
                {{ post.rating }} / 10</p>
            </div>
            <!-- -----------------        ///      --------------------- -->

            <!-- -----------------        post action btn       --------------------- -->
            <div class="B-movie_social">
              <ul>
                <li>
                  <div @click="activeDownload = true; selectedMovie=post.title; selectedMovieID=post.id; selectedMovieRate=post.rating">
                  <i class="iconify borderIC" data-icon="bx:bxs-download" style="font-size:30px; color:#2f2f2f"></i>
                  </div>
                </li>
                <li>
                  <div @click="del(post.id)">
                    <i class="iconify borderIC" data-icon="bx:bxs-trash" style="font-size:30px;"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- -----------------        ///       --------------------- -->

          <!-- -----------------        post background        --------------------- -->
          <div :style="{background: `url(${post.poster})`}" class="B-blur_back B-bright_back"></div>
          <!-- -----------------        ///        --------------------- -->
        </div>
      </vs-col>
    </vs-row>
    <loading v-if="!isLoaded"/>
  </div>
</template>
<script>
import loading from "../loading";
import {mapActions, mapState} from 'vuex'
import swal from 'sweetalert'
import PullToRefresh from "pulltorefreshjs";
export default {
  name: "bookmarkPost",
  data() {
    return {
      loaded: false,
      isLoaded: false,
      activeDownload: false,
      selectedMovie: null,
      selectedMovieID: null,
      selectedMovieRate:null,
    }
  },
  components: {loading,
  download: ()=> import ('../download')
  },
  methods: {
    ...mapActions(['getMoviesList', 'toggleWatchListPost']),
    del(id) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
          .then((willDelete) => {
            if (willDelete) {
              this.toggleWatchListPost(id)
            }
          });
    }
  },
  created() {
    this.getMoviesList().then(() => {
      this.isLoaded = true
    });
  },
  mounted() {
    var self = this
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        this.isLoaded = false
        self.$store.commit('toggleWatchListLoaded', false)
        self.$store.dispatch('getMoviesList').then(()=>{
          this.isLoaded = true
        })
      }
    });
  },
  computed: {
    ...mapState(['watchListMoviesList'])
  }
}
</script>
<style>
.B-movie_card {
  position: relative;
  display: block;
  width: 800px;
  height: 350px;
  margin: 80px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0 0 10px -25px rgba(0, 0, 0, 0.5);
}

.B-movie_card:hover {
  transform: scale(1.01);
  box-shadow: 0 0 10px -10px rgba(0, 0, 0, 0.5);
  transition: all 0.4s;
}

.B-movie_card .B-info_section {
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
}

.B-movie_card .B-info_section .B-movie_header {
  position: relative;
  padding: 25px;
  word-break: break-word;
}

.B-movie_card .B-info_section .B-movie_header h1 {
  color: black;
  font-weight: 400;
}

.B-movie_card .B-info_section .B-movie_header h4 {
  color: #555;
  font-weight: 400;
}

.B-movie_card .B-info_section .B-movie_header .B-minutes {
  display: inline-block;
  margin-top: 0;
  margin-right: 1rem;
  color: #474747;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.B-movie_card .B-info_section .B-movie_header .B-type {
  display: inline-block;
  color: #3d3c3c;
  margin-left: 10px;
}

.B-movie_card .B-info_section .B-movie_header .B-locandina {
  position: relative;
  float: left;
  margin-right: 20px;
  height: 120px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
}

.B-movie_card .B-info_section .B-movie_social {
  height: 10%;
  padding-left: 15px;
  padding-bottom: 20px;
}

.B-movie_card .B-info_section .B-movie_social ul {
  list-style: none;
  padding: 0;
}

.B-movie_card .B-info_section .B-movie_social ul li {
  display: inline-block;
  color: rgba(0, 0, 0, 0.3);
  transition: color 0.3s;
  transition-delay: 0.15s;
  margin: 0 10px;
}

.B-movie_card .B-info_section .B-movie_social ul li:hover {
  transition: color 0.3s;
  color: rgba(0, 0, 0, 0.7);
}

.B-movie_card .B-info_section .B-movie_social ul li i {
  font-size: 19px;
  cursor: pointer;
}

.B-movie_card .B-blur_back {
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  right: 0;
  background-size: cover;
  border-radius: 11px;
}

@media screen and (min-width: 768px) {
  .B-movie_card {
    height: auto;
  }
  .B-movie_header {
    width: 65%;
  }

  .B-info_section {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .B-blur_back {
    width: 80%;
    background-position: -100% 10% !important;
  }
}

@media screen and (max-width: 768px) {
  .B-movie_card {
    width: 95%;
    margin: 30px auto;
    min-height: 100px;
    height: auto;
  }

  .B-blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .B-movie_header {
    margin-top: 20px;
  }

  .B-info_section {
    background-color: rgba(255, 255, 255, 0.3);
    display: inline-grid;
  }
  .B-movie_card .B-info_section .B-movie_header h1 {
    font-size: 20px;
  }
}

.B-bright_back {
  filter: blur(0.8rem);
}

.swal-modal {
  background-color: var(--vs-navs);
}

.swal-title {
  color: white !important;
}
.borderIC{
  padding: 6px;
  border-radius: 50%;
  border: 1px dashed black;
}
</style>