<template>
  <div id="follow">
    <div class="header">
      <div class="back" @click="$router.push('/profile')">
        <i class="iconify" data-icon="bx:bx-arrow-back"></i>
      </div>
      <div class="username">
        <p style="text-align: left;">{{ userProfile.username }}</p>
      </div>
      <vs-row class="tabs">
        <vs-col :class="{'border-bottom': isFollower}" style="padding:12px; font-size: 15px; margin-bottom: 10px;"
                w="6">
        <span @click="$router.push('/followers'); isLoading=true; getFollow(0)">
                {{ statitics.followers }} followers
        </span>
        </vs-col>
        <vs-col :class="{'border-bottom': !isFollower}" style="padding:12px; font-size: 15px; margin-bottom: 10px;"
                w="6">
        <span @click="$router.push('/followings'); isLoading=true; getFollow(1)">
                {{ statitics.followings }} followings
        </span>
        </vs-col>
      </vs-row>
    </div>
    <h1 id="headerFollow">All {{ $route.path.replace('/', '') }}</h1>
    <div v-if="$route.path.replace('/', '') === 'followers'" class="followers">
      <loading v-if="isLoading"/>
      <div v-for="(user) in followers" :key="user._id" class="user">
        <div class="containFullUser" @click="$router.push(`/users/${user.followerUsername.username}`)">
          <vs-avatar circle class="avatarImage">
            <img :src="user.followerUsername.avatar ? (baseURl + user.followerUsername.avatar) : alternativeAvatar"
                 alt="user avatar" class="fitImage">
          </vs-avatar>
          <div class="singleUser">
            <p class="nameInSingleUser">{{ user.followerUsername.username }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="followings">
      <loading v-if="isLoading"/>
      <div v-for="(user) in followings" :key="user._id" class="user">
        <div class="unfollow" @click="toggleFollowing(user.followingUsername.username)">
          <span v-if="!unfollowed.includes(user.followingUsername.username)">Unfollow</span>
          <span v-else>Follow</span>
        </div>
        <div class="containFullUser" @click="$router.push(`/users/${user.followingUsername.username}`)">
          <vs-avatar circle class="avatarImage">
            <img :src="user.followingUsername.avatar ? (baseURl + user.followingUsername.avatar) : alternativeAvatar"
                 alt="user avatar" class="fitImage">
          </vs-avatar>
          <div class="singleUser">
            <p class="nameInSingleUser">{{ user.followingUsername.username }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import loading from "../components/loading";
import PullToRefresh from "pulltorefreshjs";

export default {
  name: "followView",
  metaInfo: {
    title: 'Followers',
    titleTemplate: '%s | FilmClub'
  },
  data() {
    return {
      unfollowed: [],
      isLoading: false
    }
  },
  components: {loading},
  methods: {
    ...mapActions(['getFollowers', 'getFollowings', 'getUserProfile', 'toggleFollow']),
    getFollow(val) {
      if (val || (val === 0 || val === 1)) {
        if (val === 0) {
          this.getFollowers().then(() => {
            this.isLoading = false
          })
        } else if (val === 1) {
          this.getFollowings().then(() => {
            this.isLoading = false
          })
        }
      } else if (this.$route.path.replace('/', '') === 'followers') {
        this.getFollowers().then(() => {
          this.isLoading = false
        })
      } else {
        this.getFollowings().then(() => {
          this.isLoading = false
        })
      }
    },
    toggleFollowing(value) {
      this.toggleFollow(value)
      if (this.unfollowed.includes(value)) {
        this.unfollowed = this.unfollowed.filter(function (item) {
          return item != value;
        });
      } else {
        this.unfollowed.push(value)
      }
    }
  },
  computed: {
    ...mapState(['followers', 'followings', 'userProfile', 'statitics', 'alternativeAvatar', 'baseURl']),
    isFollower() {
      return this.$route.path.replace('/', '') === 'followers'
    }
  },
  mounted() {
    this.isLoading = true
    this.$store.dispatch('getCountsInProfile')
    this.getUserProfile()
    this.getFollow()
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        console.log('refresh')
      }
    });
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
}

#headerFollow {
  padding: 20px;
  font-size: 18px;
  margin-top: 6rem;
  text-align: left;
  font-weight: normal;
  border-bottom: 1px solid white;
  width: auto;
  max-width: 150px;
  margin-bottom: 2rem;
}

.singleUser {
  padding-bottom: 5px;
}

.back {
  margin-left: 10px;
  font-size: 20px;
}

.username {
  margin-left: 20px;
  font-size: 20px;
}

#follow >>> p {
  text-align: left;
  margin-left: 20px;
}

.tabs {
  margin-top: 10px;
}

.border-bottom {
  border-bottom: 1px solid white;
}

.unfollow {
  width: 80px;
  height: 25px;
  border: 1px dashed white;
  float: right;
  margin-right: 20px;
  font-size: 12px;
  text-align-all: center;
  line-height: 25px;
  margin-top: 10px;
}

.avatarImage {
  float: left;
  margin-right: 20px;
  margin-left: 20px;
}

.nameInSingleUser {
  padding-top: 10px;
}

.containFullUser {
  width: 60%;
  height: 100%;
}

.fitImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>