<template>
  <div class="papa">
    <Head/>
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:movie-roll"></i>
      <h2>Login</h2>
      <vs-input placeholder="" v-model="user.userName">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-user"></i>
        </template>
      </vs-input>
      <vs-input placeholder="" class="password" v-model="user.password">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-key"></i>
        </template>
      </vs-input>
      <vs-button
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
      user:{userName: '', password: ''}
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
    login(){
      this.signin(this.user).then(()=>{
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position:'bottom-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
      }).catch(()=>{
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position:'bottom-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
      })
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
  width: 60%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
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