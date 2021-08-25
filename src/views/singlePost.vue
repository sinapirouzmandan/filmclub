<template>
<div class="single">
  <div id="blur">
  <div class="back" @click="routerBack">
    <i class="iconify" data-icon="bx:bx-arrow-back"></i>
  </div>
  <div class="back share" @click.prevent="showOptions">
    <i class="iconify" data-icon="mdi:dots-vertical"></i>
  </div>
    <div @click="hideOptions">
  <div class="overlayLoad" v-if="isLoading">
    <div class="loader">
      <loading/>
    </div>
  </div>
  <div class="header">
    <img :src="baseURl + singlePost.poster" :alt="'header image of movie ' + singlePost.title" id="headerImage">
    <vs-avatar circle size="70" id="avatarContainer" @click="$router.push(`/users/${singlePost.username}`)">
      <img :src="userAvatar" alt="user avatar" id="avatarImage">
    </vs-avatar>
    <span id="username" @click="$router.push(`/users/${singlePost.username}`)">{{singlePost.username}}</span>
  </div>
  <div class="interactions">
    <vs-row>
      <vs-col w="6">
        <vs-row>
        <vs-col w="6">
          <router-link :to="{ name: 'comments', params: {postID: singlePost._id } }">
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
          </router-link>
      </vs-col>
        <vs-col w="6">
          <vs-button
              @click="toggle_Like(singlePost._id)"
              circle
              danger
              icon
              :class="backgroundCol"
              style="width: 50px; height: 50px; margin-top: -5px; border: 1px solid red;"
              :active="isLiked"
          >
            <i class="iconify" data-icon="bx:bxs-heart" data-inline="false" style="font-size: 20px;"></i>
          </vs-button>
          <br>
          <div style="width:55px; text-align: center; font-weight: 700; margin-top:-10px; font-size: 14px;" @click="$router.push(`/likes/${singlePost._id}`)">{{ likeCount }} likes</div>
        </vs-col>
        </vs-row>
      </vs-col>
      <vs-col w="6">
        <vs-button
            v-if="singlePost.username !== userProfile.username && userProfile.role !== 'reviewer'"
            :class="border"
            :color="colorBtn"
            :gradient="gradient"
            :loading="isFollowLoading"
            style="width:100%;"
            @click="follow"
        >
          {{ followText }}
        </vs-button>
        <div id="reviewer" v-else-if="userProfile.role === 'reviewer'">
          <vs-button
            color="rgb(70,126,246)"
            gradient
            style="width:100%;"
            :loading="isSaving"
            :disabled="disableEdit"
            @click="reviewerEditor();"
        >
          {{editText}} /  as reviewer
        </vs-button>
          <vs-button
              v-if="loadedEditor"
              color="rgb(207,20,60)"
              style="width:100%;"
              @click="banAPost"
          >
            Ban post
          </vs-button>
        </div>
        <div id="useredit" v-else-if="singlePost.username === userProfile.username">
        <vs-button
            color="rgb(70,126,246)"
            gradient
            style="width:100%;"
            :loading="isSaving"
            :disabled="disableEdit"
            @click="editText='Save'; editMode = true; loadEditor();"
        >
          {{editText}}
        </vs-button>
          <vs-button
              v-if="loadedEditor"
              color="rgb(207,20,60)"
              style="width:100%;"
              @click="deletePost"
          >
            Delete post
          </vs-button>
        </div>
      </vs-col>
    </vs-row>
  </div>
  <hr>
      <h1 style="font-size: 20px;">{{singlePost.title}}</h1>
  <div class="hashtags" v-if="editMode">
    <div class="hashtag_item">
      <vs-checkbox primary v-model="critic">
        #critic
      </vs-checkbox>
    </div>
    <div class="hashtag_item">
      <vs-checkbox danger v-model="spoiler">
        #spoilers
      </vs-checkbox>
    </div>
  </div>
  <div v-show="!editMode">
    <div class="displayHashtags">
      <span v-if="singlePost.critic">#critic</span>
      <span v-if="singlePost.spoiler" style="color:red; margin-left: 1rem;">#spoiler</span>
      <span></span>
    </div>
  <div class="body" id="textBody"  dir="auto">
    <div class="section" v-for="(i, index) in singlePost.body" :key="index">
      <h3 v-if="i.type === 'header'">{{i.data.text | sanitize}}</h3>
      <p class="bodyParagraph" v-else-if="i.type === 'paragraph'">{{i.data.text | sanitize}}</p>
      <figure v-else-if="i.type === 'image'">
        <img v-lazy="i.data.file.url" :alt="i.data.caption" class="imageItemInBody">
        <figcaption>{{i.data.caption | sanitize}}</figcaption>
      </figure>

    </div>
  </div>
  <p style="margin-bottom: 5rem; opacity:0; font-size:15px;">margin</p>
  </div>
  <div class="editorContainer" v-show="editMode">
  <div id="editor" dir="rtl" spellcheck="false"></div>
  </div>
  <div id="comments">
    <router-link :to="{ name: 'comments', params: {postID: singlePost._id } }">
      <span style="opacity:0.7;">view all {{singlePost.comments}} comments</span>
    </router-link>
  </div>
  </div>
  </div>
  <div id="options">
      <h3>{{singlePost.title}}</h3>
    <div class="sections">
      <div class="share" @click="sharePost(); hideOptions()">
        <p>Share Post</p>
      </div>
