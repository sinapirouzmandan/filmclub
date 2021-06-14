<template>
<div class="container bodyMargin">
  <div class="user" v-for="(i,index) in (1,20)" :key="index">
    <div class="divider"></div>
    <div class="avatar">
    </div>
    <p>user {{i}}</p>
    <p class="bio">this is user {{i}} talking  to you about u</p>
    <div class="divider bottom"></div>
  </div>
  <p style="margin-bottom: 35px; opacity: 0.1; font-size:15px;">end of content ...</p>

</div>
</template>

<script>
export default {
  name: "searchUsers"
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
}
.user .bio{
  font-size: 11px;
  margin-top: 2.2rem;
  opacity: 0.7;
  margin-left: -45px;
}
</style>