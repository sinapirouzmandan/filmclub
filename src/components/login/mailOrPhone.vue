<template>
  <div class="papa">
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:mail"></i>
      <h2>Create a new acount</h2>
      <vs-input label-placeholder="Email Address" border v-model="user.email" required>
        <template #icon>
          <i class='iconify' data-icon="mdi:contacts"></i>
        </template>
      </vs-input>
      <vs-input label-placeholder="Full name" v-model="user.name" style="margin-top: 1.5rem;" required>
        <template #icon>
          <i class='iconify' data-icon="mdi:identifier"></i>
        </template>
      </vs-input>
      <vs-button
          :loading="isLoading"
          class="next"
          color="#5b3cc4"
          gradient
          @click="sendInfo()"
      >
        <i class="iconify" data-icon="bx:bx-right-arrow-alt"></i> next
      </vs-button>
    </div>
     <router-link to="/signin" tag="a" style="text-decoration: none;"><p class="signIn">I already have an account . sign in</p></router-link>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: "mailOrPhone",
  data(){
    return{
      user: {
        email: '',
        name: ''
      },
      isLoading: false,
      errMsg: ''
    }
  },
  computed:{
    ...mapState(['isMailAvailable', 'errMassage'])
  },
  methods:{
    ...mapActions(['checkMailAvailable']),
    validEmail() {
      if (this.user.email === '' || this.user.name === ''){
        this.errMsg = 'Please  fill both fields'
        return false
      }
      this.user.email = this.user.email.replace(/\s/g, '');
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errMsg = 'This Email is not valid'
       return re.test(this.user.email)
    },
    sendInfo(){
      if(!this.validEmail()){
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
      this.checkMailAvailable(this.user).then(()=>{
        this.isLoading = false
        if(this.isMailAvailable){
          this.$emit('doneMail')
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
  text-align: left;
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
</style>