<div class="report" @click="reportActive=true; hideOptions()">
      <p>Report</p>
</div>
    </div>
  </div>
  <vs-dialog blur v-model="reportActive">
    <template #header>
      <h4 class="not-margin">
        Why are you reporting this Post
      </h4>
    </template>
        <div class="reportItem" @click="reportPost(3)">
          It's spam
        </div>
        <div class="reportItem" @click="reportPost(0)">
          I just don't like it
        </div>
        <div class="reportItem" @click="reportPost(2)">
          Hate speech or symbols
        </div>
        <div class="reportItem" @click="reportPost(1)">
          request review for other reasons
        </div>
  </vs-dialog>
</div>
</template>

<script>
import loading from '../components/loading'
import {mapActions, mapState} from 'vuex'
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import swal from "sweetalert";
import PullToRefresh from "pulltorefreshjs";
export default {
  name: "singlePost",
  metaInfo() {
  return {
    title: this.singlePost.title,
    titleTemplate: '%s | FilmClub',
    meta: [
      {
        vmid: "keyword",
        name: "keyword",
        content: `${this.singlePost.title}, ${this.singlePost.authorId.username} `,
      },
      {
        vmid: "description",
        name: "description",
        content: `A movie post about ${this.singlePost.title} movie and written by ${this.singlePost.authorId.username} `,
      }
    ],
  }
},
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
      editText: 'Edit Post',
      isSaving: false,
      loadedEditor: false,
      disableEdit: false,
      reason: 'default',
      critic:false,
      spoiler: false,
      reportActive:false,
    }
  },
  computed:{
    ...mapState(['singlePost', 'baseURl', 'followStatus', 'errMassage', 'userProfile', 'token', 'alternativeAvatar']),
    userAvatar() {
      if (this.singlePost.avatar) {
        return this.baseURl + this.singlePost.avatar
      } else {
        return this.alternativeAvatar
      }
    },
    backgroundCol() {
      if (!this.isLiked) {
        return 'transparent'
      }
      else {
        return 'redBack'
      }
    }
  },
  methods: {
    loadEditor() {
      if (this.editMode && !this.loadedEditor) {
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
        data: {
          blocks: this.singlePost.body
        }
      })
        this.loadedEditor = true;
    }
      else if(this.editMode && this.loadedEditor){
        this.isSaving = true
        this.editor.save().then((outputData) => {
            let updateObj = {
              postID: '',
              body: outputData,
              reason: 'default',
              target: 'default',
              spoiler: false,
              critic: false
            }
            updateObj.postID = this.singlePost._id
            updateObj.target = this.singlePost.username
            updateObj.reason = this.reason
            updateObj.spoiler = this.spoiler
            updateObj.critic = this.critic
            this.$store.dispatch('updatePost', updateObj).then(()=>{
              if (!this.errMassage){
                this.isSaving = false
                this.editMode = false
                this.editText= 'updated successfully'
                this.disableEdit = true
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
              }
            })
          this.isSaving = false
        }).catch(() => {
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: '#296186',
            title: "Can't save your post right now. come back later or refresh the page",
          })
          this.isSaving = false
          this.$store.commit('changeErrMsg', null)
        });
      }
    },
    reviewerEditor(){
      if(!this.loadedEditor) {
        this.reason = ''
        swal("The reason to edit this post", {
          content: "input",
        }).then((value) => {
          if(value){
            this.reason = value;
            this.editText='Save';
            this.editMode = true;
            this.loadEditor()
          }
        });
      }
      else {
        this.loadEditor()
      }
    },
    ...mapActions(['getSinglePost', 'toggleFollow', 'getFollowStatus', 'toggleLike', 'deleteAPost', 'getMyPosts', 'report']),
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
    },
    deletePost() {
      swal({
        title: "Are you sure?",
        text: "This post will be permanently deleted",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      }).then((willDelete) => {
        if (willDelete) {
          let delObj = {
            postID: this.singlePost._id,
            reason: 'default',
            target: 'default'
          }
          this.deleteAPost(delObj).then(()=>{
            this.getMyPosts()
            this.$router.push('/profile')
            this.getNotif()
          }).catch(()=>{
            this.getNotif()
          })
        }
      });
    },
    banAPost(){
      let delObj = {
        postID: this.singlePost._id,
        reason: 'default',
        target: 'default'
      }
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
        root: "",
      }).then((willDelete) => {
        if (willDelete) {
            delObj.reason = this.reason
            delObj.target = this.singlePost.username
            this.deleteAPost(delObj).then(()=>{
              this.getMyPosts()
              this.$router.push('/profile')
              this.getNotif()
            })
        }
      });
    },
    sharePost() {
      if (navigator.share) {
        navigator.share({
          title: `Film Club`,
          text: `🎥 Read this ${this.singlePost.title} Post on filmClub.`,
          url: window.location
        }).then(() => {
          console.log('Thanks for sharing!');
        })
            .catch(console.error);
      } else {
        try {
          if (window.clipboardData && window.clipboardData.setData) {
            return window.clipboardData.setData("Text", `🎥 Read this ${this.singlePost.title} Post on filmClub.`);

          }
          else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            let location = window.location.href
            textarea.textContent = `🎥 Read this ${this.singlePost.title} Post on filmClub :\n ${location}`;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
              return document.execCommand("copy");
            }
            catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return false;
            }
            finally {
              document.body.removeChild(textarea);
            }
          }
        }
        catch (e) {
          alert(e)
        }
        finally {
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: 'rgba(47,47,47,0.62)',
            title: ' your device does not support sharing. link copied to clipboard',
          })
        }
      }
    },
    routerBack() {
     this.$router.push('/')
    },
    showOptions(){
      document.getElementById('options').style.transform = 'translateY(0)'
      document.getElementById('blur').style.filter='brightness(0.8)'
    },
    hideOptions() {
      document.getElementById('options').style.transform = 'translateY(30vh)'
      document.getElementById('blur').style.filter='brightness(1)'
    },
    reportPost(type) {
      const report = {
        content_type: 'Post',
        refrence: this.singlePost._id,
        type: type
      }
      this.report(report)
      this.reportActive=false
      this.$vs.notification({
        duration: 3000,
        progress: 'auto',
        border: null,
        position: 'bottom-center',
        color: '#296186',
        title: 'Thanks for your report we will investigate on the problem soon',
      })
    }
  },
  created() {
    this.$store.commit('toggleNavbar', false);
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
    var self = this
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        self.getSinglePost(self.$route.params.id)
      }
    });
  }
}
</script>

