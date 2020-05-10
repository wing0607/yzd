<template>
  <div id="app">
    <div class="wing-header">
      <div class="wing-head">
        <ul>
          <li>
            <router-link to="/">内部通讯录管理</router-link>
          </li>
          <li>
            <router-link to="/">部门管理</router-link>
          </li>
          <li>
            <router-link to="/">智能人事</router-link>
          </li>
          <li>
            <router-link to="/">外部联系人</router-link>
          </li>
        </ul>
      </div>
    </div>
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
}
.header {
  height: 100px;
  width: 100%;
  background: #fff;
}
.head {
  width: 1080px;
  margin: 0 auto;
}
</style>
