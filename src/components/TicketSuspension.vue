<template>
  <div class="form">
    <div class="form-item">
      <div class="form-head">票务查询</div>
    </div>
    <div class="form-item">
      <label for="departure">出发地</label>
      <el-input type="text" id="departure" prefix-icon="el-icon-location-outline" class="smaller-input" v-model="formData.departure"></el-input>
    </div>
    <div class="form-item">
      <label for="destination">目的地</label>
      <el-input type="text" id="destination" prefix-icon="el-icon-location-outline" class="smaller-input" v-model="formData.destination"></el-input>
    </div>
    <div class="form-item" style="overflow: hidden;">
      <label for="startTime">出发时间</label>
      <el-date-picker
        v-model="formData.startTime"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        id="startTime">
      </el-date-picker>
    </div>
    <div class="form-item" style="margin-bottom: 0;" v-show="msg">
      <span class="tips">* </span><span>{{msg}}</span>
    </div>
    <div class="form-item">
      <el-button type="primary" class="submit-button" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          departure: '',
          destination: '',
          startTime: ''
        },
        msg: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    methods: {
      onSubmit () {
        
      }
    }
  }
</script>

<style scoped>
  .form {
    width: 400px;
    padding: 40px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, .9);
    position: absolute;
    top: 80px;
    left: 6%;
    z-index: 2;
  }

  .form-head {
    font-weight: 600;
  }

  .tips {
    color: #ff4040;
  }
</style>