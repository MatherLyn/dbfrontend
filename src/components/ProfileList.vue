<template>
  <div style="margin-top: 20px; padding: 20px;">
    <el-table :data="showData">
      <el-table-column prop="ticket_id" label="车票编号"></el-table-column>
      <el-table-column prop="built_time" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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
      this.axios.get(`/profile?username=${this.$store.state.username}`)
      .then(response => {
        response.data.forEach(item => {
          item.built_time = item.built_time.replace('T', ' ').substring(0, item.built_time.length - 9)
        })
        this.showData = response.data
      })
    },
    components: {
    }
  }
</script>

<style>
  .title {
    display: flex;
  }

  .product-input {
    margin: 0 20px !important;
  }

  .search-btn {
    width: 100px !important;
  }
</style>