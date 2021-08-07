<template>
  <div :style="position" class="notif">
    <div style="width: 100%; height: 50px;" @click="loadNotification">
      <h4 class="not-margin">
        Notifications
        <i class="iconify" data-icon="mdi:reload"></i>
      </h4>
    </div>
    <div class="iconLoad">
      <i class="iconify" data-icon="mdi:bell-circle-outline"></i>
      <i class="iconify" data-icon="mdi:alert-circle-outline"></i>
      <i class="iconify" data-icon="mdi:arrow-up-circle-outline"></i>
    </div>
    <loading v-if="isLoading" style="height:30px;"/>
    <vs-alert v-for="(notification) in notifications" :key="notification.date" :class="notification.isSeen === false ? 'unseen' : ''">
      <router-link :to="{path: notification.link.props ? (notification.link.url+'/'+notification.link.props) : notification.link.url }" style="text-decoration: none; height:100%; width:100%;">
      <i :data-icon="notification.icon" :style="{ color: notification.color }" class="iconify icon"></i>
      <span class="desc">
    <span v-if="!(notification.customNotif)"><router-link :to='"/users/" + notification.commiter' style="text-decoration: none; font-weight: 700;">@{{ notification.commiter }}</router-link></span> {{ notification.message }}
      </span>
      </router-link>
    </vs-alert>

    <p style="margin-bottom: 9rem; opacity: 0; font-size:15px;">end of content ...</p>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import loading from '../components/loading'
export default {
  name: "Notifications",
  data(){
    return{
      isLoading: false
    }
  },
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
    this.loadNotification()
  },
  components:{loading},
  methods: {
    loadNotification() {
      this.isLoading = true
      this.$store.dispatch('getNotificationList').then(()=>{
        this.isLoading=false
        this.$store.dispatch('setNotificationsSeen')
      }).catch(()=>{
        this.isLoading=false
      })
      this.$forceUpdate()
    }
  },
  props: ['position'],
  computed: {
    ...mapState(['notifications'])
  }
}
</script>

<style scoped>
.notif {
  padding: 10px;
  box-sizing: border-box;
  overflow-x: scroll;
}

.notif >>> h4 {
  color: white;
}

.notif >>> .vs-alert__content__text {
  color: white;
  text-align: left;
  margin-top: 4px;
  margin-left: 15px;
  font-size: 14px;
  font-family: Yekan;
}

.notif >>> .vs-alert {
  margin-top: 15px;
  height: auto !important;
  background-color: transparent;
}

.icon {
  font-size: 1.5rem;
  position: absolute;
  left: 1rem;
  top: 1.4rem;
}

.desc {
  margin-right: 100px;
}

.iconLoad {
  opacity: 0;
}
.notif >>> .vs-alert::after{
  background: rgba(var(--vs-color), 0.2);
}
.notif >>> .unseen::after{
  background: rgba(var(--vs-color), 1);
}
</style>