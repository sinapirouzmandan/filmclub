<template>
  <div id="app">
    <router-view/>
    <navbar v-if="showNavbar"></navbar>
  </div>
</template>

<style>
:root{
  --vs-gray-3: 0,0,0 !important;
}
head,body {
  background-color: #0a0d0e;
  user-select: none;
  overflow:auto;
  overflow:initial;
  margin: 0;
}
.bodyMargin {
  margin: 6px;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #34373d;
}
*{
  cursor: default;
  box-sizing: border-box;
}
img {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
img{
  color: rgba(0, 0, 0, 0) !important;
}
</style>
<script>
import {mapState} from 'vuex'
import navbar from './components/navbar.vue'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  components: {
    navbar
  },
  computed:{
    ...mapState(['showNavbar'])
  },
  created() {
    this.$store.commit('getTokenFromLocal')
  }
}
</script>