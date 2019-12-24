<template>
  <div style="position: relative;">
    <el-carousel trigger="click" height="600px">
      <el-carousel-item v-for="item in imgItem" :key="item.id">
        <img :src="item.src" :alt="item.id" class="item-img">
      </el-carousel-item>
    </el-carousel>
    <TicketSuspension />
  </div>
</template>

<script>
  import TicketSuspension from './TicketSuspension'
  export default {
    data () {
      return {
        imgItem: [
          {
            id: 1,
            src: require('../assets/spring.jpg')
          },
          {
            id: 2,
            src: require('../assets/summer.jpg')
          },
          {
            id: 3,
            src: require('../assets/autumn.jpg')
          },
          {
            id: 4,
            src: require('../assets/winter.jpg')
          },
        ]
      }
    },
    methods: {

    },
    components: {
      TicketSuspension
    }
  }
</script>

<style scoped>
  .item-img {
    width: 100vw;
    min-width: 1100px;
    margin-top: calc(-28.125vw + 300px);
  }

  @media screen and (max-width: 1100px){
    .item-img {
      margin-top: -9px;
    }
  }
</style>