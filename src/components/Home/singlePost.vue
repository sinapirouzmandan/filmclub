<template>
  <vs-col w="12" class="home" justify="space-around">
    <vs-card>
      <template #title>
        <img src="../../../public/img/avatar.jpg" alt="" style="width: 30px; height: 30px; border-radius: 50%; float: left;">
        <p class="userId">madman</p>
        <vs-button
            style="display: inline-block; float: right; margin-top: 0;"
            flat
            circle
            icon
            color="rgb(59,89,153)"
        >
          <i class="iconify" data-icon="bx:bx-bookmark" data-inline="false"></i>
        </vs-button>
        <vs-button
            style="display: inline-block; float: right; margin-top: 0;"
            flat
            circle
            icon
            color="rgb(59,89,153)"
        >
          <i class="iconify" data-icon="bx:bx-like" data-inline="false"></i><p style="color: white; margin-left: 5px;"> 43</p>
        </vs-button>
        <h3>Interstellar</h3>
        <h6 style="margin-top: 10px; font-size: 15px;"><span style="color: crimson;">#spoilers </span>#critic</h6>
      </template>
      <template #img>
        <img v-lazy="'https://www.fanbolt.com/storage/2014/11/interstellar-review.jpg'" alt="Image Load Error" id="postImage">
      </template>
      <template #text>
        <i class="iconify" data-icon="bx:bxs-star"></i>
        <span> 7.3 / 10
        </span>
        <p dir="auto">
          <br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit ....
        </p>
        <vs-button
            style="display: inline; margin-top: 1rem;"
            flat
        >
          View full post
        </vs-button>
        <small style="opacity: 0.3;"><br> 4 hours ago</small>
      </template>
    </vs-card>
  </vs-col>
</template>

<script>
export default {
  name: "singlePost",
  data(){
    return{
    }
  },
  props:['number']
}
</script>

<style scoped>
.home >>> .vs-card{
  background-color: var(--vs-cardback) !important;
  width: 100%;
  max-width:500px;
  margin: 20px auto;
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
.home >>> #postImage{
  width: 100%;
  background-color: black;
  min-height:200px;
}
.home >>> .vs-card:hover img{
  transform: scale(1,1) !important;
}
.home >>> .vs-card__interactions{
  left:40%;
  bottom:-4%;
  width: 100%;
}
</style>