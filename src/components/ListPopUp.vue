<template>
  <div class="popup">
    <div class="popup-form" @click="stopCapturing">
      <div class="close"><el-button icon="el-icon-close" circle class="close-btn" @click="popupClose"></el-button></div>
      <div class="header">新增车票</div>
      <div class="unit">
        <label class="popup-label" for="1">出发地</label>
        <el-input
          prefix-icon="el-icon-location-outline"
          placeholder="请输入内容"
          v-model="ticket.departure"
          clearable
          id="1">
        </el-input>
      </div>
      <div class="unit">
        <label class="popup-label" for="2">目的地</label>
        <el-input
          prefix-icon="el-icon-location-outline"
          placeholder="请输入内容"
          v-model="ticket.destination"
          clearable
          id="2">
        </el-input>
      </div>
      <div class="unit">
        <label class="popup-label" for="3">出发时间</label>
        <el-input
          prefix-icon="el-icon-location-outline"
          placeholder="请输入内容"
          v-model="ticket.start_time"
          clearable
          id="4">
        </el-input>
        <!-- <el-date-picker
          placeholder="选择日期"
          align="right"
          type="date"
          v-model="ticket.start_time"
          :picker-options="pickerOptions"
          clearable
          id="3">
        </el-date-picker> -->
      </div>
      <div class="unit">
        <label class="popup-label" for="3">到达时间</label>
        <el-input
          prefix-icon="el-icon-location-outline"
          placeholder="请输入内容"
          v-model="ticket.end_time"
          clearable
          id="4">
        </el-input>
        <!-- <el-date-picker
          placeholder="选择日期"
          align="right"
          type="date"
          v-model="ticket.end_time"
          :picker-options="pickerOptions"
          clearable
          id="3">
        </el-date-picker> -->
      </div>
      <div class="unit">
        <label class="popup-label" for="3">价格</label>
        <el-input
          prefix-icon="el-icon-price-tag"
          placeholder="请输入内容"
          v-model="ticket.price"
          clearable
          id="5">
        </el-input>
      </div>
      <div class="unit">
        <label class="popup-label" for="3">库存</label>
        <el-input
          prefix-icon="el-icon-s-data"
          placeholder="请输入内容"
          v-model="ticket.stock"
          clearable
          id="6">
        </el-input>
      </div>
      <div class="msg" :class="{'error': error}" v-show="msg">{{msg}}</div>
      <div class="unit">
        <el-button type="primary" class="submit-btn" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'type'
    ],
    data () {
      return {
        msg: '',
        error: false,
        ticket: {
          departure: '',
          destination: '',
          start_time: '',
          end_time: '',
          price: '',
          stock: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 24 * 1000;
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
      popupClose () {
        this.$emit('popupClose')
        document.body.style.overflow = 'auto'
      },
      stopCapturing () {
        // 防止点击form表单时事件冒泡触发关闭
        event.stopImmediatePropagation()
      },
      submit () {
        if (!this.ticket.departure || !this.ticket.destination || !this.ticket.start_time || !this.ticket.end_time || !this.ticket.price || !this.ticket.stock) {
          this.error = true
          this.msg = '信息不能为空！'
          return
        }
        this.axios.post('/addticket', this.ticket)
        .then(response => {
          if (response.data.status) {
            this.error = false
            this.$emit('updateList')
          } else {
            this.error = true
          }
          this.msg = response.data.msg
        })
      }
    }
  }
</script>

<style scoped>
  .popup-label {
    text-align: left;
    margin: 20px 0 10px;
    font-size: 14px;
    line-height: 14px;
    color: #333;
  }

  .popup {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #00000050;
    left: 0;
    top: 0;
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-form {
    width: 450px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
    box-sizing: border-box;
  }

  .close {
    display: flex;
    flex-direction: row-reverse;
  }

  .close-btn {
    width: 20px !important;
    height: 20px;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header {
    font-size: 20px;
    color: #333;
  }

  .submit-btn {
    margin-top: 40px;
    width: 100%;
  }
</style>