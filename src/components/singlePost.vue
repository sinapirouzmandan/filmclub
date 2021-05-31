<template>
  <vs-col w="12" class="home">
    <vs-card>
      <template #title>
        <img src="../../public/img/avatar.jpg" alt="" style="width: 30px; height: 30px; border-radius: 50%; float: left;">
        <p class="userId">madman</p>
        <vs-button
            style="display: inline-block; float: right;"
            flat
            circle
            icon
            color="rgb(59,89,153)"
        >
          <i class="iconify" data-icon="bx:bxs-bookmark" data-inline="false"></i>
        </vs-button>
        <h3>Interstellar</h3>
      </template>
      <template #img>
        <img src="../../public/img/foto5.png" alt="image">
      </template>
      <template #text>
        <i class="iconify" data-icon="bx:bxs-star"></i>
        <span> 7.3 / 10
        </span>
        <p>
          <br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit ....
        </p>
        <small style="opacity: 0.5;"><br> 4 hours ago</small>
      </template>
      <template #interactions>
        <vs-button danger icon>
          <i class="iconify" data-icon="bx:bx-heart" data-inline="false"></i>
          <span>45</span>
        </vs-button>
        <vs-button class="btn-chat" shadow primary>
          <i class="iconify" data-icon="bx:bx-chat" data-inline="false"></i>
          <span class="span">
          54
        </span>
        </vs-button>
      </template>
    </vs-card>
  </vs-col>
</template>

<script>
export default {
  name: "singlePost"
}
</script>

<style scoped>
.home >>> .vs-card{
  background-color: #1e2023 !important;
  margin-top: 20px;
  margin-bottom: 20px;
}
.home >>> .vs-card{
  margin-right:auto;
  margin-left:auto;
}
.home >>> .vs-card__title{
  color:white;
  font-size: 17px;
  text-align:left;

}
.home >>> .userId{
  display: inline-block;
  margin-left:7px;
  margin-top: 5px;
  margin-bottom: 30px;
  border-bottom: 1px solid white;
}
.home >>> .vs-card__text{
  color:white;
  text-align: left;
}
.btn-chat{
  background-color: #18191c !important;
}
.home >>> .vs-button__content svg,.home >>> .vs-button__content span{
  color:white;
  font-size: 17px;
}
</style>