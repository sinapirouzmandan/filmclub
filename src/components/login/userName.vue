<template>
  <div class="papa">
    <div @click="$emit('back')">
      <i class="iconify back" data-icon="mdi:keyboard-backspace"></i>
    </div>
    <div class="username">
      <i class="iconify logoUser" data-icon="bx:bxs-user-circle"></i>
      <h2>username & password</h2>
      <vs-input v-model="user.username" border label-placeholder="username">
        <template #icon>
          <i class='iconify' data-icon="mdi:user"></i>
        </template>
      </vs-input>
      <vs-input v-model="user.password" :progress="getProgress" label-placeholder="password"
                style="margin-top: 1.5rem;">
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
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      errMsg: ''
    }
  },
  computed: {
    ...mapState(['isUserNameAvailable', 'errMassage']),
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.user.password)) {
        progress += 10
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.user.password)) {
        progress += 15
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.user.password)) {
        progress += 15
      }

      // more than 5 digits

      if (this.user.password.length >= 6) {
        progress += 60
      }
      return progress
    }
  },
  methods: {
    ...mapActions(['checkUserNameAvailable', 'signup']),
    validUsername() {
      if (this.user.username === '' || this.user.password === '') {
        this.errMsg = 'Please  fill both fields'
        return true
      }
    },
    sendInfo() {
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
        return
      }
      if (this.validUsername()) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'bottom-center',
          color: '#5b3cc4',
          title: this.errMsg,
        })
        return
      }
      this.isLoading = true
      this.checkUserNameAvailable(this.user).then(() => {
        this.isLoading = false
        if (this.isUserNameAvailable) {
          console.log('logged in')
        } else {
          this.$vs.notification({
            duration: 4000,
            progress: 'auto',
            border: null,
            position: 'bottom-center',
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
.papa >>> .vs-input {
  background-color: var(--vs-cardback) !important;
  width: 100%;
  color: white;

}

.papa >>> .vs-input__label {
  width: 60%;
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
}

h2 {
  margin-bottom: 1.5rem;
}

.back {
  font-size: 25px;
  position: absolute;
  top: 9rem;
  left: 20%;
}

.papa >>> .vs-input__progress {
  position: absolute;
  bottom: 0;
  width: 75%;
  margin-left: 3rem;
}
</style>