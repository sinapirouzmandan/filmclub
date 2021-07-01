<template>
<div>
  <div class="header">
    <div class="back" @click="$router.push('/profile')">
      <i class="iconify" data-icon="bx:bx-arrow-back"></i>
    </div>
    <span id="commentHeader">Comments</span>
  </div>
  <div class="singleComment" v-for="(comment) in postComments" :key="comment._id">
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
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "comments",
  methods:{
    ...mapActions(['getPostComments'])
  },
  computed:{
    ...mapState(['postComments'])
  },
  created() {
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
</style>