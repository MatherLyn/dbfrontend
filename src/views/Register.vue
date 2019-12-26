<template>
  <div>
    <main class="register">
      <div class="form">
        <div class="form-item">
          <div class="form-head">注册</div>
        </div>
        <div class="form-item">
          <label for="username">用户名</label>
          <el-input type="text" id="username" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <el-input type="password" id="password" prefix-icon="el-icon-lock" v-model="user.password"></el-input>
        </div>
        <div class="form-item">
          <label for="password">确认密码</label>
          <el-input type="password" id="confirmPassword" prefix-icon="el-icon-lock" v-model="confirmPassword" class="larger-input"></el-input>
        </div>
        <div class="form-item">
          <label for="email">电子邮箱</label>
          <el-input type="email" id="email" prefix-icon="el-icon-message" v-model="user.email"></el-input>
        </div>
        <div class="form-item" style="overflow: hidden;">
          <router-link to="/login" style="float: left; color: black;">返回登录</router-link>
          <router-link to="/modifypassword" style="float: right; color: black;">忘记密码？</router-link>
        </div>
        <div class="form-item" style="margin-bottom: 20px;" v-show="msg">
          <span class="tips">* </span><span>{{msg}}</span>
        </div>
        <div class="form-item">
          <el-button type="primary" class="submit-button" @click="onSubmit" :disabled="!user.username || !user.password">提交</el-button>
        </div>
      </div>
    </main>
    <Tips :content="'注册成功'" v-show="successful"/>
  </div>
</template>

<script>
  import Tips from '../components/Tips'
  export default {
    data () {
      return {
        confirmPassword: '',
        user: {
          username: '',
          password: '',
          email: ''
        },
        msg: '',
        successful: false
      }
    },
    methods: {
      onSubmit() {
        if (this.user.password !== this.confirmPassword) {
          this.msg = '两次密码输入不正确'
          return
        }
        this.axios.post('/register', this.user)
        .then(response => {
          const responseData = response.data
          if (responseData.status) {
            this.successful = true
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
              this.$router.push({ path: '/login' })
            document.body.style.overflow = 'auto'
            }, 1000);
          } else {
            this.msg = responseData.msg
          }
        })
      }
    },
    components: {
      Tips
    }
  }
</script>

<style scoped>
  .register {
    background: url(../assets/timg.jpg) no-repeat;
    background-size: cover;
    position: relative;
    padding: 100px;
    box-sizing: border-box;
  }

  .form-head {
    font-weight: 600;
  }

  .form {
    background-color: rgba(255, 255, 255, .9);
    width: 400px;
    border-radius: 4px;
    padding: 40px;
  }
  
  .tips {
    color: #ff4040;
  }
</style>