<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="$store.state.username == 'admin'">
      <el-tab-pane label="订单管理" name="order">
        <OrderList />
      </el-tab-pane>
      <el-tab-pane label="车票管理" name="ticket">
        <TicketList />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="user">
        <UserList />
      </el-tab-pane>
    </el-tabs>
    <div v-else>对不起，您不是管理员，没有权限访问此页面</div>
  </div>
</template>

<script>
  import OrderList from './OrderList'
  import ProfileList from './ProfileList'
  import TicketList from './TicketList'
  import UserList from './UserList'
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
      OrderList,
      ProfileList,
      TicketList,
      UserList
    }
  }
</script>

<style scoped>
  
</style>