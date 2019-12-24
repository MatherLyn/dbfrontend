<template>
  <div>
    <div class="header">
      <div class="index" @click="$router.push({ path: '/' })">
        <div class="logo-container">
          <img src="../assets/railway.png" alt="" class="logo">
        </div>
        <div class="name">
          <div class="title">
            华南理工12307
          </div>
          <div class="slogan">
            12307 SCUT RAILWAY
          </div>
        </div>
      </div>
      <div class="profile">
        <span class="login" @click="$router.push({ path: '/login' })">登录</span>
        <span class="register" @click="$router.push({ path: '/register' })">注册</span>
      </div>
    </div>
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
  .index:hover {
    cursor: pointer;
  }
  
  .header {
    width: 100%;
    padding: 15px 0 15px 10%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .logo-container {
    width: 40px;
    height: 40px;
    float: left;
    margin-right: 10px;
  }
  
  .logo {
    width: 100%;
    height: 100%;
  }

  .name {
    width: 180px;
    height: 40px;
    float: left;
  }

  .title {
    font-size: 19px;
    font-weight: 500;
    height: 25px;
    line-height: 25px;
    letter-spacing: 1px;
  }

  .slogan {
    font-size: 13px;
    height: 15px;
    line-height: 15px;
    color: #888;
    font-weight: 200;
    letter-spacing: .6px;
  }

  .profile {
    float: right;
    background-color: rgb(245, 245, 245);
    height: 34px;
    line-height: 34px;
    margin-top: 3px;
    padding: 0 8% 0 140px;
    clip-path: polygon(
      0% 90%,
      32% 4%,
      33% 2%,
      34% 0%,
      100% 0%,
      100% 100%,
      0% 100%
    )
  }

  .login {
    margin-right: 20px;
  }

  .login:hover {
    cursor: pointer;
  }

  .register {

  }

  .register:hover {
    cursor: pointer;
  }
</style>