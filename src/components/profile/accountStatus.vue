<template>
  <vs-row class="statusBar">
    <vs-col w="4"><router-link to="/followers"> <p>{{statitics.followers}} follower</p> </router-link></vs-col>
    <vs-col w="4"><router-link to="/followings"> <p>{{statitics.followings}} following</p> </router-link></vs-col>
    <vs-col w="4"><p>{{statitics.posts}} posts</p></vs-col>
  </vs-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "accountStatus",
  computed:{
    ...mapState(['statitics'])
  }
}
</script>

<style>
.statusBar a {
  text-decoration: none;
  color: white;
}
</style>