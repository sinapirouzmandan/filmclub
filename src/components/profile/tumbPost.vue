<template>
<div id="tumber">
  <vs-row class="tumbPostRow" justify="space-between">
  <vs-col v-for="(tump,index) in (1,16)" :key="index" w="6" class="tumbContainer" lg="3" xs="6">
    <div class="tumbPost">
      <img v-lazy="'https://picsum.photos/id/' + Math.floor(Math.random(50,90) * 100) + '/1000/1000'" alt="image">
      <div class="caption">Movie Name</div>
    </div>
  </vs-col>
  </vs-row>
  <p style="margin-bottom: 50px; opacity: 0.1; font-size:15px;">end of content ...</p>
</div>
</template>

<script>
export default {
  name: "tumbPost",

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
  padding:6px;
  background-color: #1e2023;

}
#tumber >>> .tumbContainer{
  padding:20px;
}
.tumbPostRow{
  margin-top: 35px;
}
.caption{
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left:0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.7));
  height:60px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 20px 0;
}
</style>