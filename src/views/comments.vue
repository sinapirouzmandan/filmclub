<template>
  <div id="container">
    <div class="header">
      <div class="back" @click="$router.push(`/post/post/${$route.params.postID}`)">
        <i class="iconify" data-icon="bx:bx-arrow-back"></i>
      </div>
      <span id="commentHeader">Comments</span>
      <div v-if="selectedOne !== false&& !canReport" class="delete" @click="deleteComment">
        <i class="iconify" data-icon="mdi:trash-can-outline"></i>
      </div>
      <div v-if="selectedOne !== false && !canReport" class="close" @click="selectComment(selectedOne)">
        <i class="iconify" data-icon="mdi:close"></i>
      </div>
      <div v-if="canReport" class="close" @click="selectComment(lastSelectedForReport)">
        <i class="iconify" data-icon="mdi:close"></i>
      </div>
      <div v-if="canReport" class="delete" @click="reportComment(0)">
        <i class="iconify" data-icon="mdi:alert-circle-outline"></i>
      </div>
    </div>
    <loading v-if="isLoading"/>
    <div v-for="(comment) in postComments" :id="comment.specialID ? comment.specialID : comment._id " :key="comment._id"
         class="singleComment hasChild">
      <vs-avatar circle class="avatar">
        <img :src="comment.userId.avatar ? (baseURl +  comment.userId.avatar) : alternativeAvatar"
             alt="user avatar" style="object-fit: cover; width:100%; height:100%;">
      </vs-avatar>
      <div v-long-press="500" class="body"
           @long-press-start="selectComment(comment.specialID ? comment.specialID : comment._id, comment._id)">
        <p><span class="username" @click="$router.push(`/users/${comment.userId.username}`)">{{
            comment.userId.username
          }}</span> <span class="yekan" dir="rtl">{{ comment.content }} </span></p>
        <div class="sub">
        <span class="subTexts">
          <span>{{ comment.createdAt | dateToString }}</span>
          <span style="margin-left: 10%; display: inline-block;"
                @click="reply=true; inputPlaceholder=`reply to ${comment.userId.username}` ; parent=comment._id;upperParent=comment._id; focus(comment._id)">reply</span>
        </span>
          <br>
          <div v-if="comment.hasChild" class="replies" @click="loadChilds($event, comment._id, comment._id)">
            <span>---- view replies</span>
          </div>
        </div>
      </div>
      <div v-for="(childComment) in comment.child" :id="childComment.specialID ? childComment.specialID : childComment._id " :key="childComment._id"
           v-long-press="500" class="singleComment childs hasChild"
           @long-press-start="selectComment(childComment.specialID ? childComment.specialID : childComment._id, comment._id)">
        <vs-avatar circle class="avatar">
          <img :src="childComment.userId.avatar ? (baseURl +  childComment.userId.avatar) : alternativeAvatar"
               alt="user avatar"
               style="object-fit: cover;width:100%; height:100%;">
        </vs-avatar>
        <div class="body">
          <p><span class="username"
                   @click="$router.push(`/users/${comment.userId.username}`)">{{ childComment.userId.username }}</span>
            <span class="yekan" dir="rtl">{{ childComment.content }}</span></p>
          <div class="sub">
        <span class="subTexts">
          <span>{{ childComment.createdAt | dateToString }}</span>
          <span style="margin-left: 10%; display: inline-block;"
                @click="reply=true; focusType(); inputPlaceholder=`reply to ${childComment.userId.username}`; parent=childComment._id; upperParent=comment._id; focus(comment._id)">reply</span>
        </span>
            <br>
            <div v-if="childComment.hasChild" class="replies" @click="loadChilds($event, childComment._id, comment.id)">
              <span>---- view replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addNewComment" @keypress.enter="postComment">
      <div @click="postComment()">
        <vs-avatar circle size="40" style="margin-left: 0.5rem;">
          <img :src="userProfile.avatar ? baseURl + userProfile.avatar : alternativeAvatar" alt="user avatar"
               style="width:100%; height:100%; object-fit: cover;">
        </vs-avatar>
      </div>
      <vs-input id="commentInput" v-model="commentText" :placeholder="inputPlaceholder" border dir="right"/>
      <span class="sendBtn" @click="postComment()">Post</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import LongPress from 'vue-directive-long-press'
import loading from '../components/loading'

