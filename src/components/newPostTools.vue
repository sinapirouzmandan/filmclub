<template>
  <div class="tools">
    <div class="top-tools">
      <vs-row>
        <vs-col w="1">
            <i class='iconify close' data-icon="mdi:close"></i>
        </vs-col>
        <vs-col w="7"></vs-col>
        <vs-col w="4">
          <vs-button
              class="sendPost"
              flat
              warn
              animation-type="vertical"
          >
            Message
            <template #animate >
              <i class='bx bx-mail-send' ></i> Send
            </template>
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
    <vs-button
        class="floating-add-image"
        circle
        icon
        floating
    >
      <i class='iconify' data-icon="bx:bxs-image-add"></i>
    </vs-button>
  </div>
</template>

<script>
export default {
  name: "newPostTools",
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.floating-add-image{
  position: fixed;
  bottom: 10%;
  right:2rem;
}
.tools >>> .floating-add-image{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}
.iconify{
  font-size: 1.6rem;
}
.top-tools{
  position: fixed;
  top: 0;
  right: 0;
  will-change: transform;
  transform: translateZ(0);
  height:45px;
  width:100%;
  background-color: #1e2023;
  display:flex;
  z-index: 999999999;
}
.close{
  width: 2rem;
  height:2rem;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}
.sendPost{
  float: right;
  margin-right: 15%;
  margin-top: 7px;
}
</style>