<template>
<div id="tumber">
  <vs-row class="tumbPostRow">
  <vs-col v-for="(tump,index) in (1,16)" :key="index" w="6" class="tumbContainer" lg="4" xs="12">
    <vs-card type="3">
      <template #title>
        <h3>Pot with a plant</h3>
      </template>
      <template #img>
        <img v-lazy="'https://picsum.photos/id/' + Math.floor(Math.random(50,90) * 100) + '/1000/1000'" alt="image">
      </template>
      <template #text>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </template>
      <template #interactions>
        <vs-button danger icon>
          <i class="iconify" data-icon='bx:bxs-heart'></i>
          <span>
            12
          </span>
        </vs-button>
        <vs-button class="btn-chat" shadow primary  style="color: white">
          <i class="iconify" data-icon='bx:bx-chat'></i>
          <span class="span">
           54
        </span>
        </vs-button>
      </template>
    </vs-card>
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
.tumbPostRow{
  margin-top: 35px;
}
#tumber >>> .vs-card{
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  color: white;
}
</style>