<template>
  <div id="app">
    <Header />
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import OrgMain from './components/organization/OrgMain.vue'
import Header from './components/common/Header'

export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  components: {
    OrgMain,
    Header
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
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
  color: #2c3e50;
}

.wing-top-header {
  height: 60px;
  width: 100%;
  background: #fff;
}
.wing-top-head {
  width: 1080px;
  margin: 0 auto;
}
.wing-bottom-header {
  height: 40px;
  background: #f8f8f8;
  width: 100%;
  margin-bottom: 20px;
}
.wing-bottom-head {
  width: 1080px;
  margin: 0 auto;
}
.wing-bottom-head ul li {
  float: left;
  width: 260px;
  line-height: 40px;
}
.wing-bottom-head ul li a {
  font-size: 14px;
  color: #444;
}
.wing-top-head-left {
  float: left;
  height: 62px;
  line-height: 62px;
  text-align: left;
  margin-right: 40px;
  cursor: pointer;
  width: 190px;
}
.wing-top-head-center {
  float: left;
  display: -ms-flexbox;
  display: flex;
  height: 62px;
  width: 780px;
}
.wing-top-head-center ul li {
  float: left;
}
.wing-top-head-center ul li a {
  line-height: 60px;
  color: #333;
  display: block;
  width: 130px;
  font-size: 16px;
}
.wing-top-head-right {
  float: right;
  line-height: 62px;
  height: 62px;
  font-size: 12px;
}
</style>
