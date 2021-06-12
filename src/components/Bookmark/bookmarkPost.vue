<template>
<div>
  <vs-row>
    <vs-col w="12" v-for="(post,index) in moviesList" :key="index">
      <div class="B-movie_card" id="B-bright">
        <div class="B-info_section">
          <!-- -----------------        post header       --------------------- -->
          <div class="B-movie_header">
            <img class="B-locandina" v-lazy="post.poster" :alt="moviesList.title"/>
            <h1>{{ post.title }}</h1>
            <span class="B-minutes">{{post.length}}</span>
            <p class="B-type">{{post.plot}}</p>
            <br>
            <i class="iconify" data-icon="bx:bxl-imdb" style="font-size: 40px; color: rgba(0, 0, 0, 0.5);" data-inline="true"></i>
            <p style="display: inline-block; position: relative; bottom: 10px; left:7px; color: rgba(0, 0, 0, 0.7);">{{post.rating}} / 10</p>
          </div>
          <!-- -----------------        ///      --------------------- -->

          <!-- -----------------        post action btn       --------------------- -->
          <div class="B-movie_social">
            <ul>
              <li><i class="iconify" data-icon="bx:bxs-share-alt">share</i></li>
              <li><i class="iconify" data-icon="bx:bxs-trash">chat_bubble</i></li>
            </ul>
          </div>
        </div>
        <!-- -----------------        ///       --------------------- -->

        <!-- -----------------        post background        --------------------- -->
        <div class="B-blur_back B-bright_back" :style="{background: `url(${post.poster})`}"></div>
        <!-- -----------------        ///        --------------------- -->
      </div>
    </vs-col>
  </vs-row>
</div>
</template>
<script>
import  {mapState,mapActions} from 'vuex'
export default {
  name: "bookmarkPost",
  data (){
    return{
    }
  },
  methods: {
    ...mapActions(['getMoviesList'])
  },
  created() {
  this.getMoviesList();
  },
  computed:{
    ...mapState({
      moviesList: 'watchListMoviesList'
    }),
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
    margin: 40px auto;
    min-height: 350px;
    height: auto;
  }

  .B-blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .B-movie_header {
    width: 100%;
    margin-top: 85px;
  }

  .B-info_section {
   background-color: rgba(255, 255, 255, 0.3);
    display: inline-grid;
  }
}
.B-bright_back {
  filter: blur(0.8rem);
}
</style>