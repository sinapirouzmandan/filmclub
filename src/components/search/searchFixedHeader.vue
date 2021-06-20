<template>
  <div class="container">
<div class="xi-top-head">
  <vs-input v-model="search" placeholder="UserName" @input="search !='' ? focused() : $emit('unfocused')">
    <template #icon>
      <i class='iconify' data-icon="bx:bx-search"></i>
    </template>
  </vs-input>
</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "searchFixedHeader",
  data: ()=>{
    return{
      search: ''
    }
  },
  methods:{
    ...mapActions(['searchUsers']),
    focused(){
      this.$emit('focused', true)
      this.searchUsers(
          this.search
      ).then(this.$emit('focused', false))
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  background-color: var(--vs-mainback);
}
.xi-top-head{
  padding: 14px;
}
.xi-top-head >>> .vs-input{
  background-color: var(--vs-navs) !important;
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