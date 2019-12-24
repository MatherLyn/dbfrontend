<template>
  <div>
    <div class="other-info">
      <div class="friendly-link">
        友情链接
        <div v-for="item in links" :key="item.id" class="link">
          <img :src="item.src" alt="logo">
          <a :href="item.link">{{ item.name }}</a>
        </div>
      </div>
      <div class="qr-codes">
        <ul class="code-list">
          <li class="code" v-for="item in codes" :key="item.id">
            <div class="code-name">{{ item.name }}</div>
            <img :src="item.src" alt="" class="code-img">
          </li>
        </ul>
      </div>
    </div>

    <div class="maker">
      <div class="info"><span>前端开发：林浩</span><span>后端开发：张协涛、杨纪超</span></div>
      <div class="info"><span>数据库设计：张协涛、杨纪超、林浩</span><span>页面参考设计：中国铁路12306</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        links: [
          {
            name: '中国铁路12306',
            link: 'https://www.12306.cn/index/',
            src: require('../assets/12306.png'),
          },
          {
            name: '百度一下，你就知道',
            link: 'https://www.baidu.com/',
            src: require('../assets/baidu.png'),
          }
        ],
        codes: [
          {
            id: 1,
            name: '中国铁路官方微信',
            src: require('../assets/zgtlwb.png')
          },
          {
            id: 2,
            name: '中国铁路官方微博',
            src: require('../assets/zgtlwx.png')
          },
          {
            id: 3,
            name: '12306公众号',
            src: require('../assets/public.png')
          },
          {
            id: 4,
            name: '铁路12306',
            src: require('../assets/download.png')
          }
        ]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .other-info {
    display: flex;
    box-sizing: border-box;
  }

  .friendly-link {
    box-sizing: border-box;
    padding: 40px 0 20px 100px;
    width: 40%;
  }

  .link {
    overflow: hidden;
    margin-top: 10px;
    line-height: 20px;
  }

  .link img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;
  }

  .link a {
    color: #333;
    text-decoration: #333;
    float: left;
  }

  .qr-codes {
    width: 60%;
  }

  .code-list {
    display: flex;
    width: fit-content;
    margin: 0 auto;
  }

  .code {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .code-name {
    text-align: center;
  }

  .code-img {
    width: 110px;
  }

  .maker {
    background-color: rgb(102, 102, 102);
    color: #eee;
    padding: 10px;
  }

  .info {
    display: flex;
    line-height: 40px;
  }

  .info > span {
    width: 50%;
    text-align: center;
  }
</style>