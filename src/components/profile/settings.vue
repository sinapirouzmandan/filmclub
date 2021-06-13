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
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-home'></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item id="market">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-grid-alt'></i>
          </template>
          Market Overview
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
          <template #icon>
            <i class="iconify" data-icon='bx:bxs-music'></i>
          </template>
          Music
        </vs-sidebar-item>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class="iconify" data-icon='bx:bxs-donate-heart' ></i>
          </template>
          Donate
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-drink'></i>
          </template>
          Drink
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class="iconify" data-icon='bx:bxs-shopping-bags'></i>
          </template>
          Shopping
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class="iconify" data-icon='bx:bx-chat' ></i>
          </template>
          Chat
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar badge-color="danger" badge-position="top-right">
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
export default {
  name: "settings",
  data(){
    return{
      sideBar:false,
      active: 'home'
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
</style>