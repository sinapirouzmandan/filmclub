<template>
<div class="container bodyMargin">
  <div v-for="(user,index) in searchedUsers" :key="index">
  <div class="user" @click="$router.push(`/users/${user.username}`)">
    <div class="divider"></div>
    <div class="avatar">
      <img src="../../../dist/img/avatar.jpg" alt="">
    </div>
    <p>
      {{user.username}}
      <br>
      <span class="bio">{{user.biography | truncate(60, '...')}}</span>
    </p>
    <div class="divider bottom"></div>
  </div>
  </div>
  <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>

</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "searchUsers",
  computed: {
    ...mapState(['searchedUsers'])
  }

}
</script>

<style scoped>
.user{
  width: 100%;
  height: 5rem;
  padding:15px;

}
.divider{
  width:100%;
  height:1px;
  margin-top: 0.5rem;
  width: 90%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(85, 84, 84, 0.31), rgba(255, 255, 255, 0));
}
.bottom{
  margin-top: 4rem;
}
.avatar{
  width: 3rem;
  height: 3rem;
  background-color: cornflowerblue;
  float: left;
  margin-top:0.5rem;
  border-radius: 50%;
}

.user p {
  float: left;
  position: relative;
  bottom: 2%;
  left:10px;
  text-align: left;
}
.user .bio{
  font-size: 11px;
  opacity: 0.7;
  position: relative;
  top:0.1rem;
  width: 100%;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
.avatar img{
  width: 100%;
}
</style>