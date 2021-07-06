<template>
  <div id="top" class="topHeader">
    <img :alt="'header photo posted by ' + $route.params.user" :src="userHeader" class="backAvatar"
         @error="usernameInfo.header = '/public/images/header.jpg'">
    <vs-row class="avatars">
      <vs-col w="4">
        <vs-avatar badge-color="success" circle size="90">
          <img :src="userAvatar" alt="avatar" class="avatar" @error="usernameInfo.avatar = '/public/images/avatar.jpg'">
          <template v-if="usernameInfo.role == 'reviewer'" #badge>
            Reviewer
          </template>
        </vs-avatar>
        <div class="username">
          <p>{{ usernameInfo.name }}</p>
          <small>@{{ $route.params.user }}</small>
        </div>
      </vs-col>
      <vs-col class="editProfile" offset="3" w="4">
        <vs-button
            :class="border"
            :color="colorBtn"
            :gradient="gradient"
            :loading="isLoading"
            style="width:100%;"
            @click="follow"
        >
          {{ followText }}
        </vs-button>
        <vs-button
            v-if="userProfile.role == 'reviewer' && usernameInfo.role != 'reviewer'"
            color="#0a0d0e"
            gradient
            style="width:100%; border: 1px solid #7f1818;"
            @click="deleteAccount()"
        >
          <i class="iconify" data-icon="bx:bx-error"> </i>
          <span>Ban User</span>
        </vs-button>
      </vs-col>
    </vs-row>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import swal from "sweetalert";

export default {
  name: "accountHeader",
  data() {
    return {
      colorBtn: 'rgb(70,126,246)',
      border: '',
      gradient: true,
      followText: 'follow',
      isFollowed: false,
      isLoading: false,
      deleteObj: {
        password: 'defaultpass',
        target: null,
        reason: null
      }
    }
  },
  computed: {
    ...mapState(['usernameInfo', 'errMassage', 'userProfile', 'followStatus', 'baseURl', 'alternativeAvatar', 'alternativeHeader',]),
    userAvatar() {
      if (this.usernameInfo.avatar) {
        return this.baseURl + this.usernameInfo.avatar
      } else {
        return this.alternativeAvatar
      }
    },
    userHeader() {
      if (this.usernameInfo.header) {
        return this.baseURl + this.usernameInfo.header
      } else {
        return this.alternativeHeader
      }
    }
  },
  methods: {
    getNotif() {
      this.isLoading = false
      if (this.errMassage) {
        this.$vs.notification({
          duration: 4000,
          progress: 'auto',
          border: null,
          position: 'top-center',
          color: '#5b3cc4',
          title: this.errMassage,
        })
        this.$store.commit('changeErrMsg', null)
      }
    },
    ...mapActions(['toggleFollow', 'deleteUser', 'getFollowStatus']),
    follow() {
      this.isLoading = true
      this.toggleFollow(this.$route.params.user).then(() => {
        if (!(this.errMassage)) {
          if (!(this.isFollowed)) {
            this.gradient = false
            this.border = 'followBtn'
            this.colorBtn = 'rgba(255,255,255,0)'
            this.followText = 'Unfollow'
            this.isFollowed = !(this.isFollowed)
          } else {
            this.gradient = true
            this.border = ''
            this.colorBtn = 'rgb(70,126,246)'
            this.followText = 'follow'
            this.isFollowed = !(this.isFollowed)
          }
        }
        this.getNotif()
      }).catch(() => {
        this.getNotif()
      })
    },
    loadBtnStyle() {
      if ((this.isFollowed)) {
        this.gradient = false
        this.border = 'followBtn'
        this.colorBtn = 'rgba(255,255,255,0)'
        this.followText = 'Unfollow'
      } else {
        this.gradient = true
        this.border = ''
        this.colorBtn = 'rgb(70,126,246)'
        this.followText = 'follow'
      }
    },
    deleteAccount() {
      this.deleteObj.target = this.$route.params.user
      swal({
        title: "Are you sure?",
        text: 'This account will be banned permanently',
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
          .then((willDelete) => {
            if (willDelete) {
              swal("Reason to ban this account", {
                content: "input",
                // eslint-disable-next-line no-unused-vars
              }).then((value) => {
                if (value) {
                  this.deleteObj.reason = value
                  this.deleteUser(this.deleteObj).then(() => {
                    this.getNotif()
                  }).catch(() => {
                    this.getNotif()
                  })
                }
              });
            }
          });
    }
  },
  mounted() {
    this.getFollowStatus(this.$route.params.user).then(() => {
      this.isFollowed = this.followStatus
      this.loadBtnStyle()
    })
  }
}
</script>
<style scoped>
.backAvatar {
  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  height: 100px;
  z-index: -4;
  background-color: #0a0d0e;
  object-fit: cover;
}
.username {
  margin-top: 15px;
  width: 100%;
  text-align: left;
}

.username i {
  font-size: 15px;
}

.username p {
  width: 100%;
}
.avatars {
  margin-top: 50px;
}
.editProfile {
  margin-top: 60px;
}
.backAvatar {
  top: 0;
}
.avatar {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.followBtn {
  background-color: rgba(70, 126, 246, 0.22);
}
</style>