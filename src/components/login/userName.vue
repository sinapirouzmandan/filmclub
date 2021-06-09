<template>
  <div class="papa">
    <div @click="$emit('back')">
    <i class="iconify back"  data-icon="mdi:keyboard-backspace"></i>
    </div>
    <div class="username">
      <i class="iconify logoUser" data-icon="bx:bxs-user-circle"></i>
      <h2>username & password</h2>
      <vs-input placeholder="username" v-model="user.username">
        <template #icon>
          <i class='iconify' data-icon="mdi:user"></i>
        </template>
      </vs-input>
      <vs-input placeholder="password" v-model="user.password" style="margin-top: 1rem;">
        <template #icon>
          <i class='iconify' data-icon="mdi:password"></i>
        </template>
      </vs-input>
      <vs-button
          :loading="isLoading"
          class="next"
          color="#5b3cc4"
          gradient
          @click="sendInfo"
      >
        done <i class="iconify" data-icon="mdi:send-circle"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "userName",
  data(){
    return{
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      errMsg: ''
    }
  },
  computed:{
    ...mapState(['isUserNameAvailable', 'errMassage'])
  },
  methods:{
    ...mapActions(['checkUserNameAvailable', 'signup']),
    validUsername() {
      if (this.user.username === '' || this.user.password === ''){
        this.errMsg = 'Please  fill both fields'
        return true
      }
    },
    sendInfo(){
      if(this.validUsername()){
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position:'bottom-center',
          color: '#5b3cc4',
          title: this.errMsg,
        })
        return
      }
      this.isLoading = true
      this.checkUserNameAvailable(this.user).then(()=>{
        this.isLoading = false
        if(this.isUserNameAvailable){
          console.log('user Available')
        }
        else{
          this.$vs.notification({
            duration: 4000,
            progress: 'auto',
            border: null,
            position:'bottom-center',
            color: '#5b3cc4',
            title: this.errMassage,
          })
        }
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
.back{
  font-size: 25px;
  position: absolute;
  top:9rem;
  left:20%;
}
</style>