<template>
<div>
<vs-row class="tumbPostRow" justify="space-between">
  <vs-col v-for="(tump,index) in (1,16)" :key="index" w="3" class="tumbContainer"><div class="tumbPost"></div></vs-col>
</vs-row>
  <p style="margin-bottom: 50px; opacity: 0.1; font-size:15px;">end of content ...</p>

</div>
</template>

<script>
export default {
  name: "tumbPost"
}
</script>

<style scoped>
.tumbPostRow{
  margin-top: 35px;
}
.tumbPost{
  background-color: #42b983;
  width:100%;
  padding-top: 100%;
}
.tumbContainer{
  padding:4px;

}
</style>