<template>
<div id="container">
  <div class="header">
    <div class="back" @click="$router.back()">
      <i class="iconify" data-icon="bx:bx-arrow-back"></i>
    </div>
    <span id="commentHeader">Comments</span>
    <div class="delete" v-if="selectedOne !== false" @click="deleteComment">
      <i class="iconify" data-icon="mdi:trash-can-outline"></i>
    </div>
    <div class="close" @click="selectComment(selectedOne)"  v-if="selectedOne !== false">
      <i class="iconify" data-icon="mdi:close"></i>
    </div>
  </div>
  <loading v-if="isLoading"/>
  <div class="singleComment hasChild" v-for="(comment) in postComments" :key="comment._id"  :id="comment.specialID ? comment.specialID : comment._id ">
    <vs-avatar class="avatar" circle>
      <img style="object-fit: cover; width:100%; height:100%;" :src="comment.userId.avatar ? (baseURl +  comment.userId.avatar) : alternativeAvatar" alt="">
    </vs-avatar>
    <div class="body" v-long-press="500"
         @long-press-start="selectComment(comment.specialID ? comment.specialID : comment._id, comment._id)">
      <p class="commentText"><span class="username">{{ comment.userId.username }}</span> <span class="yekan">{{comment.content}} </span></p>
      <div class="sub">
        <span class="subTexts">
          <span v-if="comment.date !== 0">{{comment.date}}</span>
          <span v-else>Just now</span>
          <span style="margin-left: 10%; display: inline-block;" @click="reply=true; inputPlaceholder=`reply to ${comment.userId.username}` ; parent=comment._id;upperParent=comment._id; focus(comment._id)">reply</span>
        </span>
        <br>
        <div class="replies" @click="loadChilds($event, comment._id, comment._id)" v-if="comment.hasChild">
          <span>---- view replies</span>
        </div>
      </div>
    </div>
    <div class="singleComment childs hasChild" v-for="(childComment) in comment.child" :key="childComment._id"  :id="childComment.specialID ? childComment.specialID : childComment._id " v-long-press="500"
         @long-press-start="selectComment(childComment.specialID ? childComment.specialID : childComment._id, comment._id)" >
      <vs-avatar class="avatar" circle>
        <img style="object-fit: cover;width:100%; height:100%;" :src="childComment.userId.avatar ? (baseURl +  childComment.userId.avatar) : alternativeAvatar" alt="">
      </vs-avatar>
      <div class="body">
        <p class="commentText"><span class="username">{{childComment.userId.username}}</span> {{childComment.content}}</p>
        <div class="sub">
        <span class="subTexts">
          <span v-if="childComment.date !== 0">{{childComment.date}}</span>
          <span v-else>Just now</span>
          <span style="margin-left: 10%; display: inline-block;" @click="reply=true; inputPlaceholder=`reply to ${childComment.userId.username}`; parent=childComment._id; upperParent=comment._id; focus(comment._id)">reply</span>
        </span>
          <br>
          <div class="replies" @click="loadChilds($event, childComment._id, comment.id)" v-if="childComment.hasChild">
            <span>---- view replies</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="addNewComment">
    <div @click="postComment()">
    <i class="iconify addCommentIcon" data-icon="mdi:message-reply"></i>
    </div>
    <vs-input border v-model="commentText" :placeholder="inputPlaceholder" id="commentInput"/>
  </div>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import LongPress from 'vue-directive-long-press'
