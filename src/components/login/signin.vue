<template>
  <div class="papa">
    <Head/>
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:movie-roll"></i>
      <h2>Login</h2>
      <vs-input v-model="user.userName" border placeholder="email or username">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-user"></i>
        </template>
      </vs-input>
      <vs-input v-model="user.password" border class="password" placeholder="password">
        <template #icon>
          <i class='iconify' data-icon="bx:bx-key"></i>
        </template>
      </vs-input>
      <vs-button
          :loading="isLoading"
          class="next"
          color="#5B3CC4"
          gradient
          @click="login"
      >
        <i class="iconify" data-icon="bx:bx-log-in"></i> signin
      </vs-button>
    </div>
    <router-link style="text-decoration: none;" tag="a" to="/login"><p class="signIn">Create a new account</p>
    </router-link>
  </div>
</template>

<script>
import Head from "./Head";
import {mapActions, mapState} from 'vuex'

export default {
  name: "signin",
  components: {Head},
  data() {
    return {
      user: {userName: '', password: ''},
      isLoading: false
    }
  },
  computed: {
    ...mapState(['errMassage'])
  },
  created() {
    this.$store.commit('toggleNavbar', false);
  },
  methods: {
    ...mapActions(['signin']),
    isMail() {
      this.user.userName = this.user.userName.replace(/\s/g, '');
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(this.user.userName)
    },
    getNotif() {
      this.isLoading = false
      if (this.errMassage) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
      }
      this.$store.commit('changeErrMsg', null)
    },
    login() {
      this.isLoading = true
      if (this.user.password.length < 6) {
        this.$vs.notification({
          duration: 3000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#296186',
          title: 'Password should be at list 6 characters',
        })
        this.isLoading = false
        this.$store.commit('changeErrMsg', null)
        return
      }
      if (this.isMail()) {
        this.signin(this.user, 1).then(() => {
          this.getNotif()
        }).catch(() => {
          this.getNotif()
        })
      } else {
        this.signin(this.user, 2).then(() => {
          this.getNotif()
        }).catch(() => {
          this.getNotif()
        })
      }
    }
  }
}
</script>

<style scoped>
.papa >>> .vs-input {
  background-color: #121818FF !important;
  width: 100%;
  color: white;

}

.papa >>> .vs-input__label {
  width: 80%;
  display: flex;
}

.username {
  margin-top: 9rem;

}

.papa >>> .vs-input-parent {
  flex-direction: row;
}

.papa >>> .vs-input-content {
  width: 80%;
  max-width: 500px;
}

.papa >>> .vs-input__icon {
  background-color: var(--vs-navs) !important;
}

.logoUser {
  font-size: 70px;
  margin-bottom: 0;
}

.next {
  margin: 2.5rem auto 0;
}

.papa >>> .vs-button {
  width: 80%;
  max-width: 500px;
}

.signIn {
  margin-top: 2rem;
  color: #5b3cc4;
}

h2 {
  margin-bottom: 1.5rem;
}

.password {
  margin-top: 1rem;
}
</style>