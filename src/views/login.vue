<template>
  <div>
    <Head/>
    <keep-alive>
      <component v-bind:is="stage" @back='startOver()' @doneMail="changeStage()"></component>
    </keep-alive>
  </div>
</template>

<script>
import Head from '../components/login/Head'
import mailOrPhone from "../components/login/mailOrPhone";
import userName from "../components/login/userName";

export default {
  name: "login",
  data() {
    return {
      stage: mailOrPhone
    }
  },
  created() {
    this.$store.commit('toggleNavbar', false);
  },
  components: {Head, mailOrPhone, userName},
  methods: {
    changeStage() {
      this.stage = userName
    },
    startOver() {
      this.stage = mailOrPhone
    }
  }
}
</script>

<style scoped>
.xi-top-head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #1e2023;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 99;
}

.logo h1 {
  font-family: magic, sans-serif;
}

.papa >>> .vs-input {
  background-color: #171b1d !important;
  width: 100%;
  color: white;

}

.papa >>> .vs-input__label {
  width: 60%;
  display: flex;
}

.username {
  margin-top: 12rem;

}

.papa >>> .vs-input-parent {
  flex-direction: row;
}

.papa >>> .vs-input-content {
  width: 80%;
  max-width: 500px;
}

.papa >>> .vs-input__icon {
  background-color: #151718 !important;
}

.logoUser {
  font-size: 70px;
  margin-bottom: 1.5rem;
}

.next {
  margin: 2.5rem auto 0;
}

.papa >>> .vs-button {
  width: 80%;
  max-width: 500px;
}
</style>