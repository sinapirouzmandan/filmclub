<template>
  <div class="settingFather">
    <nav class="xi-top-head">
      <div class="logo">
        <h1>Film Club</h1>
      </div>
      <div class="settings" @click="sideBar = !sideBar">
        <i class="iconify" data-icon="mdi:menu"></i>
      </div>
    </nav>
    <div class="hidden">
      <vs-sidebar v-model="active" :open="sideBar" absolute>
        <template #logo>
          <img :src="userAvatar" alt="avatar" style="border-radius: 50%; width:40px; height:40px;"/>
          <div style="width: 100%" @click="sideBar = false">
            <i id="close" class="iconify" data-icon="mdi:close"></i>
          </div>
        </template>
        <vs-sidebar-item id="home">
          <!--          <vs-switch warn v-model="mode" @change="changeColorTheme()">-->
          <!--            <template #circle>-->
          <!--              <i class="iconify switch" data-icon="bx:bxs-moon"></i>-->
          <!--            </template>-->
          <!--          </vs-switch>-->
        </vs-sidebar-item>
        <div  @click="update()">
        <vs-sidebar-item id="update">
          <template #icon>
            <i class="iconify" data-icon="bx:bx-cloud-snow"></i>
          </template>
          update
        </vs-sidebar-item></div>
        <vs-sidebar-item id="download">
          <template #icon>
            <i
                class="iconify"
                data-icon="bx:bx-download"
                @click="downloadTab"
            ></i>
          </template>
          <span @click="downloadTab">Download app</span>
        </vs-sidebar-item>
        <vs-sidebar-item id="logout">
          <template #icon>
            <i
                class="iconify"
                data-icon="bx:bx-log-out-circle"
                @click="logout"
            ></i>
          </template>
          <span @click="logout">Logout</span>
        </vs-sidebar-item>
        <div @click="deleteAccount">
          <vs-sidebar-item id="delete">
            <template #icon>
              <i
                  class="iconify"
                  data-icon="mdi:delete-circle-outline"
                  style="color: red"
              ></i>
            </template>
            <p style="color: red">Delete account</p>
          </vs-sidebar-item>
        </div>
        <template #footer>
          <vs-row dir="rtl">
            <vs-avatar
                badge-color="danger"
                badge-position="top-right"
                @click="$router.push('Notifications')"
            >
              <i class="iconify" data-icon="bx:bx-bell"></i>

              <template #badge>
                {{ notificatonsCalc }}
              </template>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import swal from "sweetalert";

export default {
  name: "settings",
  data() {
    return {
      sideBar: false,
      active: "home",
      mode: false,
      deleteObj: {
        password: "defaultpass",
        target: 'default',
        reason: 'default',
      },
    };
  },
  computed: {
    ...mapState(["errMassage", "userProfile", "alternativeAvatar", "baseURl"]),
    ...mapGetters(["notificatonsCalc"]),
    userAvatar() {
      if (this.userProfile.avatar) {
        return this.baseURl + this.userProfile.avatar;
      } else {
        return this.alternativeAvatar;
      }
    },
  },
  mounted: function () {
    this.root = document.documentElement;
  },
  methods: {
    ...mapMutations(["setToken"]),
    ...mapActions(["deleteUser"]),
    logout() {
      this.setToken(null);
      window.location.reload()
    },
    getNotif() {
      if (this.errMassage) {
        this.$vs.notification({
          duration: 3000,
          progress: "auto",
          border: null,
          position: "top-center",
          color: "#296186",
          title: this.errMassage,
        });
        this.$store.commit('changeErrMsg', null)
      }
    },
    deleteAccount() {
      swal({
        title: "Are you sure?",
        text: "All your data will be permanently deleted",
        icon: "warning",
        buttons: true,
        dangerMode: false,
        root: "",
      }).then((willDelete) => {
        if (willDelete) {
          swal("Enter your password", {
            content: "input",
          }).then((value) => {
            this.deleteObj.password = value;
            this.deleteUser(this.deleteObj)
                .then(() => {
                  this.getNotif();
                })
                .catch(() => {
                  this.getNotif();
                });
          });
        }
      });
    },
    update(){
    window.location.reload();
    },
    downloadTab() {
      window.open('https://download.filmclub.top', '_blank');
    }
    // changeColorTheme() {
    //   this.$nextTick(() => {
    //     if (this.mode == true) {
    //       this.root.style.setProperty("--vs-mainback", "#FFF");
    //       this.root.style.setProperty("--vs-navs", "#C6B0A8");
    //       this.rootm.style.setProperty("--vs-main-text", "#000");
    //     }
    //     else {
    //       this.root.style.setProperty("--vs-mainback", "#0a0d0e");
    //       this.root.style.setProperty("--vs-navs", "#293337");
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
.xi-top-head {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: var(--vs-navs);
}

.logo h1 {
  float: right;
  margin-top: 3vh;
  margin-right: 6vw;
  text-align: right;
  font-family: "magic", sans-serif;
}

.settings {
  float: left;
  margin-left: 5%;
  font-size: 40px;
  margin-top: 5px;
}

.settingFather >>> .vs-sidebar__item__text,
.settingFather >>> .vs-sidebar__item__icon {
  color: white;
}

#close {
  color: white;
  font-size: 25px;
}

.settingFather >>> .vs-switch {
  margin: 0 auto;
  width: 70px !important;
  color: white;
}
</style>