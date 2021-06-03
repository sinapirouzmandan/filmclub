<template>
<div class="xi-top-head">
  <vs-input v-model="search" placeholder="User Name">
    <template #icon>
      <i class='iconify' data-icon="bx:bx-search"></i>
    </template>
  </vs-input>
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
.xi-top-head >>> .vs-input{
  background-color: #171b1d !important;
  width: 100%;

}
.xi-top-head >>> .vs-input__icon{
  background-color: #151718 !important;
}

</style>