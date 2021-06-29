<template>
<div class="single">
  <div class="overlayLoad" v-if="isLoading">
    <div class="loader">
      <loading/>
    </div>
  </div>
  <div class="header">
    <img :src="baseURl + singlePost.poster" alt="" id="headerImage">
    <vs-avatar circle size="70" id="avatarContainer">
      <img :src="baseURl + singlePost.avatar" alt="" id="avatarImage">
    </vs-avatar>
    <span id="username">{{singlePost.username}}</span>
  </div>
  <div class="interactions">
    <vs-row>
      <vs-col w="6">
        <vs-row>
        <vs-col w="6">
        <vs-button
            circle
            color="rgb(59,89,153)"
            flat
            icon
            style="width: 50px; height: 50px; margin-top: -5px;"
            active
        >
          <i class="iconify" data-icon="bx:bxs-comment-dots" data-inline="false" style="color:white;"></i>
          <p style="color: white; margin-left: 5px;"> {{singlePost.comments}}</p>
        </vs-button>
      </vs-col>
        <vs-col w="6">
          <vs-button
              @click="toggle_Like(singlePost._id)"
              circle
              color="#F08080"
              icon
              style="width: 50px; height: 50px; margin-top: -5px;"
              :active="isLiked"
          >
            <i class="iconify" data-icon="bx:bx-heart" data-inline="false" style="color:white;"></i>
            <p style="color: white; margin-left: 5px;"> {{ likeCount }}</p>
          </vs-button>
        </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="6">
        <vs-button
            v-if="singlePost.username !== userProfile.username"
            :class="border"
            :color="colorBtn"
            :gradient="gradient"
            :loading="isFollowLoading"
            style="width:100%;"
            @click="follow"
        >
          {{ followText }}
        </vs-button>
        <vs-button
            v-else
            color="rgb(70,126,246)"
            gradient
            style="width:100%;"
            @click="editText='Save';loadEditor(); editMode = true;"
        >
          {{editText}}
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
  <hr>
  <div v-show="!editMode">
  <div class="body" id="textBody"  dir="auto">
    <div class="section" v-for="(i, index) in singlePost.body" :key="index">
      <h3 v-if="i.type === 'header'">{{i.data.text | sanitize}}</h3>
      <p class="bodyParagraph" v-else-if="i.type === 'paragraph'">{{i.data.text | sanitize}}</p>
      <img v-else-if="i.type === 'image'" :src="i.data.file.url" alt="" class="imageItemInBody">
    </div>
  </div>
  <p style="margin-bottom: 5rem; opacity:0; font-size:15px;">margin</p>
  </div>
  <div class="editorContainer" v-show="editMode">
  <div id="editor" dir="rtl" spellcheck="false"></div>
  </div>
</div>
</template>

<script>
import loading from '../components/loading'
import {mapActions, mapState} from 'vuex'
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
export default {
  name: "singlePost",
  components: {loading},
  data(){
    return {
      isLoading: true,
      isFollowLoading: false,
      colorBtn: 'rgb(70,126,246)',
      border: '',
      gradient: true,
      followText: 'follow',
      isFollowed: false,
      isLiked: false,
      likeCount: 0,
      editMode: false,
      editText: 'Edit Post'
    }
  },
  computed:{
    ...mapState(['singlePost', 'baseURl', 'followStatus', 'errMassage', 'userProfile', 'token'])
  },
  methods: {
    loadEditor(){
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
        },
        data:{
          blocks: this.singlePost.body
        }
      })
    },
    ...mapActions(['getSinglePost', 'toggleFollow', 'getFollowStatus', 'toggleLike']),
    getNotif() {
      this.isFollowLoading = false
      if (this.errMassage) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'top-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
        this.$store.commit('changeErrMsg', null)
      }
    },
    follow() {
      this.isFollowLoading = true
      this.toggleFollow(this.singlePost.username).then(() => {
        if (!(this.errMassage)) {
          if (!(this.isFollowed)) {
            this.gradient = false
            this.border = 'followBtn'
            this.colorBtn = 'rgba(255,255,255,0)'
            this.followText = 'Unfollow'
            this.isFollowed = !(this.isFollowed)
          } else {
            this.gradient = true
            this.border = ''
            this.colorBtn = 'rgb(70,126,246)'
            this.followText = 'follow'
            this.isFollowed = !(this.isFollowed)
          }
        }
        this.getNotif()
      }).catch(() => {
        this.getNotif()
      })
    },
    loadBtnStyle() {
      if ((this.isFollowed)) {
        this.gradient = false
        this.border = 'followBtn'
        this.colorBtn = 'rgba(255,255,255,0)'
        this.followText = 'Unfollow'
      } else {
        this.gradient = true
        this.border = ''
        this.colorBtn = 'rgb(70,126,246)'
        this.followText = 'follow'
      }
    },
    toggle_Like(id){
      if(this.isLiked) {
        this.likeCount -= 1
      }
      else {
        this.likeCount += 1
      }
      this.isLiked = !this.isLiked
      this.toggleLike(id)
    }
  },
  created() {
    this.getSinglePost(this.$route.params.id).then(()=>{
      this.isLoading = false
      this.isLiked = this.singlePost.isLiked
      this.likeCount = this.singlePost.likes
      this.getFollowStatus(this.singlePost.username).then(() => {
        this.isFollowed = this.followStatus
        this.loadBtnStyle()
      })
    });
  },
  mounted() {

  }
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
.header {
  width:100%;
  height:25vh;
  display: flex;
  justify-content:center;
  justify-items: center;
}
#headerImage{
  width: 100%;
  height:100%;
  object-fit: cover;
}
#avatarImage{
  width:100%;
  height:100%;
  object-fit: cover;
}
#avatarContainer {
  position:absolute;
  top:18vh;
}
#username{
  position:absolute;
  top:30vh;
  font-size: 20px;
}
.overlayLoad{
  position:fixed;
  top:0;
  right:0;
  background-color: var(--vs-navs);
  width:100%;
  height:100vh;
  z-index: 10;
}
.loader {
  margin-top: 30vh;
}
.interactions {
  margin-top: 3rem;
  padding: 30px;
}

hr {
  margin-top: -1rem;
  width: 60%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
}
.imageItemInBody {
  width:100%;
  height:auto;
  max-width:600px;
  float:left;
}
.section {
  font-family: Yekan;
  text-align:right;
}
.body {
  margin-top:2rem;
  padding:15px;
}
.bodyParagraph, .single >>> .ce-paragraph{
  font-size: 18px;
  line-height:2;
  text-align:right;
}
.editorContainer{
  margin: 30px;
}
</style>