<template>
  <div>
    <el-container>
      <el-header style="height: auto; padding: 0;">
        <Header />
        <Nav />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer style="height: auto; padding: 0;">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Nav from './components/Nav'
  import Footer from './components/Footer'
  export default {
    data () {
      return {
        
      }
    },
    methods: {

    },
    components: {
      Header,
      Nav,
      Footer
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    min-width: 960px;
  }

  ul {
    list-style-type: none;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  .el-main {
    padding: 0 !important;
  }

  .el-menu-item {
    width: 25% !important;
    height: 40px !important;
    line-height: 40px !important;
    padding: 0 !important;
    text-align: center !important;
  }

  .el-input__icon {
    line-height: 30px !important;
  }

  .el-date-editor {
    width: 100% !important;
  }

  .el-button {
    width: 100% !important;
  }
  
  .form-item {
    margin-bottom: 20px;
  }
</style>