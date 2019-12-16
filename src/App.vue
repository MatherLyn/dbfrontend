<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
  import Header from './components/Header';
  export default {
    data () {
      return {
        
      }
    },
    methods: {

    },
    components: {
      Header
    }
  }
</script>

<style scoped>
  
</style>