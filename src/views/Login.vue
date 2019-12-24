<template>
  <div>
    <div class="register">
      <div class="form">
        <Badge />
        <div class="form-item">
          <div class="form-head">登录</div>
        </div>
        <div class="form-item">
          <label for="username">用户名</label>
          <el-input type="text" id="username" prefix-icon="el-icon-user" v-model="user.name" class="larger-input"></el-input>
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <el-input type="password" id="password" prefix-icon="el-icon-lock" v-model="user.password" class="larger-input"></el-input>
        </div>
        <div class="form-item" style="overflow: hidden;">
          <router-link to="/register" style="float: left; color: black;">注册账号</router-link>
          <router-link to="/modifypassword" style="float: right; color: black;">忘记密码？</router-link>
        </div>
        <div class="form-item" style="margin-bottom: 0;" v-show="msg">
          <span class="tips">* </span><span>{{msg}}</span>
        </div>
        <div class="form-item">
          <el-button type="primary" class="submit-button" @click="onSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <Tips :content="'登录成功'" v-if="successful"/>
  </div>
</template>

<script>
  import Badge from '../components/Badge'
  import Tips from '../components/Tips'
  export default {
    data () {
      return {
        user: {
          name: '',
          password: ''
        },
        msg: '',
        successful: false
      }
    },
    methods: {
      onSubmit() {
        this.axios.post('/api/login', this.user)
        .then(response => {
          const responseData = response.data
          if (responseData.code) {
            this.$store.state.offline = false
            this.$store.state.username = this.user.name
            this.successful = true
            const redirect = this.$route.query.redirect
            console.log(redirect)
            if (redirect) {
              setTimeout(() => {
                this.$router.push({ path: redirect })
              }, 2000);
              return
            }
            if (this.user.name === 'admin') {
              setTimeout(() => {
                this.$router.push({ path: '/analysis' })
              }, 2000);
            } else {
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 2000);
            }
          } else {
            this.msg = responseData.msg
          }
        })
      }
    },
    components: {
      Badge,
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