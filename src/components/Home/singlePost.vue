<template>
  <div>
    <loading style="margin-top:20vh;" v-if="isLoading"/>
    <loading v-if="isLoadingMore" style="height:70px;"/>
  <vs-col class="home" justify="space-around" w="12" v-for="(post) in homePosts" :key="post.createdAt" :id="post.id">
    <vs-card>
      <template #title>
        <img :src="post.authorAvatar ? (baseURl + post.authorAvatar) : alternativeAvatar"
             @click="$router.push(`/users/${post.author}`)"
             style="width: 30px; height: 30px; border-radius: 50%; float: left; object-fit:cover;" alt="user profile">
        <p class="userId" @click="$router.push(`/users/${post.author}`)">{{post.author}}</p>
        <vs-button
            @click="toggleWatchListPost(post.imdb_id); post.isWatchList = false"
            circle
            color="rgb(59,89,153)"
            flat
            icon
            style="display: inline-block; float: right; margin-top: 0;"
            :active="post.isWatchList"
        >
          <i class="iconify" data-icon="bx:bx-bookmark" data-inline="false"></i>
        </vs-button>
        <vs-button
            @click="togglerLike(post)"
            circle
            color="rgb(59,89,153)"
            flat
            icon
            style="display: inline-block; float: right; margin-top: 0;"
            :active="post.isLiked"
        >
          <i class="iconify" data-icon="bx:bx-like" data-inline="false"></i>
          <p style="color: white; margin-left: 5px;"> {{post.likes}}</p>
        </vs-button>
        <h3>{{post.title}}</h3>
        <h6 style="margin-top: 10px; font-size: 15px;"><span style="color: crimson;" v-if="post.spoiler === true">#spoilers </span><span v-if="post.critic === true">#critic</span> </h6>
      </template>
      <template #img>
        <img id="postImage" v-lazy="post.poster"
             @click="$router.push(`/post/${post.title}/${post.id}`)"
             alt="Image Load Error">
      </template>
      <template #text>
        <i class="iconify" data-icon="bx:bxs-star"></i>
        <span> {{post.score}} / 10
        </span>
        <p dir="auto" class="right-text" v-show="!post.truncated">
          <br>
          {{post.body | sanitize}}
        </p>
        <p v-show="post.truncated" dir="auto" class="right-text" @click="post.truncated = false">
          <br>
          {{post.body | sanitize | truncate( 150, ' ...  more')}}
        </p>
        <router-link :to="{ name: 'comments', params: {postID: post.id } }">
          <span style="opacity:0.7;">view all {{post.comments}} comments</span>
        </router-link>
        <br>
        <vs-button
            @click="$router.push(`/post/${post.title}/${post.id}`)"
            class="fullPost"
            flat
            v-if="post.fullPostBtn"
            color="#293337"
            style="color:white;"
            active
        >
          View full post
        </vs-button>
        <small style="opacity: 0.3;" v-show="post.past !== 0"><br>{{post.past}}</small>
        <small style="opacity: 0.3;" v-show="post.past === 0"><br>Just now </small>
      </template>
    </vs-card>
  </vs-col>
  </div>
</template>

