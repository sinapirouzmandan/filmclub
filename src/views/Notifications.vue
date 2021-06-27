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
    <vs-alert v-for="(notification,index) in notifications" :key="index + Math.random() * 1000">
      <i :data-icon="notification.icon" :style="{ color: notification.color }" class="iconify icon"></i>
      <span class="desc">
    <span v-if="!(notification.customNotif)">{{ notification.commiter }}</span> {{ notification.message }}
      </span>
    </vs-alert>

    <p style="margin-bottom: 9rem; opacity: 0; font-size:15px;">end of content ...</p>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Notifications",
  created() {
    this.$store.commit('changeErrMsg', null)
    this.$store.commit('toggleNavbar', true);
    this.loadNotification()
  },
  methods: {
    loadNotification() {
      this.$store.dispatch('getNotificationList')
      this.$forceUpdate()
    }
  },
  props: ['position'],
  computed: {
    ...mapState(['notifications'])
  },
  mounted() {
    this.$store.dispatch('setNotificationsSeen')
  }
}
</script>

<style scoped>
.notif {
  padding: 10px;
}

.notif >>> h4 {
  color: white;
}

.notif >>> .vs-alert__content__text {
  color: white;
  text-align: left;
  margin-top: 5px;
  margin-left: 20px;
  font-size: 14px;
}

.notif >>> .vs-alert {
  margin-top: 15px;
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
</style>