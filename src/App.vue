<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import OrgMain from './components/organization/OrgMain.vue'

export default {
  name: 'app',
  components: {
    OrgMain
  }
}
</script>

<style>
body {
  background: #e7e8eb;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 1000px;
  border: 1px solid #dedede;
  background: #fff;
}
</style>
