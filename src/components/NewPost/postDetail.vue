<template>
  <div class="writeBox">
    <newPostTools @sendThePost="sharePost()" :isLoading="isSaving"/>
    <input ref="file" accept="image/*" class="uploadHeader" type="file" @change="handleProfileUploads">
    <div class="headerImage">
      <img id="headerSelected" src="false" v-show="file">
      <div class="xinu">
        <vs-button
            v-if="!file"
            :active="true"
            color="#5B3CC4"
            flat
            gradient
        >
          specify Post header image
        </vs-button>
      </div>
      <div v-if="!post.title" class="search">
        <vs-input
            v-model="searchMov"
            color="#5B3CC4"
            gradient
            placeholder="Movie or series name"/>
        <vs-button
            circle
            color="#5B3CC4"
            gradient
            @click="active = !active; getSearch()"
        >
          Search
        </vs-button>
      </div>
    </div>
    <h1 v-if="post.title != ''" style="margin-top: 4rem;">{{ post.title }}</h1>
    <div class="rating">
      <vs-row>
      </vs-row>
      <vs-input v-if="post.title != ''" v-model="score" :state="state" danger icon-after label-placeholder="My score to : "
                type="number" warn @change="checkRate()">
        <template #icon>
          /10
        </template>
      </vs-input>
    </div>
    <div class="hashtags" v-if="post.title != ''">
      <div class="hashtag_item">
        <vs-checkbox primary v-model="post.critic">
          #critic
        </vs-checkbox>
      </div>
      <div class="hashtag_item">
        <vs-checkbox danger v-model="post.spoiler">
          #spoilers
        </vs-checkbox>
      </div>
    </div>
    <div v-show="post.title != ''" class="editorContainer" dir="auto">
      <div id="editor" dir="rtl" spellcheck="false">
      </div>
    </div>
    <vs-dialog v-model="active" blur>
      <template #header>
        <h4 class="not-margin">
          Select the Movie
        </h4>
      </template>
      <vs-row>
        <vs-col v-for="(option,index) in searchListMoviesList['0']" :key="index" lg="3" sm="4" xs="6">
          <div class="chooseMov">
            <img v-lazy="option.Poster" :alt="option.Title" @click="nextPage(option)">
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
import newPostTools from "./newPostTools";
import swal from 'sweetalert'
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import Header from '@editorjs/header';
import {mapState} from 'vuex'

export default {
  name: "postDetail",
  data() {
    return {
      post: {
        poster: null,
        title: false,
        spoiler: false,
        critic: false,
        imdb_id: null,
        body: null,
      },
      score: 0,
      state: 'warn',
      active: false,
      searchMov: '',
      file: '',
      editor: null,
      headerImage: '',
      isSaving: false
    }
  },
  methods: {
    checkRate() {
      if (1 <= Number(this.score) && Number(this.score) <= 10) {
        this.state = 'success'
      } else {
        swal('Score should be between 1  and 10')
        this.state = 'danger'
      }
    },
    getSearch() {
      this.$store.dispatch('getSearchList', this.searchMov)
    },
    nextPage(movie) {
      this.post.imdb_id = movie.imdbID
      this.post.title = movie.Title
      this.active = false
      this.editor.caret.setToFirstBlock('end', 0);
    },
    handleProfileUploads() {
      this.file = this.$refs.file.files[0];
      const preview = document.getElementById('headerSelected');
      const file = document.querySelector('input[type=file]').files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    sharePost(){
      this.$store.commit('changeErrMsg', null)
      this.isSaving = true
      this.editor.save().then((outputData) => {
        if (this.file){
          let formData = new FormData();
          formData.append('poster', this.file);
          formData.append('body', JSON.stringify(outputData.blocks));
          formData.append('title', this.post.title);
          formData.append('spoiler', this.post.spoiler);
          formData.append('critic', this.post.critic);
          formData.append('imdb_id', this.post.imdb_id);
          formData.append('score', this.score);
          this.$store.dispatch('createNewPost', formData).then(()=>{
            if (!this.errMassage){
              this.isSaving = false
              this.$router.push('/profile')
            }
            else {
              this.$vs.notification({
                duration: 3000,
                progress: 'auto',
                border: null,
                position: 'bottom-center',
                color: '#296186',
                title: this.errMassage,
              })
              this.$store.commit('changeErrMsg', null)
              this.isSaving = false
            }
          })
        }
        else{
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: '#296186',
            title: 'You should set a header image for your post',
          })
          this.isSaving = false
        }

      }).catch(() => {
        this.$vs.notification({
          duration: 3000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#296186',
          title: "Can't save your post, please try again later or refresh the page",
        })
        this.isSaving = false
        this.$store.commit('changeErrMsg', null)
      });
    }
  },
  created() {
    this.$store.commit('toggleNavbar', false);
  },
  computed: {
    ...mapState(['searchListMoviesList', 'endOrLoad', 'errMassage', 'baseURl', 'token']),
  },
  mounted() {
    const auth = {
      'authorization': `Bearer ${this.token}`
    }
    // eslint-disable-next-line no-unused-vars
    this.editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Write here ...',
      tools: {
        image: {
          class: ImageTool,
          config: {
            additionalRequestHeaders: auth,
            endpoints: {
              byFile: `${this.baseURl}/posts/editorjs/upload/by_file`,
            }
          }
        },
        header: Header
      }
    })
    // eslint-disable-next-line no-unused-vars

  },
  components: {newPostTools}
}
</script>

<style scoped>
@font-face {
  font-family: 'Yekan';
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.eot?#iefix') format('embedded-opentype'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.woff') format('woff'),
  url('https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.ttf') format('truetype');
  font-weight: normal;
}
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
  margin: 4rem auto 0;
}

.writeBox >>> .vs-input {
  width: 100px;
}

h1 {
  font-size: 23px;
}

.editorContainer {
  width: 85%;
  min-height: 500px;
  height: auto;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 25px;
  text-align: right;
}

.margin-2 {
  margin-top: 1rem;
  background-color: rgb(70, 126, 246);
}

.writeBox >>> .vs-switch {
  background-color: #8e949c;;
}

.search {
  position: absolute;
  top: 8.5rem;
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.search >>> .vs-input {
  background-color: var(--vs-navs) !important;
  width: 70vw;
  max-width: 400px;
  color: white;
}

.search >>> .vs-input__label {
  width: 60%;
}

.writeBox >>> .vs-dialog {
  background-color: #080a0b;
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
.uploadHeader {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: absolute;
  top: 165px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  height: 250px;
  width: 100%;
  background-color: blue;
  opacity: 0;
}
#headerSelected{
width:100%;
  height:100%;
  object-fit: cover;
}
#editor{
  font-family: Yekan;
  font-size: 18px;
  line-height:2;
  text-decoration: none;
}
.writeBox >>> .ce-header {
  font-size: 20px;
  font-weight: 200;
}
.writeBox >>> .ce-toolbar__settings-btn {
  width: 20px;
  height: 20px;
  background-color: white;
}
p {
  font-size: 50px;
}
.hashtags {
  margin-top: 4rem;
}
.hashtag_item{
  margin-right: 5%;
  flex-grow: 3;
  display: inline-block;
  text-align: center;
}

</style>