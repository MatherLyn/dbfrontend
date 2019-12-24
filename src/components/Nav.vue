<template>
  <div>
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#44aaff"
    text-color="#fff"
    active-text-color="#fff"
    :router="true"
    :default-active="'/'"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/ticketList">购买车票</el-menu-item>
      <el-menu-item index="/profile">个人中心</el-menu-item>
      <el-menu-item index="/admin">管理员中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  
</style>