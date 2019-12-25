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
    </div>
    <el-table :data="showData">
      <el-table-column prop="id" label="编号" fixed="left"></el-table-column>
      <!--type是1时，显示订单列表-->
      <el-table-column prop="built_time" label="创建时间" v-if="type==1"></el-table-column>
      <el-table-column prop="status" label="状态" v-if="type==1"></el-table-column>
      <el-table-column prop="ticket_id" label="车票编号" v-if="type==1"></el-table-column>
      <el-table-column prop="user_id" label="购买者编号" v-if="type==1"></el-table-column>
      <!--type是2时，显示车票列表-->
      <el-table-column prop="departure" label="出发地" v-if="type==2"></el-table-column>
      <el-table-column prop="destination" label="目的地" v-if="type==2"></el-table-column>
      <el-table-column prop="start_time" label="出发时间" v-if="type==2"></el-table-column>
      <el-table-column prop="end_time" label="到达时间" v-if="type==2"></el-table-column>
      <el-table-column prop="price" label="价格" v-if="type==2"></el-table-column>
      <el-table-column prop="stock" label="库存" v-if="type==2"></el-table-column>
      <!--type是3时，显示用户列表-->
      <el-table-column prop="username" label="用户名" v-if="type==3"></el-table-column>
      <el-table-column prop="password" label="密码" v-if="type==3"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" v-if="type==3"></el-table-column>
      <!--type是4时，显示的是用户的订单信息-->
      <el-table-column prop="built_time" label="创建时间" v-if="type==4"></el-table-column>
      <el-table-column prop="status" label="状态" v-if="type==4"></el-table-column>
      <el-table-column prop="ticket_id" label="车票编号" v-if="type==4"></el-table-column>
      <el-table-column
        fixed="right"
        prop="manipulation"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="checkItem(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
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
        filtering: false
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
      filterType (value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      checkItem (row) {
        const id = parseInt(row.id)
      },
      deleteItem (row) {
        this.workPiece.id = parseInt(row.id)
        this.workPiece.type = row.type
        this.workPiece.model = row.model
        this.workPiece.stock = parseInt(row.stock)
        console.log(this.workPiece)
        // this.axios.post('/api/workpiece/append', this.workPiece)
        // .then(response => {
        //   console.log(response)
        // })
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
      }
    },
    computed: {
      length () {
        if (this.filtering) return this.showData.length
        return this.tableData.length
      }
    },
    created() {
      this.axios.get('/api/orderList')
      .then(response => {
        this.tableData = response.data.data
        this.showData = response.data.data
      })
    },
    components: {
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    margin-bottom: 2rem;
  }

  .product-input {
    margin: 0 2rem;
  }

  .search-btn {
    width: 200px !important;
  }
</style>