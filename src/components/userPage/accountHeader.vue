<template>
  <div id="top" class="topHeader">
    <img :src="usernameInfo.header" :alt="'header photo posted by ' + usernameInfo.username" class="backAvatar" @error="usernameInfo.header = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6dWCVifqh42ha6sxuoGCnKGU2lcJiyISMndReOdYKaDQsckEe4A8mr-MxsCZAsCxpg&usqp=CAU'">
    <vs-row class="avatars">
      <vs-col w="4">
        <vs-avatar circle badge-color="success" size="90">
          <img v-lazy="'./img/avatar.jpg'" alt="avatar" class="avatar">
          <template #badge v-if="false">
            Reviewer
          </template>
        </vs-avatar>
        <div class="username">
          <p>{{usernameInfo.name}}</p>
        </div>
      </vs-col>
      <vs-col w="4" class="editProfile" offset="3">
        <vs-button
            style="width:100%;"
            :color="colorBtn"
            :gradient="gradient"
            @click="follow"
            :class="border"
            :loading="isLoading"
        >
          {{ followText }}
        </vs-button>
        <vs-button
            style="width:100%; border: 1px solid #7f1818;"
            gradient
            color="#0a0d0e"
        >
          <i class="iconify" data-icon="bx:bx-error">  </i>
             <span>Ban User</span>
        </vs-button>
      </vs-col>
    </vs-row>

  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: "accountHeader",
  data(){
    return{
      colorBtn: 'rgb(70,126,246)',
      border: '',
      gradient: true,
      followText: 'follow',
      isFollowed: false,
      isLoading:false
    }
  },
  computed:{
    ...mapState(['usernameInfo', 'errMassage'])
  },
  methods:{
    getNotif(){
      this.isLoading = false
      if (this.errMassage){
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position:'top-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
      }
    },
    ...mapActions(['toggleFollow']),
    follow(){
      this.isLoading = true
      this.toggleFollow(this.$route.params.user).then(()=>{
        if(!(this.errMassage)){
          if(!(this.isFollowed)){
            this.gradient = false
            this.border = 'followBtn'
            this.colorBtn = 'rgba(255,255,255,0)'
            this.followText = 'Unfollow'
            this.isFollowed = !(this.isFollowed)
          }
          else{
            this.gradient = true
            this.border = ''
            this.colorBtn = 'rgb(70,126,246)'
            this.followText = 'follow'
            this.isFollowed = !(this.isFollowed)
          }
        }
        this.getNotif()
      }).catch(()=>{
        this.getNotif()
      })
    }

  }
}
</script>

<style scoped>
.avatars {
  margin-top: 50px;
}
.backAvatar {
  width: 100%;
  position: absolute;
  top: 0;
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
.avatar{
  width: 90px;
  height: 90px;
}
.followBtn{
  background-color: rgba(70, 126, 246, 0.22);

}
</style>