<template>
  <vs-col w="12" class="home" justify="space-around">
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
          <i class="iconify" data-icon="bx:bxs-bookmark" data-inline="false"></i><p style="color: white;"> Add to watch list</p>
        </vs-button>
        <h3>Interstellar</h3>
      </template>
      <template #img>
        <img :src="source" alt="Image Load Error" id="postImage" @error="imageError">
      </template>
      <template #text>
        <i class="iconify" data-icon="bx:bxs-star"></i>
        <span> 7.3 / 10
        </span>
        <p>
          <br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit ....
        </p>
        <small style="opacity: 0.3;"><br> 4 hours ago</small>
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
  name: "singlePost",
  data(){
    return{
      notry: 0,
      source: `https://picsum.photos/id/${this.number}/300/300`
    }
  },
  methods:{
    imageError(event){
      if(this.notry == 0){
        event.target.src=`http://www.religare.com.br/app/webroot/img/admin/noimg.png`
        this.notry = 1;
      }
    }
  },
  props:['number']
}
</script>

<style scoped>
.home >>> .vs-card{
  background-color: #121818 !important;
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
</style>