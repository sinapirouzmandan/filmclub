<template>
  <div class="notif" :style="position">
    <h4 class="not-margin">
      Notifications
    </h4>
  <vs-alert>
    <i class="iconify icon" data-icon="mdi:bell-circle-outline"></i>
    <span class="desc">
    @artin liked your post
      </span>
    <img src="https://picsum.photos/100/60" alt="post" class="notifImage">
  </vs-alert>
  <vs-alert>
    <i class="iconify icon" data-icon="mdi:bell-circle-outline"></i>
    <span class="desc">
    @artin posted a comment
      </span>
    <img src="https://picsum.photos/100/60" alt="post" class="notifImage">
  </vs-alert>
  <vs-alert>
    <i class="iconify icon red" data-icon="mdi:delete-circle-outline"></i>
    <span class="desc">
    We deleted your post for spoiling
      </span>
    <img src="https://picsum.photos/100/60" alt="post" class="notifImage">
  </vs-alert>
  <vs-alert>
    <i class="iconify icon warn" data-icon="mdi:alert-circle-outline"></i>
    <span class="desc">
    This is a warning because of reason X
      </span>
  </vs-alert>
  <p style="margin-bottom: 9rem; opacity: 0; font-size:15px;">end of content ...</p>

  </div>
</template>

<script>
export default {
  name: "Notifications",
  created() {
    this.$store.commit('toggleNavbar',true);
    this.$store.dispatch('getUserProfile')
  },
  props:['position']
}
</script>

<style scoped>
.notif{
  padding: 10px;
}
.notif >>> h4{
  color: white;
}
.notif >>> .vs-alert__content__text{
  color: white;
  text-align: left;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 14px;
}
.notif >>> .vs-alert{
  margin-top: 15px;
}
.notif >>> .notifImage{
  width: 80px;
  height: 55px;
  position: absolute;
  top:10px;
  right: 10px;
  float: right;
}
.icon{
  font-size: 1.5rem;
  position: absolute;
  left:1rem;
  top:1.7rem;
}
.red{
  color: red;
}
.warn{
  color: darkorange;
}
.desc{
  margin-right: 100px;
}
</style>