import loading from '../components/loading'
export default {
  name: "comments",
  components:{
    loading
  },
  directives: {
    'long-press': LongPress
  },
  data(){
    return {
      isLoading: false,
      commentText: '',
      inputPlaceholder: 'New comment',
      reply: false,
      parent: null,
      upperParent: null,
      selectedOne: false,
      deleteID: '',
      page: 2,
      postID: ''
    }
  },
  methods: {
    ...mapActions(['getPostComments', 'addNewComment', 'getCommentsByParent', 'getUserProfile', 'deleteAComment']),
    postComment() {
      let comment = {
        text: this.commentText,
        postID: this.postID,
        spacialID: 'newComment' + Math.floor(Math.random() * 1000),
        parent: null,
        upperParent: null
      }
      if (this.reply) {
        comment.parent = this.parent
        comment.upperParent = this.upperParent
      }
      this.addNewComment(comment).then(() => {
        var element = document.querySelector(`#${comment.spacialID}`);
        element.scrollIntoView({behavior: 'smooth', block: 'end'});
      })
      this.commentText = ''
      this.reply = false
      this.inputPlaceholder = 'New comment'
      document.getElementById(this.parent).style.backgroundColor = 'transparent'
      this.parent = null
    },
    focus(id) {
      document.getElementById(id).style.backgroundColor = 'rgba(172,172,172,0.64)'
    },
    unfocus() {
      document.getElementById(this.selectedOne).style.backgroundColor = 'transparent'
    },
    loadChilds(event, parent, upperParent) {
      let parentObj = {
        parent: parent,
        upperParent: upperParent
      }
      this.getCommentsByParent(parentObj).then(() => {
        event.target.innerHTML = ''
      })
    },
    selectComment(id, del) {
      if (this.userProfile.role == 'reviewer' || id.indexOf('newComment') > -1) {
        if (this.selectedOne === false) {
          this.deleteID = del
          this.focus(id)
          this.selectedOne = id
        } else {
          this.unfocus()
          this.selectedOne = false
        }
      } else if (this.selectedOne) {
        this.unfocus()
        this.selectedOne = false
      }
    },
    deleteComment() {
      this.deleteAComment(this.deleteID)
      document.getElementById(this.selectedOne).style.display = 'none'
      this.selectedOne = false
      this.deleteID = ''
    },
    getMoreComments() {
      if (this.hasNextPage){
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            const getObj = {
              postID: this.postID,
              page: this.page
            }
            if (this.hasNextPage) {
              this.getPostComments(getObj).then(() => {
                this.isLoading = false
                this.page += 1
              })
            }
          }
        }
      }
    }
  },
  computed:{
    ...mapState(['postComments', 'baseURl', 'alternativeAvatar', 'userProfile', 'hasNextPage']),
  },
  created() {
    this.postID = this.$route.params.postID
    this.isLoading = true
    this.$store.commit('toggleNavbar', false);
    if(this.$route.params.postID){
      const getObj = {
        postID: this.postID,
        page: 1
      }
      this.getPostComments(getObj).then(()=>{
        this.isLoading =false
        this.getMoreComments()
      })
    }
    else {
      // this.$router.push('/')
    }
  },
  mounted() {
    this.getUserProfile()
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:1.5rem;
}
.back {
  margin-left: 5vw;
  font-size: 25px;
}
.delete{
  position:absolute;
  right: 7vw;
  font-size: 25px;
  text-align: right;
}
.close{
  position:absolute;
  right: 20vw;
  font-size: 25px;
  text-align: right;
}
#commentHeader{
  margin-left:5vw;
  font-size: 20px;
}
.singleComment{
  width:100%;
  height:auto;
  box-sizing: border-box;
  padding: 10px 10px;
}
.avatar{
  float: left;
}
.avatar img{
  width:40px;
  height:40px;
}
.body{
  text-align:left;
  font-size:15px;
  margin-left: 1rem;
  position: relative;
  top:-1rem;
  margin-left: 3.5rem;
}
.commentText{
  word-break: break-all;
}
.username {
  font-weight: bold;
  text-align:left;
}
.sub {
  opacity:0.7;
  font-size: 13px;
  margin-top:-0.7rem;
}
.addNewComment {
  position:fixed;
  bottom:0;
  box-sizing: border-box;
  height:60px;
  width:100%;
  background-color:  var(--vs-navs);
  display: flex;
  align-items: center;
  z-index:2;
}
.addCommentIcon {
  font-size: 18px;
  margin-left: 20px;
  border: 1px solid white;
  border-radius: 50%;
  padding: 7px;
}
#commentInput {
  width:80%;
  margin-left: 10px;

}
#commentInput>>> .vs-input {
  color: #d5cccc;
  font-size: 15px;
}
#container {
  padding-bottom: 4rem;
}
.replies {
  font-size: 14px;
  opacity:0.5;
  margin-top: 0.5rem;
}
.childs {
  margin-left:10%;
  width:90%;
}
.yekan{
  font-family:Yekan;
}
</style>