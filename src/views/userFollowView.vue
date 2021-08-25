<template>
<div id="follow">
  <div class="header">
    <div class="back" @click="$router.back()">
      <i class="iconify" data-icon="bx:bx-arrow-back"></i>
    </div>
    <div class="username">
      <p style="text-align: left;">{{usernameInfoFollow.username}}</p>
    </div>
    <vs-row class="tabs">
      <vs-col w="6" :class="{'border-bottom': isFollower}" style="padding:12px; font-size: 15px; margin-bottom: 10px;">
        <span @click="$router.push('/userFollowers'); isLoading=true; getFollow(0)">
                {{usernameInfoFollow.followers}} followers
        </span>
      </vs-col>
      <vs-col w="6" :class="{'border-bottom': !isFollower}" style="padding:12px; font-size: 15px; margin-bottom: 10px;">
        <span @click="$router.push('/userFollowings'); isLoading=true; getFollow(1)">
                {{usernameInfoFollow.followings}} followings
        </span>
      </vs-col>
    </vs-row>
  </div>
  <h1 id="headerFollow">All {{$route.path.replace('/user', '')}}</h1>
  <div class="followers"  v-show="isFollower">
    <loading v-if="isLoading"/>
    <div class="user" v-for="(user) in userFollowers" :key="user._id">
      <div class="containFullUser" @click="$router.push(`/users/${user.followerUsername.username}`)">
      <vs-avatar circle class="avatarImage">
        <img :src="user.followerUsername.avatar ? (baseURl + user.followerUsername.avatar) : alternativeAvatar" class="fitImage" alt="user avatar">
      </vs-avatar>
      <div class="singleUser">
      <p class="nameInSingleUser">{{user.followerUsername.username}}</p>
      </div>
    </div>
    </div>
  </div>
  <div class="followings" v-show="!isFollower">
    <loading v-if="isLoading"/>
    <div class="user" v-for="(user) in userFollowings" :key="user._id">
      <div class="containFullUser" @click="$router.push(`/users/${user.followingUsername.username}`)">
      <vs-avatar circle class="avatarImage">
        <img :src="user.followingUsername.avatar ? (baseURl + user.followingUsername.avatar) : alternativeAvatar" class="fitImage" alt="user avatar">
      </vs-avatar>
      <div class="singleUser">
      <p class="nameInSingleUser">{{user.followingUsername.username}}</p>
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import loading from "../components/loading";
import PullToRefresh from "pulltorefreshjs";
export default {
  name: "followView",
  metaInfo: {
    title: 'Followings',
    titleTemplate: '%s | FilmClub'
  },
  data () {
    return {
      isLoading: false
    }
  },
  components: {loading},
  computed: {
    ...mapState(['usernameInfo', 'userFollowings', 'userFollowers', 'alternativeAvatar', 'baseURl', 'usernameInfoFollow']),
    isFollower(){
      return this.$route.path.replace('/user', '') === 'Followers'
    }
  },
  methods: {
    ...mapActions(['getUserFollowers', 'getUserFollowings',  'getUserProfile', 'toggleFollow']),
    getFollow(val){
      if (val || (val=== 0 || val === 1)) {
        if (val === 0){
          this.getUserFollowers(this.usernameInfoFollow.id).then(()=>{
            this.isLoading = false
          })
        }
        else if (val === 1) {
          this.getUserFollowings(this.usernameInfoFollow.id).then(()=>{
            this.isLoading= false
          })
        }
      }
      else if (this.$route.path.replace('/user', '') === 'Followers'){
        this.getUserFollowers(this.usernameInfoFollow.id).then(()=>{
          this.isLoading= false
        })
      }
      else {
        this.getUserFollowings(this.usernameInfoFollow.id).then(()=>{
          this.isLoading= false
        })
      }
    },
  },
  mounted(){
    this.isLoading = true
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
#headerFollow{
  padding:20px;
  font-size:18px;
  margin-top: 6rem;
  text-align: left;
  font-weight: normal;
  border-bottom: 1px solid white;
  width: auto;
  max-width:150px;
  margin-bottom:2rem;
}
.singleUser {
  padding-bottom: 5px;
}
.back {
  margin-left: 10px;
  font-size: 20px;
}
.username{
  margin-left: 20px;
  font-size: 20px;
}
#follow >>> p{
  text-align: left;
  margin-left:20px;
}
.tabs {
margin-top: 10px;
}
.border-bottom{
  border-bottom: 1px solid white;
}
.unfollow {
  width:80px;
  height:25px;
  border: 1px dashed white;
  float: right;
  margin-right: 20px;
  font-size: 12px;
  text-align-all: center;
  line-height: 25px;
  margin-top: 10px;
}
.avatarImage{
  float:left;
  margin-right: 20px;
  margin-left: 20px;
}
.nameInSingleUser {
  padding-top: 10px;
}
.containFullUser{
  width:60%;
  height: 100%;
}
.fitImage{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>