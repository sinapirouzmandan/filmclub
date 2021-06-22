<template>
<div class="settingFather">
  <nav class="xi-top-head">
    <div class="logo">
      <h1>MovieBar</h1>
    </div>
    <div class="settings" @click="sideBar = !sideBar">
      <i class="iconify" data-icon="mdi:menu"></i>
    </div>
  </nav>
    <div class="hidden">
      <vs-sidebar
          absolute
          :open="sideBar"
          v-model="active"
      >
        <template #logo>
          <img src="data:image/jpeg;base64,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" alt="avatar">
          <div @click="sideBar = false" style="width: 100%;">
          <i class="iconify" data-icon="mdi:close" id="close"></i>
          </div>
        </template>
        <vs-sidebar-item id="home">
          <vs-switch primary v-model="active2">
            <template #circle>
              <i class="iconify switch" data-icon='bx:bxs-moon'></i>
            </template>
          </vs-switch>
        </vs-sidebar-item>
        <vs-sidebar-item id="update">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-cloud-snow'></i>
          </template>
          update
        </vs-sidebar-item>
        <vs-sidebar-item id="logout">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-log-out-circle'  @click="logout"></i>
          </template>
          <span @click="logout">Logout</span>
        </vs-sidebar-item>
        <div @click="deleteAccount">
        <vs-sidebar-item id="delete">
          <template #icon>
            <i class="iconify" data-icon='mdi:delete-circle-outline' style="color: red;"></i>
          </template>
          <p style="color: red;">
          Delete account
          </p>
        </vs-sidebar-item>
        </div>
        <template #footer>
          <vs-row dir="rtl">
            <vs-avatar badge-color="danger" badge-position="top-right" @click="$router.push('Notifications')">
              <i class="iconify" data-icon='bx:bx-bell' ></i>

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
import {mapMutations,mapActions,mapState} from 'vuex'
import swal from 'sweetalert'
import { mapGetters } from 'vuex'
export default {
  name: "settings",
  data(){
    return{
      sideBar:false,
      active: 'home',
      active2:true,
      deleteObj: {
        password: 'defaultpass',
        target: null,
        reason:null
      }
    }
  },
  computed:{
    ...mapState(['errMassage']),
    ...mapGetters(['notificatonsCalc'])
  },
  methods:{
    ...mapMutations(['setToken']),
    ...mapActions(['deleteUser']),
    logout(){
      console.log('hi')
      this.setToken(null)
      this.$router.go()
    },
    getNotif(){
      this.$vs.notification({
        duration: 3000,
        progress: 'auto',
        border: null,
        position:'top-center',
        color: '#296186',
        title: this.errMassage,
      })
    },
    deleteAccount(){
      swal({
        title: "Are you sure?",
        text: 'All your data will be permanently deleted',
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
          .then((willDelete) => {
            if (willDelete) {
              swal("Enter your password", {
                content: "input",
              }).then((value) => {
                this.deleteObj.password = value
                this.deleteUser(this.deleteObj).then(()=>{this.getNotif()}).catch(()=>{this.getNotif()})
              });
            }
          });
    }
  }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/magic');
.xi-top-head{
  position: absolute;
  top: 0;
  right: 0;
  left:0;
  height: 50px;
  width:100%;
  background-color: var(--vs-navs);
}
.logo h1{
  float: right;
  margin-top:2vh;
  margin-right: 5%;
  text-align: right;
  font-family:'magic', sans-serif;
}
.settings{
  float: left;
  margin-left: 5%;
  font-size: 40px;
  margin-top: 5px;
}
.settingFather >>> .vs-sidebar__item__text, .settingFather >>> .vs-sidebar__item__icon{
  color: white;
}
#close{
  color:white;
  font-size: 25px;
}
.settingFather >>> .vs-switch{
  margin: 0 auto;
  width: 70px !important;
  color: white;
}
</style>