<style scoped>
.back {
  margin-left: 7vw;
  font-size: 25px;
  text-align: left;
  position: absolute;
  top:20px;
  background-color: rgba(255, 255, 255, 0.24);
  width:50px;
  height:50px;
  display: flex;
  align-items:center;
  justify-content:center;
  border-radius: 50%;
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
  margin: 1rem auto;
}
.section {
  font-family: Yekan,sans-serif;
}
.body {
  margin-top:-1rem;
  padding:15px;
}
.bodyParagraph, .single >>> .ce-paragraph{
  font-size: 18px;
  line-height:2;
  text-align:right;
  font-family: Yekan;
}
h3{
  font-family: Yekan;
}
.editorContainer{
  margin: 30px;
}
#comments{
  margin-bottom: 70px;
}
.single >>> a{
  color:white;
  text-decoration: none;
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
.displayHashtags {
margin-top:2rem;
}
.share {
  margin-left: 0;
  right:2rem;
}
.followBtn {
  background-color: rgba(70, 126, 246, 0.22);
}
.transparent{
  background-color: transparent;
}
.redBack{
  background-color: red;
}
#options{
  position: fixed;
  bottom: 0;
  right:0;
  width:100%;
  height: 30vh;
  z-index:10;
  background-color: var(--vs-navs);
  font-size:1rem;
  transform: translateY(30vh);
  transition: 0.1s;
}
.sections{
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  box-sizing: border-box;
  padding: 0 20px;
}
#blur {
  filter: brightness(1);
  transition: 0.1s;
}
.reportItem{
  width:100%;
  height:40px;
  color: #d9d9d9;
  text-align: left;
}
.reportTxt{
  color: #d9d9d9;
  text-align: left;
  font-size: 14px;
}
</style>