<template>
  <nav class="xi-top-head">
    <div class="logo">
      <h1>Film Club</h1>
    </div>
  </nav>
</template>

<script>

export default {
  name: "navbar"
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
  background-color: var(--vs-navs);
  display: flex;
  z-index: 9;
}

.logo h1 {
  float: left;
  margin-left: 30px;
  margin-top: 3vh;
  font-family: 'magic', sans-serif;
}
</style>