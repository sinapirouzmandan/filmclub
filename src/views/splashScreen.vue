<template>
<div id="splashOverlay">
  <div class="logo">
    <h1>Film</h1>
    <h1 class="subH1">Club</h1>
    <div class="loader-centre">
      <div class="loader-loader"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "splashScreen",
  created() {
    this.$store.commit('toggleNavbar', false);
  }
}
</script>

<style scoped>
#splashOverlay {
  position: fixed;
  top:0;
  right:0;
  width:100%;
  height:100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  font-family: magic,serif;
  z-index: 9999999;
}
* {
  outline-width: 0;
}
h1 {
  text-align: center;
}
.subH1 {
  margin-top: -1rem;
}
.loader-centre {
  height: 50px;
  width: 100%;
  display: inline-block;
 display: flex;
  align-items: center;
  justify-content: center;
}

.loader-loader {
  width: 22px;
  height: 22px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}
.logo{
  margin-top: -5rem;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>