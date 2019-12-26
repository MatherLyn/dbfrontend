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
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
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
      this.axios.get('/userlist')
      .then(response => {
        this.tableData = response.data
        this.showData = this.tableData
        console.log(this.tableData)
      })
    },
    components: {
    }
  }
</script>

<style scoped>