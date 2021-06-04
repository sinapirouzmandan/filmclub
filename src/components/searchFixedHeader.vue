<template>
  <div class="container">
<div class="xi-top-head">
  <vs-input v-model="search" placeholder="User Name">
    <template #icon>
      <i class='iconify' data-icon="bx:bx-search"></i>
    </template>
  </vs-input>
</div>
  </div>
</template>

<script>
export default {
  name: "searchFixedHeader",
  data: ()=>{
    return{
      search: ''
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  background-color: #0a0d0e;
}
.xi-top-head{
  padding: 14px;
}
.xi-top-head >>> .vs-input{
  background-color: #171b1d !important;
  width: 100%;
  color:white;
}
.xi-top-head >>> .vs-input__icon{
  background-color: #151718 !important;
}
.xi-top-head >>>.vs-input__label{
  position: absolute !important;
  left:42px !important;
  width:60%;

}
</style>