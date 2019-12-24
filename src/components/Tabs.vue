<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单管理" name="order">
        <List :type="1"/>
      </el-tab-pane>
      <el-tab-pane label="车票管理" name="ticket">
        <List :type="2"/>
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="user">
        <List :type="3"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from './List'
  export default {
    data () {
      return {
        activeName: 'order'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      List
    }
  }
</script>

<style scoped>
  
</style>