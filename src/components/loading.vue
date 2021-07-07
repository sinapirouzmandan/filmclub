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

* {
  outline-width: 0;
}


.loader-centre {
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.loader-loader {
  width: 30px;
  height: 30px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
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