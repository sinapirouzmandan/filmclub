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
          <img src="../../../public/img/avatar.jpg" alt="avatar">
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
                28
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
export default {
  name: "settings",
  data(){
    return{
      sideBar:false,
      active: 'home',
      active2:true
    }
  },
  computed:{
    ...mapState(['errMassage'])
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
                this.deleteUser(value).then(()=>{this.getNotif()}).catch(()=>{this.getNotif()})
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