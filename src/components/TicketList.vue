<template>
  <div style="margin-top: 20px;">
    <div class="title">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          {{curCheck}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="id">编号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input
        placeholder="请输入想要查找的键名"
        v-model="checkValue"
        label="编号"
        clearable
        class="product-input">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="doFilter" class="search-btn">查找</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="doAdd" class="search-btn">新增</el-button>
    </div>
    <el-table :data="showData">
      <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
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
        <el-button @click="handleModify(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="length"
      style="margin-top: 20px; float: right;"
    ></el-pagination>
    <ListPopUp v-show="show" @popupClose="popupClose" @updateList="updateList"/>
  </div>
</template>

<script>
  import ListPopUp from './ListPopUp'
  export default {
    props: [
      'type'
    ],
    data () {
      return {
        // 页面显示的字
        curCheck: '编号',
        // 实际要搜索的item
        check: 'id',
        // 输入框输入的值
        checkValue: '',
        // 用以切换过滤模式
        // 处于filtering模式时，列表长度变为showData的长度
        // 否则列表长度为tableData的长度
        search: '',
        tableData: [],
        showData: [],
        curSize: 10,
        curPage: 1,
        filtering: false,
        show: false
      }
    },
    methods: {
      handleCommand (command) {
        switch (command) {
          case 'id': {
            this.curCheck = '编号'
            break;
          }
        }
        this.check = command
      },
      doFilter () {
        this.handleCurrentChange(this.curPage)
        this.filtering = true
        this.search = this.checkValue
        if (!this.search) {
          this.filtering = false
          return
        }
        this.showData = this.tableData.filter(item => {
          return item[this.check].toString().toLowerCase().includes(this.search.toString().toLowerCase())
        })
        this.filtering = true
        this.curPage = 1
      },
      doAdd () {
        this.show = true
      },
      popupClose () {
        this.show = false
      },
      filterType (value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      handleSizeChange (val) {
        this.curSize = val
        const start = (this.curPage - 1) * val
        this.showData = this.tableData.slice(start, start + val)
      },
      handleCurrentChange (val) {
        this.curPage = val
        const start = (val - 1) * this.curSize
        this.showData = this.tableData.slice(start, start + this.curSize)
      },
      handleModify (item) {

      },
      handleDelete (item) {
        this.axios.get(`/delete?id=${item.id}`)
        .then(response => {
          if (response.data.status) {
            this.axios.get('/ticketlist')
            .then(response => {
              response.data.forEach(item => {
                const startTime = new Date(parseInt(item.start_time * 1000))
                const endTime = new Date(parseInt(item.end_time * 1000))
                item.start_time = `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
                item.end_time = `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
              })
              this.tableData = response.data
              this.showData = this.tableData
            })
          }
        })
      },
      updateList () {
        this.axios.get('/ticketlist')
        .then(response => {
          response.data.forEach(item => {
            const startTime = new Date(parseInt(item.start_time * 1000))
            const endTime = new Date(parseInt(item.end_time * 1000))
            item.start_time = `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
            item.end_time = `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
          })
          this.tableData = response.data
          this.showData = this.tableData
        })
      }
    },
    computed: {
      length () {
        if (this.filtering) return this.showData.length
        return this.tableData.length
      }
    },
    created() {
      this.axios.get('/ticketlist')
      .then(response => {
        console.log(response.data)
        response.data.forEach(item => {
          const startTime = new Date(parseInt(item.start_time * 1000))
          const endTime = new Date(parseInt(item.end_time * 1000))
          item.start_time = `${startTime.getFullYear()}-${startTime.getMonth()}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`
          item.end_time = `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
        })
        this.tableData = response.data
        this.showData = this.tableData
      })
    },
    components: {
      ListPopUp
    }
  }
</script>

<style scoped>
  .delete-btn {
    text-align: left !important;
  }
  
</style>