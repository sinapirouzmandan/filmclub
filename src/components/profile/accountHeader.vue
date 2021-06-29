<template>
  <div id="top" class="topHeader">
    <settings/>
    <input ref="header" accept="image/*" class="uploadHeader" type="file" @change="handleProfileUploads('header')">
    <img :alt="'header photo posted by ' + userProfile.username" :src="userHeader" class="backAvatar">
    <svg aria-hidden="true" class="changeHeader" fill="white" viewBox="0 0 24 24">
      <g>
        <path
            d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
        <path
            d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
      </g>
    </svg>
    <vs-row class="avatars">
      <vs-col w="3">
        <vs-avatar badge-color="success" circle size="90">
          <img :src="userAvatar" alt="avatar" class="avatar">
          <template v-if="userProfile.role == 'reviewer'" #badge>
            Reviewer
          </template>
        </vs-avatar>
        <svg :fill="userAvatar == (baseURl + '/public/images/avatar.jpg') ? '#0a0d0e' : 'white'" aria-hidden="true" class="changeProfile"
             viewBox="0 0 24 24">
          <g>
            <path
                d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
            <path
                d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
          </g>
        </svg>
        <input ref="file" accept="image/*" class="uploadAvatar" type="file" @change="handleProfileUploads('avatar')">
        <div class="username">
          <p>{{ userProfile.name }}</p>
          <i v-if="userProfile.username">@{{ userProfile.username }}</i>
        </div>
      </vs-col>
      <vs-col class="editProfile" offset="3" w="5">
        <vs-button
            style="width:100%; background-color: rgb(0,0,0)"
            @click="editPro = true"
        >
          Edit Profile
        </vs-button>
      </vs-col>
    </vs-row>

    <vs-dialog v-model="editPro" blur>
      <template #header>
        <h4 class="not-margin">
          Edit Profile
        </h4>
      </template>


      <div class="con-form">
        <vs-input v-model="userProfile.name" class="input-field" color="#5b3cc4" label-placeholder="Full name"
                  @change="changedName = true">
          <template v-if="isNameEmpty" #message-danger>
            Required
          </template>
          <template #icon>
            <i class="iconify" data-icon="bx:bxs-user"></i>
          </template>
        </vs-input>
        <vs-avatar class="bioIcon">
          <i class="iconify" data-icon="bx:bxs-info-circle"></i>
        </vs-avatar>
        <textarea id="bio" v-model="userProfile.biography" class="vs-input text-input bioEdit" placeholder="Biographi"
                  rows="5" @change="changedBio = true">
        </textarea>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button :loading="isLoading" block color="#5B3CC4" gradient @click="sendReq()">
            submit
          </vs-button>
        </div>
      </template>
    </vs-dialog>

  </div>
</template>

<script>
import settings from "./settings";
import {mapActions, mapState} from 'vuex'

export default {
  name: "accountHeader",
  components: {settings},
  data() {
    return {
      editPro: false,
      changedName: false,
      changedBio: false,
      isLoading: false,
      isNameEmpty: false,
      file: '',
      imageInfo: {
        image: '',
        location: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'errMassage', 'alternativeAvatar', 'alternativeHeader', 'baseURl']),
    userAvatar() {
      if (this.userProfile.avatar) {
        return this.baseURl + this.userProfile.avatar
      } else {
        return this.alternativeAvatar
      }
    },
    userHeader() {
      if (this.userProfile.header) {
        return this.baseURl + this.userProfile.header
      } else {
        return this.alternativeHeader
      }
    }
  },
  methods: {
    ...mapActions(['updateProfilePhoto', 'getUserProfile']),
    validName() {
      if (this.userProfile.name === '') {
        this.isNameEmpty = true
        return true
      } else {
        this.isNameEmpty = false
      }
    },
    getNotif() {
      if (this.errMassage){
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'top-center',
            color: '#296186',
            title: this.errMassage,
          })
          this.isLoading = false
          this.$store.commit('changeErrMsg', null)
      }
    },
    sendReq() {
      this.validName()
      if (!(this.isNameEmpty)) {
        if (this.changedName && this.changedBio) {
          this.$store.dispatch('updateName', this.userProfile.name)
          this.$store.dispatch('updateBio', this.userProfile.biography);
          this.changedName = false
          this.changedBio = false
          this.$vs.notification({
            duration: 3000,
            progress: 'auto',
            border: null,
            position: 'top-center',
            color: '#296186',
            title: 'Name and Bio updated successfully',
          })
        }
        else if (this.changedBio) {
          this.$store.dispatch('updateBio', this.userProfile.biography);
          this.getNotif()
          this.changedBio = false
        }
        else if (this.changedName) {
          this.$store.dispatch('updateName', this.userProfile.name)
          this.getNotif()
          this.changedName = false
        }
        else if (!(this.changedBio || this.changedName)) {
          this.editPro = false
        }
        this.editPro = false
      }
    },
    handleProfileUploads(location) {
      if (location == 'header') {
        this.file = this.$refs.header.files[0];
      } else {
        this.file = this.$refs.file.files[0];
      }
      if (this.file) {
        let formData = new FormData();
        formData.append(location, this.file);
        this.imageInfo.image = formData;
        this.imageInfo.location = location;
        this.updateProfilePhoto(this.imageInfo)
      }
    }
  }
}
</script>

<style scoped>
.avatars {
  margin-top: 110px;
}

.backAvatar {
  width: 100%;
  position: absolute;
  top: 50px;
  right: 0;
  left: 0;
  height: 100px;
  z-index: -4;
  background-color: #0a0d0e;
  object-fit: cover;
}

.editProfile {
  position: absolute;
  margin-top: 60px;
  right: 2.5rem;
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

.input-field >>> .vs-input {
  background-color: #171b1d !important;
  color: #d5cccc;
}

.bioEdit {
  background-color: #171b1d;
  float: left;
  margin-top: 1.5rem;
  color: #d5cccc;
  margin-left: 2rem;
  margin-bottom: 2rem;
  width: 80%;
}

.bioEdit:focus {
  background-color: #171b1d;
  border-bottom: 2px solid #5b3cc4;

}

.bioIcon {
  margin-top: 2rem;
  position: absolute;
  top: 2rem;
  width: 40px;
  height: 40px;
}

.avatar {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.uploadAvatar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 90px;
  width: 90px;
  background-color: blue;
  opacity: 0;
}

.uploadHeader {
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
  height: 100px;
  width: 100%;
  background-color: blue;
  opacity: 0;
}

.changeProfile {
  z-index: 2;
  margin: auto auto;
  position: absolute;
  top: 30px;
  left: 30px;
  width: 30px;
  height: 30px;
  color: white;
}

.changeHeader {
  z-index: 2;
  margin: auto auto;
  position: absolute;
  top: 5rem;
  left: 47%;
  width: 35px;
  height: 35px;
  color: white;
}
</style>