<script>
import  {mapState, mapActions, mapMutations} from 'vuex'
import loading from '../../components/loading'
// eslint-disable-next-line no-unused-vars
import {getHomePostsCache, putHomePosts} from '../../store/clientDB'
import PullToRefresh from "pulltorefreshjs";
export default {
  name: "singlePost",
  components: {loading},
  data() {
    return {
      isLoading: false,
      page:0,
      requestAgain: true,
      scrollPosition: null,
      isLoadingMore: false,
      firstMount: true
    }
  },
  computed:{
    ...mapState(['baseURl', 'homePosts', 'alternativeAvatar', 'homeHasNextPage', 'savedPos', 'homePageNumber'])
  },
  methods:{
    ...mapActions(['getHomePosts', 'toggleWatchListPost', 'toggleLike']),
    ...mapMutations(['fetchHomePostsFromCache', 'homePageNumberPlus']),
    togglerLike(post){
      this.toggleLike(post.id)
      if (post.isLiked){
        post.likes -= 1
        post.isLiked= false
      }
      else {
        post.likes += 1
        post.isLiked = true
      }
    },
    getNextPosts() {
      window.onscroll = () => {
        let topOfWindow = document.documentElement.scrollTop <= 600;
        if (topOfWindow && this.homeHasNextPage && !this.isLoadingMore) {
          this.isLoadingMore = true
          this.homePageNumberPlus()
          let homeObj = {
            page: this.homePageNumber,
            date: localStorage.getItem('lastRetreviedDate')
          }
          this.getHomePosts(homeObj).then(()=>{
            this.isLoadingMore = false
            putHomePosts(this.homePosts)
            if (!this.savedPos) {
              let firstPostOfPacket =  document.getElementById(this.homePosts[9].id)
              firstPostOfPacket.scrollIntoView({behavior: 'smooth', block: 'end'})
            }
        else {
              this.$store.commit('toggleHomeSavedPos', false)
            }
          })
        }
        }
      },
    latelyLoaded() {
      localStorage.setItem('lastRetreviedDate', this.homePosts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0,24))
      if (this.isLoadingMore) {
      this.isLoadingMore = true
      this.homePageNumberPlus()
      let homeObj = {
        page: 1,
        date: localStorage.getItem('lastRetreviedDate')
      }
      const lastLen = this.homePosts.length
      this.getHomePosts(homeObj).then(() => {
        putHomePosts(this.homePosts)
        const nowLen = this.homePosts.length
        let pointerPos = nowLen - lastLen
        let firstPostOfPacket = document.getElementById(this.homePosts[pointerPos].id)
        firstPostOfPacket.scrollIntoView({block: 'end'})
        setTimeout(() => {
          this.isLoadingMore = false
        }, 3000)
      })
      this.$store.commit('toggleHomeSavedPos', true)
      this.getNextPosts()
    }
    }
  },
  mounted() {
      var self = this
      PullToRefresh.init({
        mainElement: 'body',
        onRefresh() {
          self.isLoadingMore = true
          self.latelyLoaded()
        }
      });
    if (localStorage.getItem('firstTimeLoad') && localStorage.getItem('lastRetreviedDate') && this.homePosts.length === 0) {
      getHomePostsCache().then((posts)=>{
        localStorage.setItem('lastRetreviedDate', posts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0,24))
        this.fetchHomePostsFromCache(posts)
        this.getNextPosts()
        this.isLoadingMore = true
        this.homePageNumberPlus()
        let homeObj = {
          page: this.homePageNumber,
          date: localStorage.getItem('lastRetreviedDate')
        }
        const lastLen = this.homePosts.length
        this.getHomePosts(homeObj).then(()=>{
          putHomePosts(this.homePosts)
          const nowLen = this.homePosts.length
          let pointerPos  = nowLen - lastLen
          let firstPostOfPacket =  document.getElementById(this.homePosts[pointerPos].id)
          firstPostOfPacket.scrollIntoView({block: 'end'})
          setTimeout(()=>{
            this.isLoadingMore = false
          },3000)
        })
      })
      this.firstMount =false
    }
    else if(localStorage.getItem('firstTimeLoad') && localStorage.getItem('lastRetreviedDate')){
      this.latelyLoaded()
    }
    else {
      this.isLoading = true
      const homeObj = {
        page: 1
      }
      this.getHomePosts(homeObj).then(()=>{
        window.scrollTo(0,document.body.scrollHeight);
        window.scrollTo(0,document.body.scrollHeight);
        this.isLoading=false
        localStorage.setItem('firstTimeLoad', true)
        putHomePosts(this.homePosts)
        localStorage.setItem('lastRetreviedDate', this.homePosts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0,24))
        this.getNextPosts()
      }).catch(()=>{
        this.isLoading = false
      })
    }
},
}
</script>

<style scoped>

.home {
  display: flex;
  justify-content: center;
  justify-items: center;
}
.home >>> .vs-card {
  background-color: var(--vs-cardback) !important;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  cursor: auto;
}

.home >>> .vs-card__title {
  color: white;
  font-size: 17px;
  text-align: left;

}

.home >>> .userId {
  display: inline-block;
  margin-left: 7px;
  margin-top: 5px;
  margin-bottom: 30px;
  border-bottom: 1px solid white;
  cursor: pointer;
}

.home >>> .vs-card__text {
  color: white;
  text-align: left;
}

.home >>> .vs-button__content svg, .home >>> .vs-button__content span {
  color: white;
  font-size: 17px;
}

.home >>> #postImage {
  width: 100%;
  background-color: var(--vs-mainback);
  min-height: 200px;
  cursor: pointer;
}

.home >>> .vs-card:hover img {
  transform: scale(1, 1) !important;
}

.home >>> .vs-card__interactions {
  left: 40%;
  bottom: -4%;
  width: 100%;
}

.fullPost {
  margin-top: 2rem;
  display: inline;
  margin-left: 33%;
}
.right-text{
  text-align:right;
  font-size: 19px;
  line-height:1.4;
  font-family: Nazanin;
  opacity: 1;
}
.home >>> a{
  color:white;
  text-decoration: none;
}
</style>