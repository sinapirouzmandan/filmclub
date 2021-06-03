<template>
<div class="container bodyMargin">
  <div class="user">
    <div class="divider"></div>
    <vs-avatar>
    <template #text>
      Joel
    </template>
  </vs-avatar>
    <span>user X</span>
    <div class="divider"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "searchUsers"
}
</script>

<style scoped>
.container{
  margin-top: 1rem;
}
.user{
  width: 100%;
  height: 20rem;
  padding:15px;

}
.divider{
  width:100%;
  height:1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  margin-top: 15px;
}
.user >>> .vs-avatar{
  margin-top: 15px;
}
.user span{
  position: relative;
  top: 0;
  transform: translateY(-50%);
}
</style>