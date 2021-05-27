<template>
<nav class="xi-bottom-navbar">
  <vs-button
    flat
    circle
    icon
    :active="active === 0"
    @click="active = 0"
    >
    <i class="iconify" data-icon="bx:bxs-home" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="active === 0"
      @click="active = 0"
  >
    <i class="iconify" data-icon="bx:bx-search-alt" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="active === 0"
      @click="active = 0"
  >
    <i class="iconify" data-icon="bx:bxs-movie" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="active === 0"
      @click="active = 0"
  >
    <i class="iconify" data-icon="bx:bxs-bookmark-star" data-inline="false"></i>
  </vs-button>
  <vs-button
      flat
      icon
      :active="active === 0"
      @click="active = 0"
  >
    <i class="iconify" data-icon="bx-bxs-user" data-inline="false"></i>
  </vs-button>
</nav>
</template>

<script>
export default {
  name: "navbar",
  data(){
    return{
      active: 0,
    }
  }
}
</script>

<style scoped>
.xi-bottom-navbar{
  position: fixed;
  bottom: 0;
  right: 0;
  will-change: transform;
  transform: translateZ(0);
  height: 50px;
  width:100%;
  background-color: #1e2023;
  display:flex;

}
.vs-button{
  flex-grow: 1;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent !important;
}
</style>