<template>
  <div>
    <loading v-if="isLoading" style="margin-top:20vh;"/>
    <loading v-if="isLoadingMore" style="height:70px;"/>
    <vs-col v-for="(post) in homePosts" :id="post.id" :key="post.createdAt" class="home" justify="space-around" w="12">
      <vs-card>
        <template #title>
          <router-link :to="'/users/' + post.author">
            <img :src="post.authorAvatar ? (baseURl + post.authorAvatar) : alternativeAvatar"
                 alt="user profile"
                 style="width: 30px; height: 30px; border-radius: 50%; float: left; object-fit:cover;">
            <p class="userId">{{ post.author }}</p>
          </router-link>
          <vs-button
              :active="post.isWatchList"
              circle
              color="rgb(59,89,153)"
              flat
              icon
              style="display: inline-block; float: right; margin-top: 0;"
              @click="toggleWatchListPost(post.imdb_id); post.isWatchList = false"
          >
            <i class="iconify" data-icon="bx:bx-bookmark" data-inline="false"></i>
          </vs-button>
          <vs-button
              :active="post.isLiked"
              circle
              color="rgb(255,0,0)"
              flat
              icon
              style="display: inline-block; float: right; margin-top: 0;"
              @click="togglerLike(post)"
          >
            <i class="iconify" data-icon="mdi:heart-multiple" data-inline="false"></i>
            <p style="color: white; margin-left: 5px;"> {{ post.likes }}</p>
          </vs-button>
          <router-link :to="'/comments/' + post.id">
            <vs-button
                active
                circle
                color="rgb(59,89,153)"
                flat
                icon
                style="display: inline-block; float: right; margin-top: 0;"
            >
              <i class="iconify" data-icon="mdi:comment-processing-outline" data-inline="false"></i>
              <p style="color: white; margin-left: 5px;"> {{ post.comments }}</p>
            </vs-button>
          </router-link>
          <h3>{{ post.title }}</h3>
          <h6 style="margin-top: 10px; font-size: 15px;"><span v-if="post.spoiler === true" style="color: crimson;">#spoilers </span><span
              v-if="post.critic === true">#critic</span></h6>
        </template>
        <template #img>
          <router-link :to="'/post/' + encodeURIComponent(post.title) + '/' + post.id">
            <img id="postImage" v-lazy="post.poster"
                 alt="Image Load Error">
          </router-link>
        </template>
        <template #text>
          <i class="iconify" data-icon="bx:bxs-star" style="color: #fff356;"></i>
          <span style="color: #fff356;"> {{ post.score }} / 10
        </span>
          <p v-show="!post.truncated" class="right-text" dir="auto">
            <br>
            {{ post.body | sanitize }}
          </p>
          <p v-show="post.truncated" class="right-text" dir="auto" @click="post.truncated = false">
            <br>
            {{ post.body | sanitize | truncate( 150, ' ...  more') }}
          </p>
          <router-link :to="{ name: 'comments', params: {postID: post.id } }">
            <span style="opacity:0.7;">view all {{ post.comments }} comments</span>
          </router-link>
          <br>
          <router-link :to="'/post/' + encodeURIComponent(post.title) + '/' + post.id">
            <vs-button
                v-if="post.fullPostBtn"
                active
                class="fullPost"
                color="#293337"
                flat
                style="color:yellow;"
            >
              View full post
            </vs-button>
          </router-link>
          <small style="opacity: 0.3;"><br>{{ post.createdAt | dateToString }}</small>
        </template>
      </vs-card>
    </vs-col>
    <loading v-if="loadingBottom" style="height:70px;"/>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
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
      page: 0,
      requestAgain: true,
      scrollPosition: null,
      isLoadingMore: false,
      firstMount: true,
      loadingBottom: false,
      loadingMoreBottom: false
    }
  },
  computed: {
    ...mapState(['baseURl', 'homePosts', 'alternativeAvatar', 'homeHasNextPage', 'savedPos', 'homePageNumber'])
  },
  methods: {
    ...mapActions(['getHomePosts', 'toggleWatchListPost', 'toggleLike', "refreshCachePostsStatus", 'getOlderHomePosts', 'setDateFromServer']),
    ...mapMutations(['fetchHomePostsFromCache', 'homePageNumberPlus']),
    togglerLike(post) {
      this.toggleLike(post.id)
      if (post.isLiked) {
        post.likes -= 1
        post.isLiked = false
      } else {
        post.likes += 1
        post.isLiked = true
      }
    },
    getNextPosts() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 100;
        if (localStorage.getItem('firstTimeLoaded') && localStorage.getItem('lastPostInCacheDate-v2') && bottomOfWindow && !this.loadingMoreBottom) {
          this.loadingBottom = true
          this.loadingMoreBottom = true
          let homeObj = {
            date: this.homePosts.reduce((a, b) => (a.createdAt > b.createdAt ? b : a)).createdAt.slice(0, 24)
          }
          this.getOlderHomePosts(homeObj).then(() => {
            this.loadingBottom = false
            this.loadingMoreBottom = false
          }).catch(() => {
            this.loadingBottom = false
            this.loadingMoreBottom = false
          })
        } else {
          let topOfWindow = document.documentElement.scrollTop <= 600;
          if (topOfWindow && this.homeHasNextPage && !this.isLoadingMore) {
            this.isLoadingMore = true
            this.homePageNumberPlus()
            let homeObj = {
              page: this.homePageNumber,
              date: localStorage.getItem('lastPostInCacheDate-v2')
            }
            this.getHomePosts(homeObj).then(() => {
              setTimeout(() => {
                this.isLoadingMore = false
              }, 3000)
              putHomePosts(this.homePosts)
              if (!this.savedPos) {
                let firstPostOfPacket = document.getElementById(this.homePosts[9].id)
                firstPostOfPacket.scrollIntoView({block: 'end'})
              } else {
                this.$store.commit('toggleHomeSavedPos', false)
              }
            })
          }
        }
      }
    },
    latelyLoaded() {
      let latest = this.homePosts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0, 24)
      localStorage.setItem('lastPostInCacheDate-v2', latest)
      this.setDateFromServer(latest)
      if (this.isLoadingMore) {
        this.isLoadingMore = true
        this.homePageNumberPlus()
        let homeObj = {
          page: 1,
          date: localStorage.getItem('lastPostInCacheDate-v2')
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
    },
    async refreshCache() {
      let postIDs = []
      await this.homePosts.slice(0, 10).map(post => postIDs.push(post.id))
      await this.refreshCachePostsStatus(postIDs)
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
    if (localStorage.getItem('firstTimeLoaded') && localStorage.getItem('lastPostInCacheDate-v2') && this.homePosts.length === 0) {
      getHomePostsCache().then((posts) => {
        let latest = posts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0, 24)
        localStorage.setItem('lastPostInCacheDate-v2', latest)
        this.setDateFromServer(latest)
        this.fetchHomePostsFromCache(posts)
        this.getNextPosts()
        this.isLoadingMore = true
        this.homePageNumberPlus()
        let homeObj = {
          page: this.homePageNumber,
          date: localStorage.getItem('lastPostInCacheDate-v2')
        }
        const lastLen = this.homePosts.length
        this.refreshCache()
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
      }).catch(() => {
        alert("We can't access your storage right now. you're post will not be available offline. check if your storage is not full" +
            "please close the app and open again if you think now you have free storage")
        localStorage.clear()
      })
      this.firstMount = false
    } else if (localStorage.getItem('firstTimeLoaded') && localStorage.getItem('lastPostInCacheDate-v2')) {
      this.latelyLoaded()
    } else {
      this.isLoading = true
      const homeObj = {
        page: 1
      }
      this.getHomePosts(homeObj).then(() => {
        window.scrollTo(0, document.body.scrollHeight);
        this.isLoading = false
        localStorage.setItem('firstTimeLoaded', true)
        putHomePosts(this.homePosts)
        let letest = this.homePosts.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt.slice(0, 24)
        localStorage.setItem('lastPostInCacheDate-v2', letest)
        this.setDateFromServer(letest)
        this.getNextPosts()
      }).catch(() => {
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
  object-fit: contain;
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

.right-text {
  text-align: right;
  font-size: 17px;
  line-height: 1.4;
  font-family: Yekan;
  opacity: 1;
  font-weight: 300;
  line-height: 1.8;
  white-space: pre-line;
}

.home >>> a {
  color: white;
  text-decoration: none;
}
</style>