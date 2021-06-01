<template>
<div id="tumber">
  <vs-row class="tumbPostRow" justify="space-between">
  <vs-col v-for="(tump,index) in (1,16)" :key="index" :w="cols" class="tumbContainer">
    <div class="tumbPost">
      <img :src="'https://picsum.photos/id/' + Math.floor(Math.random(50,90) * 100) + '/100/100'" alt="image">
    </div>
  </vs-col>
  </vs-row>
  <p style="margin-bottom: 50px; opacity: 0.1; font-size:15px;">end of content ...</p>
</div>
</template>

<script>
export default {
  name: "tumbPost",
  props: ['cols']

}
</script>

<style scoped>
#tumber >>> .tumbPost{
  width:100%;
  padding-top: 100%;
}
#tumber >>> .tumbPost img{
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  right:0;
  left:0;
  padding:4px;

}
#tumber >>> .tumbContainer{
  padding:20px;
}
.tumbPostRow{
  margin-top: 35px;
}
</style>