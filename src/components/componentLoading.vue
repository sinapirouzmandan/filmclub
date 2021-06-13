<template>
  <!--CSS Spinner-->
  <div class="spinner-wrapper">
    <div class="spinner">
    </div>
  </div>
</template>

<script>
export default {
  name: "componentLoading"
}
</script>

<style scoped>
.spinner-wrapper {
  width:100%;
  height:100%;
  background-color: var(--vs-mainback);
}.spinner {
   width: 40px;
   height: 40px;
   position: absolute;
   top: 48%;
   left: 45%;
   background-color: #afabab;

   border-radius: 100%;
   -webkit-animation: sk-scaleout 0.8s infinite ease-in-out;
   animation: sk-scaleout 0.8s infinite ease-in-out;
 }

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
      opacity: 0;
    }
}
</style>