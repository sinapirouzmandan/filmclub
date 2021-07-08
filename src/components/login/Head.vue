<template>
  <nav class="xi-top-head">
    <div class="logo">
      <h1>Film Club</h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Head"
}
</script>

<style scoped>
.xi-top-head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #1e2023;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 99;
}
.logo h1 {
  font-family: magic, sans-serif;
  margin-top: 30px;
}
</style>