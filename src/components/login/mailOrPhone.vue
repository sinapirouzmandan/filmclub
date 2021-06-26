<template>
  <div class="papa">
    <div class="username">
      <i class="iconify logoUser" data-icon="mdi:mail"></i>
      <h2>Create a new acount</h2>
      <!-- -----------------        Email        --------------------- -->
      <vs-input v-model="user.email" border label-placeholder="Email Address" required>
        <template #icon>
          <i class='iconify' data-icon="mdi:contacts"></i>
        </template>
      </vs-input>
      <!-- -----------------        full name        --------------------- -->
      <vs-input v-model="user.name" border label-placeholder="Full name" required style="margin-top: 1.5rem;">
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

    <router-link style="text-decoration: none;" tag="a" to="/signin"><p class="signIn">I already have an account . sign
      in</p></router-link>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "mailOrPhone",
  data() {
    return {
      user: {
        email: '',
        name: ''
      },
      isLoading: false,
      errMsg: ''
    }
  },
  computed: {
    ...mapState(['isMailAvailable', 'errMassage'])
  },
  methods: {
    ...mapActions(['checkMailAvailable']),
    validEmail() {
      // check if inputs are empty
      if (this.user.email === '' || this.user.name === '') {
        this.errMsg = 'Please  fill both fields'
        return false
      }
      // check if email is real
      this.user.email = this.user.email.replace(/\s/g, '');
      //eslint-disable-next-line
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errMsg = 'This Email is not valid'
      return re.test(this.user.email)
    },
    sendInfo() {
      if (!this.validEmail()) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#5b3cc4',
          title: this.errMsg,
        })
        this.$store.commit('changeErrMsg', null)
        return
      }
      this.isLoading = true
      // server side email check
      this.checkMailAvailable(this.user).then(() => {
        this.isLoading = false
        if (this.isMailAvailable) {
          // go next level
          this.$emit('doneMail')
        } else {
          this.$vs.notification({
            duration: 4000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
            color: '#5b3cc4',
            title: this.errMassage,
          })
          this.$store.commit('changeErrMsg', null)
        }
      })
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

.username >>> .vs-input__label {
  width: 80%;
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
  text-align: left;
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
</style>