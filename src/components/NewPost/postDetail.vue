<template>
  <div class="writeBox">
    <newPostTools @sendThePost="sharePost()" @saveAsDraft="saveDraft()" :isLoading="isSaving"/>
    <div>
      <croppa
          :width="browserWidth"
          placeholder=""
          :height="(6/13) * browserWidth"
          accept="image/*"
          :prevent-white-space="true"
          :remove-button-size="25"
          remove-button-color="black"
          v-model="croppaData"
      />
      <vs-button
          class="specifyHeaderBtn"
          v-if="!file"
          :active="true"
          color="#000"
          flat
      >
        specify Post header image
      </vs-button>
      <svg fill="#5c5c5c" aria-hidden="true" class="changePostHeader"
           viewBox="0 0 24 24">
        <g>
          <path
              d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
          <path
              d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
        </g>
      </svg>
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
    <div  @click="post.title=false; post.imdb_id=null" v-if="post.title != ''">
      <h1 style="margin-top: 4rem;">{{ post.title }}<span class="iconify" data-icon="mdi:close" style="color:red;"></span> </h1>
    </div>
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
import PullToRefresh from "pulltorefreshjs";

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
      isSaving: false,
      croppaData: {}
    }
  },
  methods: {
    checkRate() {
      if (1 <= Number(this.score) && Number(this.score) <= 10) {
        this.state = 'success'
        return true
      } else {
        swal('Score should be between 1  and 10')
        this.state = 'danger'
        return false
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
    sharePost() {
      if (this.checkRate()) {
        this.$store.commit('changeErrMsg', null)
        this.isSaving = true
        this.editor.save().then((outputData) => {
          if (this.croppaData) {
            let formData = new FormData();
            this.croppaData.generateBlob((image) => {
              console.log(image)
              formData.append('poster', image, 'poster.jpg');
              formData.append('body', JSON.stringify(outputData.blocks));
              formData.append('title', this.post.title);
              formData.append('spoiler', this.post.spoiler);
              formData.append('critic', this.post.critic);
              formData.append('imdb_id', this.post.imdb_id);
              formData.append('score', this.score);
              this.$store.dispatch('createNewPost', formData).then(() => {
                if (!this.errMassage) {
                  this.isSaving = false
                  this.$router.push('/profile')
                } else {
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
            }, 'image/jpg', 0.7)
          } else {
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
    saveDraft() {
      if (this.post.imdb_id) {
        let draftData = {
          body: [],
          title: '',
          imdb_id: ''
        }
        this.editor.save().then((outputData) => {
          draftData.body = outputData
          draftData.title= this.post.title
          draftData.imdb_id = this.post.imdb_id
          localStorage.setItem('draftPost', JSON.stringify(draftData))
          this.$router.back()
        }).catch(() => {
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: '#296186',
            title: "Can't save post to draft",
          })
          this.$store.commit('changeErrMsg', null)
        });
      }
      else {
        this.$vs.notification({
          duration: 3000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#296186',
          title: "You didn't write anything to save !",
        })
      }
    }
  },
  created() {
    this.$store.commit('toggleNavbar', false);
  },
  computed: {
    ...mapState(['searchListMoviesList', 'endOrLoad', 'errMassage', 'baseURl', 'token']),
    browserWidth() {
      if (window.innerWidth < 500) {
        return window.innerWidth
      }
      else {
        return 500
      }
    }
  },
  mounted() {
    const auth = {
      'authorization': `Bearer ${this.token}`
    }
    const draftFromLocalStorage = localStorage.getItem('draftPost')
    if (draftFromLocalStorage !== null) {
      this.post.imdb_id = JSON.parse(draftFromLocalStorage).imdb_id
      this.post.title = JSON.parse(draftFromLocalStorage).title
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
        },
        data: {
          blocks: JSON.parse(draftFromLocalStorage).body.blocks
        }
      })
      localStorage.removeItem('draftPost')
    }
    else {
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
    }
    // eslint-disable-next-line no-unused-vars
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        console.log('refresh')
      }
    });
  },
  components: {newPostTools}
}
</script>

<style scoped>
.specifyHeaderBtn {
  margin: -1rem auto 0;
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
  width: 100%;
  min-height: 500px;
  height: auto;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  text-align: right;
  box-sizing: border-box;
}

.margin-2 {
  margin-top: 1rem;
  background-color: rgb(70, 126, 246);
}

.writeBox >>> .vs-switch {
  background-color: #8e949c;;
}

.search {
  position: relative;
  top: 3rem;
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
.changePostHeader{
  width: 40px;
  height:40px;
  position: absolute;
  top: 110px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.croppa-container {
  background: #a1a1a1;
  width:100vw;
  max-width: 500px;
  height: auto;
  margin: 45px auto 0;
  border: 2px solid black;
}
.writeBox >>> .icon-remove{
  margin-right: 15px;
  margin-top: 10px;
}
</style>