export default {
  name: "comments",
  metaInfo: {
    title: 'Comments',
    titleTemplate: '%s | FilmClub'
  },
  components: {
    loading
  },
  directives: {
    'long-press': LongPress
  },
  data() {
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
      postID: '',
      canReport: false,
      lastSelectedForReport: null
    }
  },
  methods: {
    ...mapActions(['getPostComments', 'addNewComment', 'getCommentsByParent', 'getUserProfile', 'deleteAComment', 'report']),
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
      if (this.selectedOne) {
        this.unfocus()
      }
      this.selectedOne = id
      document.getElementById(id).style.backgroundColor = 'rgba(172,172,172,0.64)'
    },
    focusType() {
      document.getElementById('commentInput').click()
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
      if ((this.userProfile.role == 'reviewer' || id.indexOf('newComment') > -1) && !this.canReport) {
        if (this.selectedOne === false) {
          this.deleteID = del
          this.focus(id)
          this.selectedOne = id
        } else {
          this.unfocus()
          this.selectedOne = false
          this.reply = false
          this.parent = null
          this.upperParent = null
          this.inputPlaceholder = 'New Comment'
        }
      } else if (this.selectedOne) {
        this.unfocus()
        this.selectedOne = false
      } else {
        if (this.canReport) {
          this.selectedOne = this.lastSelectedForReport
          this.unfocus()
          this.selectedOne = false
          this.canReport = false
        } else {
          document.getElementById(id).style.backgroundColor = 'rgba(172,172,172,0.64)'
          this.canReport = true
          this.lastSelectedForReport = id
        }

      }
    },
    deleteComment() {
      this.deleteAComment(this.deleteID)
      document.getElementById(this.selectedOne).style.display = 'none'
      this.selectedOne = false
      this.deleteID = ''
    },
    getMoreComments() {
      if (this.hasNextPage) {
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
    },
    reportComment(type) {
      const report = {
        content_type: 'Comment',
        refrence: this.lastSelectedForReport,
        type: type
      }
      this.report(report)
      this.selectComment(this.lastSelectedForReport)
      this.$vs.notification({
        duration: 2000,
        progress: 'auto',
        border: null,
        position: 'top-center',
        color: '#296186',
        title: 'Comment reported successfully',
      })
    }
  },
  computed: {
    ...mapState(['postComments', 'baseURl', 'alternativeAvatar', 'userProfile', 'hasNextPage']),
  },
  created() {
    this.postID = this.$route.params.postID
    this.isLoading = true
    this.$store.commit('toggleNavbar', false);
    if (this.$route.params.postID) {
      const getObj = {
        postID: this.postID,
        page: 1
      }
      this.getPostComments(getObj).then(() => {
        this.isLoading = false
        this.getMoreComments()
      })
    } else {
      this.$router.push('/')
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
  margin-bottom: 1.5rem;
}

.back {
  margin-left: 5vw;
  font-size: 25px;
}

.delete {
  position: absolute;
  right: 7vw;
  font-size: 25px;
  text-align: right;
}

.close {
  position: absolute;
  right: 20vw;
  font-size: 25px;
  text-align: right;
}

#commentHeader {
  margin-left: 5vw;
  font-size: 20px;
}

.singleComment {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 10px 10px;
}

.avatar {
  float: left;
}

.avatar img {
  width: 40px;
  height: 40px;
}

.body {
  text-align: left;
  font-size: 15px;
  margin-left: 1rem;
  position: relative;
  top: -1rem;
  margin-left: 3.5rem;
}

.commentText {
  word-break: break-all;
  direction: rtl;
}

.username {
  font-weight: bold;
  text-align: left;
}

.sub {
  opacity: 0.7;
  font-size: 13px;
  margin-top: -0.7rem;
}

.addNewComment {
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  background-color: var(--vs-navs);
  display: flex;
  align-items: center;
  z-index: 2;
}

.addCommentIcon {
  font-size: 18px;
  margin-left: 20px;
  border: 1px solid white;
  border-radius: 50%;
  padding: 7px;
}

#commentInput {
  margin-left: 10px;

}

#commentInput >>> .vs-input {
  color: #d5cccc;
  font-size: 15px;
  text-align: right;
  direction: rtl;
  width: 100%;
}

.vs-input-parent {
  width: 65%;
}

#container {
  padding-bottom: 4rem;
}

.replies {
  font-size: 14px;
  opacity: 0.5;
  margin-top: 0.5rem;
}

.childs {
  margin-left: 10%;
  width: 90%;
}

.yekan {
  font-family: Yekan;
}

.sendBtn {
  font-size: 14px;
  margin-left: 3%;
  color: #6f6fff;
}
</style>