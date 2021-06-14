<template>
  <div id="top" class="topHeader">
    <settings/>
      <img :src="userProfile.header" :alt="'header photo posted by ' + userProfile.username" class="backAvatar" @error="userProfile.header = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6dWCVifqh42ha6sxuoGCnKGU2lcJiyISMndReOdYKaDQsckEe4A8mr-MxsCZAsCxpg&usqp=CAU'">
  <vs-row class="avatars">
    <vs-col w="4">
      <vs-avatar circle badge-color="success" size="90">
        <img v-lazy="'./img/avatar.jpg'" alt="avatar" class="avatar">
      </vs-avatar>
      <div class="username">
        <p>{{userProfile.name}}</p>
        <i v-if="userProfile.username">@{{userProfile.username}}</i>
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
        <vs-input v-model="userProfile.name" label-placeholder="Full name" color="#5b3cc4" class="input-field" @change="changedName = true">
          <template #message-danger v-if="isNameEmpty">
            Required
          </template>
          <template #icon>
            <i class="iconify" data-icon="bx:bxs-user"></i>
          </template>
        </vs-input>
        <vs-avatar class="bioIcon">
        <i class="iconify" data-icon="bx:bxs-info-circle"></i>
        </vs-avatar>
          <textarea id="bio" class="vs-input text-input bioEdit" rows="5" v-model="userProfile.biography" placeholder="Biographi"  @change="changedBio = true">
        </textarea>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="sendReq()" :loading="isLoading">
            submit
          </vs-button>
        </div>
      </template>
    </vs-dialog>

  </div>
</template>

<script>
import settings from "./settings";
import {mapState} from 'vuex'
export default {
  name: "accountHeader",
  components:{settings},
  data(){
    return{
      editPro: false,
      changedName: false,
      changedBio: false,
      isLoading: false,
      isNameEmpty: false
    }
  },
  computed:{
    ...mapState(['userProfile', 'errMassage'])
  },
  methods:{
    validName() {
      if (this.userProfile.name === ''){
        this.isNameEmpty = true
        return true
      }
      else{
        this.isNameEmpty = false
      }
    },
    getNotif(){
      setTimeout(()=>{
        this.$vs.notification({
          duration: 3000,
          progress: 'auto',
          border: null,
          position:'top-center',
          color: '#296186',
          title: this.errMassage,
        })
        this.isLoading= false
      },500)
    },
    sendReq(){
    this.validName()
      if (!(this.isNameEmpty)){
        if(this.changedName){
          this.isLoading = true
          this.$store.dispatch('updateName', this.userProfile.name);
          this.getNotif()
          this.changedName = false
        }
        if(this.changedBio){
          this.isLoading = true
          this.$store.dispatch('updateBio', this.userProfile.biography);
          this.getNotif()
          this.changedBio = false
        }
        else if(!(this.changedBio || this.changedName)){this.editPro=false}
      }
    }
  }
}
</script>

<style scoped>
.avatars {
  margin-top: 110px;
}
.backAvatar {
  width: 100%;
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;
  height: 100px;
  z-index: -4;
  background-color: #0a0d0e;
}
.editProfile {
  margin-top: 60px;
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
  background-color:#171b1d;
  float: left;
  margin-top: 1.5rem;
  color: #d5cccc;
  margin-left: 2rem;
  margin-bottom: 2rem;
  width: 80%;
}
.bioEdit:focus{
  background-color:#171b1d;
  border-bottom:2px solid #5b3cc4;

}
.bioIcon{
  margin-top: 2rem;
  position: absolute;
  top:2rem;
  width: 40px;
  height: 40px;
}
.avatar{
  width: 90px;
  height: 90px;
}
</style>