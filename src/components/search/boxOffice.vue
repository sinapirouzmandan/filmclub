<template>
  <div>
    <h1>
      Box Office
    </h1>
    <h3 class="subject">Movie of the week</h3>
    <hr>
    <vs-row>
      <vs-col v-for="(post,index) in boxOfficeList.movies" :key="index" w="12">
        <div v-if="isMovieLoaded" id="B-bright" class="B-movie_card1">
          <div class="B-info_section">
            <!-- -----------------        post header       --------------------- -->
            <div class="B-movie_header1">
              <img v-lazy="post.poster" :alt="post.title" class="B-locandina" @load="isMovieLoaded = true;"/>
              <h1>{{ post.title }}</h1>
              <br>
            </div>
          </div>
          <!-- -----------------        post background        --------------------- -->
          <div :style="{background: `url('${post.poster}')`}" class="B-blur_back B-bright_back"></div>
          <!-- -----------------        ///        --------------------- -->
        </div>
      </vs-col>
      <loading v-if="!isMovieLoaded"/>
    </vs-row>

    <h3 class="subject">Series of the week</h3>
    <hr>
    <vs-row>
      <vs-col v-for="(post,index) in boxOfficeList.series" :key="index" w="12">
        <div v-if="isSerieLoaded" id="B-bright2" class="B-movie_card1">
          <div class="B-info_section">
            <!-- -----------------        post header       --------------------- -->
            <div class="B-movie_header1">
              <img v-lazy="post.poster" :alt="post.title" class="B-locandina" @load="isSerieLoaded = true"/>
              <h1>{{ post.title }}</h1>
              <br>
            </div>
          </div>
          <!-- -----------------        post background        --------------------- -->
          <div :style="{background: `url('${post.poster}')`}" class="B-blur_back B-bright_back"></div>
          <!-- -----------------        ///        --------------------- -->
        </div>
      </vs-col>
      <loading v-if="!isSerieLoaded"/>
    </vs-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loading from "../loading";

export default {
  name: "boxOffice",
  data() {
    return {
      loaded: false,
      isMovieLoaded: false,
      isSerieLoaded: false
    }
  },
  components: {
    loading
  },
  methods: {
    ...mapActions(['getBoxOfficeList']),
  },
  created() {
    this.getBoxOfficeList().then(() => {
      this.isMovieLoaded = true;
      this.isSerieLoaded = true;
    });
  },
  computed: {
    ...mapState(['boxOfficeList'])
  }
}
</script>
<style>
.B-movie_card1 {
  position: relative;
  display: block;
  width: 400px;
  height: 170px;
  margin: 30px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0 0 10px -25px rgba(0, 0, 0, 0.5);
}

.B-movie_card1:hover {
  transform: scale(1.01);
  box-shadow: 0 0 10px -10px rgba(0, 0, 0, 0.5);
  transition: all 0.4s;
}

.B-movie_card1 .B-info_section {
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
}

.B-movie_card1 .B-info_section .B-movie_header1 {
  position: relative;
  padding: 25px;

}

.B-movie_card1 .B-info_section .B-movie_header1 h1 {
  color: black;
  font-weight: 400;
  font-size: 20px;
  margin-top: 40px;
  width: 100%;
}

.B-movie_card1 .B-info_section .B-movie_header1 h4 {
  color: #555;
  font-weight: 400;
}

.B-movie_card1 .B-info_section .B-movie_header1 .B-locandina {
  position: relative;
  float: left;
  margin-right: 20px;
  height: 120px;
  width: 40vw;
  max-width: 200px;
  object-fit: cover;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
}

.B-movie_card1 .B-blur_back {
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  right: 0;
  background-size: cover;
  border-radius: 11px;
}

@media screen and (min-width: 768px) {
  .B-movie_header1 {
    width: 100%;
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
  .B-movie_card1 {
    width: 90%;
    margin: 20px auto;
    min-height: 100px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  .B-blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .B-movie_header1 h1 {
    width: 100%;
  }

  .B-info_section {
    background-color: rgba(255, 255, 255, 0.2);
    display: inline-grid;
  }
}

.B-bright_back {
  filter: blur(0.8rem);
}

.subject {
  margin-top: 4rem;
  margin-bottom: -1rem;
}

hr {
  margin: 40px auto 0;
  width: 60%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
}
</style>