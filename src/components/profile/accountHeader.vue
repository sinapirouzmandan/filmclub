<template>
  <div id="top" class="topHeader">
      <img :src="userProfile.header" :alt="'photo posted by' + userProfile.userName" class="backAvatar">
  <vs-row class="avatars">
    <vs-col w="4">
      <vs-avatar circle badge-color="success" size="90">
        <img src="../../../public/img/avatar.jpg" alt="avatar">
      </vs-avatar>
      <div class="username">
        <p>{{userProfile.name}}</p>
        <i>@{{userProfile.username}}</i>
      </div>
    </vs-col>
    <vs-col w="4" class="editProfile" offset="3">
      <vs-button
          style="width:100%;"
          color="rgb(59,89,153)"
          gradient
          @click="editPro = true"
      >
        Edit Profile
      </vs-button>
    </vs-col>
  </vs-row>

    <vs-dialog blur v-model="editPro">
      <template #header>
        <h4 class="not-margin">
          Edit Profile
        </h4>
      </template>


      <div class="con-form">
        <vs-input v-model="userProfile.name" label-placeholder="Full name" color="#5b3cc4" class="input-field">
          <template #icon>
            <i class="iconify" data-icon="bx:bxs-user"></i>
          </template>
        </vs-input>
        <vs-input v-model="userProfile.biography" label-placeholder="Biographi" class="input-field bioEdit"  color="#5b3cc4" style="margin-top: 2rem;">
          <template #icon>
            <i class='iconify' data-icon="bx:bxs-info-circle"></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            submit
          </vs-button>
        </div>
      </template>
    </vs-dialog>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "accountHeader",
  data(){
    return{
      editPro: false
    }
  },
  computed:{
    ...mapState(['userProfile'])
  }
}
</script>

<style scoped>
.avatars {
  z-index: 9999;
  margin-top: 80px;
}
.backAvatar{
  width: 100%;
  position: absolute;
  top:0;
  right:0;
  left:0;
  height:120px;
  z-index: -4;
  background-color: #0a0d0e;
}
.editProfile {
  margin-top: 50px;
}
.username{
  margin-top: 15px;
  width: 100%;
  text-align: left;
}
.username i {
  font-size: 15px;
}
.username p {
  width:100%;
}
.input-field >>> .vs-input {
  background-color: #171b1d !important;
  color: #d5cccc;
}
.bioEdit{
  height: 4rem;
}
</style>