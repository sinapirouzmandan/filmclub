<template>
  <vs-row class="statusBar">
    <vs-col w="4"><span @click="followRoute('/userFollowers')"> <p>{{usernameInfo.followers}} follower</p> </span></vs-col>
    <vs-col w="4"><span @click="followRoute('/userFollowings')"> <p>{{usernameInfo.followings}} following</p> </span></vs-col>
    <vs-col w="4"><p>{{usernameInfo.posts}} posts</p> </vs-col>
  </vs-row>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "accountStatus",
  computed:{
    ...mapState(['usernameInfo'])
  },
  methods: {
    ...mapMutations(['changeUserFollowerPage']),
    followRoute(route) {
      this.changeUserFollowerPage(route)
    }
  }
}
</script>
<style>
.statusBar a {
  text-decoration: none;
  color: white;
}
</style>