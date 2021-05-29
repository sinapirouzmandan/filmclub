<template>
<div>
<vs-row>
  <vs-col w="12">
    <img src="../../public/img/backAvatar.jpg" alt="back" class="backAvatar">
  </vs-col>
</vs-row>
  <vs-row class="avatars">
 <vs-col w="1">
    <vs-avatar badge circle badge-color="success" size="90">
    <img src="../../public/img/avatar.jpg" alt="avatar">
  </vs-avatar>
  </vs-col>
  <vs-col w="3" class="editProfile" offset="7">
    <vs-button
        style="width:100%;"
        color="rgb(59,89,153)"
        gradient
        :active="active == 6"
        @click="active = 6"
    >
      Edit Profile
    </vs-button>
  </vs-col>
</vs-row>
  <vs-row>
    <vs-col w="12">
      <p class="bioText" style="text-align: left;">
      student in shz <br>
      Nolan is my nigga 🙃
    </p></vs-col>

  </vs-row>

  <vs-row class="statusBar">
    <vs-col w="4">0 followers</vs-col>
    <vs-col w="4">0 following</vs-col>
    <vs-col w="4">0 posts</vs-col>
  </vs-row>
</div>
</template>

<script>
export default {
  name: "profile"
}
</script>

<style>
body,html{
  overflow: hidden;
}
.avatars {
  z-index: 9999;
  margin-top: 80px;
}
.backAvatar{
  width: 100%;
  position: fixed;
  top:0;
  right:0;
  left:0;
  height:120px;
  z-index: -4;
}
.bioText {
  margin-top: 7%;
}
.statusBar{
  margin-top: 15px;
}
.editProfile {
  margin-top: 50px;
}
</style>