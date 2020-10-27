<template>
  <div>
      <table>
        <div v-for="(item,index) in dataList" :key="index">
        <Item :ItemData="item"></Item>
        </div>
      <table>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name:'ItemList',
  components:{
    Item
  },
  data() {
    return {
      dataList:[]
    }
  },
}
</script>

<style>

</style>