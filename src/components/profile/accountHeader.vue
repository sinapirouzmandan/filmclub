<template>
  <div id="top" class="topHeader">
    <settings/>
      <img :src="userProfile.header" :alt="'header photo posted by ' + userProfile.username" class="backAvatar" @error="userProfile.header = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6dWCVifqh42ha6sxuoGCnKGU2lcJiyISMndReOdYKaDQsckEe4A8mr-MxsCZAsCxpg&usqp=CAU'">
  <vs-row class="avatars">
    <vs-col w="4">
      <vs-avatar circle badge-color="success" size="90">
        <img src="data:image/jpeg;base64,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" alt="avatar" class="avatar">
        <template #badge v-if="userProfile.role == 'reviewer'">
          Reviewer
        </template>
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
  object-fit: cover;
}
</style>