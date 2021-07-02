<template>
<div id="container">
  <div class="header">
    <div class="back" @click="$router.back()">
      <i class="iconify" data-icon="bx:bx-arrow-back"></i>
    </div>
    <span id="commentHeader">Comments</span>
  </div>
  <div class="singleComment" v-for="(comment) in postComments" :key="comment._id"  :id="comment.specialID">
    <vs-avatar class="avatar" circle>
      <img src="" alt="">
    </vs-avatar>
    <div class="body">
      <p class="commentText"><span class="username">xina0x</span>  {{comment.content}}</p>
      <div class="sub">
        <span class="subTexts">
          <p v-if="comment.date !== 0">{{comment.date}} hours</p>
          <p v-else>Just now</p>
        </span>
      </div>
    </div>
  </div>
  <div class="addNewComment">
    <div @click="postComment()">
    <i class="iconify addCommentIcon" data-icon="mdi:message-reply"></i>
    </div>
    <vs-input border v-model="commentText" :placeholder="'new comment'" id="commentInput"/>
  </div>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "comments",
  data(){
    return {
      commentText: ''
    }
  },
  methods:{
    ...mapActions(['getPostComments', 'addNewComment']),
    postComment(){
      let comment = {
        text: this.commentText,
        postID: this.postID,
        spacialID: 'newComment' + Math.floor(Math.random() * 1000)
      }
      this.addNewComment(comment).then(()=>{
        var element = document.querySelector(`#${comment.spacialID}`);
        element.scrollIntoView({ behavior: 'smooth', block: 'end'});
      })
    }
  },
  computed:{
    ...mapState(['postComments'])
  },
  created() {
    this.$store.commit('toggleNavbar', false);
    if(this.postID){
      this.getPostComments(this.postID)
    }
    else {
      this.$router.push('/')
    }
  },
  props: {
    postID: {
      type: String,
      required: true
    }
  }
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
#commentHeader{
  margin-left:5vw;
  font-size: 20px;
}
.singleComment{
  width:100%;
  height:auto;
  box-sizing: border-box;
  padding: 3px 10px;
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
}
#container {
  padding-bottom: 4rem;
}
</style>