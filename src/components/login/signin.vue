<template>
  <div class="papa">
    <Head/>
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:movie-roll"></i>
      <h2>Login</h2>
      <vs-input placeholder="email or username" v-model="user.userName">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-user"></i>
        </template>
      </vs-input>
      <vs-input placeholder="password" class="password" v-model="user.password">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-key"></i>
        </template>
      </vs-input>
      <vs-button
          :loading="isLoading"
          class="next"
          color="#5b3cc4"
          gradient
          @click="login"
      >
        <i class="iconify" data-icon="bx:bx-log-in"></i> signin
      </vs-button>
    </div>
    <router-link to="/login" tag="a" style="text-decoration: none;"><p class="signIn">Create a new account</p></router-link>
  </div>
</template>

<script>
import Head from "./Head";
import {mapActions,mapState} from 'vuex'
export default {
  name: "signin",
  components: {Head},
  data(){
    return{
      user:{userName: '', password: ''},
      isLoading: false
    }
  },
  computed:{
    ...mapState(['errMassage'])
  },
created() {
  this.$store.commit('toggleNavbar',false);
},
  methods:{
    ...mapActions(['signin']),
    isMail() {
      this.user.userName = this.user.userName.replace(/\s/g, '');
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(this.user.userName)
    },
    getNotif(){
      this.isLoading = false
      if (this.errMassage){
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position:'bottom-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
      }
    },
    login(){
      this.isLoading = true
      if (this.user.password.length < 6){
        this.$vs.notification({
          duration: 3000,
          progress: 'auto',
          border: null,
          position:'bottom-center',
          color: '#296186',
          title: 'Password should be at list 6 characters',
        })
        this.isLoading = false
        return
      }
      if(this.isMail()){
        this.signin(this.user, 1).then(()=>{
          this.getNotif()
        }).catch(()=>{
          this.getNotif()
        })
      }
      else{
        this.signin(this.user, 2).then(()=>{
          this.getNotif()
        }).catch(()=>{
          this.getNotif()
        })
      }
    }
  }
}
</script>

<style scoped>
.papa >>> .vs-input{
  background-color: #171b1d !important;
  width: 100%;
  color:white;

}
.papa  >>> .vs-input__label{
  width: 80%;
  display: flex;
}
.username{
  margin-top: 9rem;

}
.papa >>> .vs-input-parent{
  flex-direction: row;
}
.papa >>> .vs-input-content{
  width: 80%;
  max-width: 500px;
}
.papa >>> .vs-input__icon{
  background-color: #151718 !important;
}
.logoUser{
  font-size: 70px;
  margin-bottom: 0;
}
.next{
  margin: 2.5rem auto 0;
}
.papa >>> .vs-button{
  width:80%;
  max-width: 500px;
}
.signIn{
  margin-top: 2rem;
}
h2{
  margin-bottom: 1.5rem;
}
.password{
  margin-top: 1rem;
}
</style>