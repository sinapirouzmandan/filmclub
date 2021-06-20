<template>
  <div class="loader-centre">
    <div class="loader-loader"></div>
  </div>
</template>

<script>
export default {
  name: "loading.vue"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
* {outline-width: 0;	font-family: 'Roboto';}


.loader-centre {
  height: 200px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader-loader {
  width:30px;
  height: 30px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>