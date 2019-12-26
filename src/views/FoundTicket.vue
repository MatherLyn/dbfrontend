<template>
  <div style="padding: 20px;">
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="departure" label="出发地"></el-table-column>
      <el-table-column prop="destination" label="目的地"></el-table-column>
      <el-table-column prop="start_time" label="出发时间"></el-table-column>
      <el-table-column prop="end_time" label="到达时间"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleBuy(scope.row)" type="text" size="small">购买</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleBuy (item) {
        if (this.$store.state.offline) {
          this.$router.push({ path: '/login' })
        } else {
          console.log(item.id)
          console.log(this.$store.state.username)
          this.axios.get(`/book?id=${item.id}&username=${this.$store.state.username}`)
          .then(response => {
            console.log(response)
            if (response.data.status) history.go(0)
          })
        }
      }
    },
    mounted () {
      if (this.$store.state.foundTickets.length) {
        console.log(this.$store.state.foundTickets)
        this.$store.state.foundTickets.forEach(item => {
          const startTime = new Date(parseInt(item.start_time * 1000))
          const endTime = new Date(parseInt(item.end_time * 1000))
          item.start_time = `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
          item.end_time = `${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
        })
        this.tableData = this.$store.state.foundTickets
        console.log(this.$store.state.foundTickets)
        console.log(123123123)
      } else {
        this.axios.get('/ticketlist')
        .then(response => {
          response.data.forEach(item => {
            const startTime = new Date(parseInt(item.start_time * 1000))
            const endTime = new Date(parseInt(item.end_time * 1000))
            item.start_time = `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
            item.end_time = `${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
          })
          this.tableData = response.data
        })
      }
    },
    destroyed () {
      this.$store.state.foundTickets = []
    }
      
  }
</script>

<style scoped>

</style>