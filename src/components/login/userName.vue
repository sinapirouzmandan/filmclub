<template>
  <div class="papa">
    <div @click="$emit('back')">
    <i class="iconify back"  data-icon="mdi:keyboard-backspace"></i>
    </div>
    <div class="username">
      <i class="iconify logoUser" data-icon="bx:bxs-user-circle"></i>
      <h2>Your username</h2>
      <vs-input placeholder="" v-model="userName">
        <template #icon>
          <i class='iconify' data-icon="mdi:user"></i>
        </template>
      </vs-input>
      <vs-button
          class="next"
          color="#5b3cc4"
          gradient
          to="/"
          @click="login()"
      >
        done <i class="iconify" data-icon="mdi:send-circle"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userName",
  methods:{
    login(){
      this.$store.commit('login');
    },
    data(){
      return{
        userName: ''
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