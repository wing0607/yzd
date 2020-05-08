<template>
  <el-container>
    <el-input placeholder="搜索" v-model="filterText"></el-input>
    <el-tabs v-model="activeName">
      <el-tab-pane label="组织架构" name="first">
        <OrgLeft id="OrgLeft" />
        <OrgRT id="OrgRight" />
      </el-tab-pane>
      <el-tab-pane label="角色" name="second">
        <OrgRoleLeft />
        <OrgRoleRT />
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script>
import OrgLeft from './OrgLeft'
import OrgRT from './OrgRT'
import OrgRoleLeft from './OrgRoleLeft'
import OrgRoleRT from './OrgRoleRT'
export default {
  name: 'OrgMain',
  components: {
    OrgLeft,
    OrgRT,
    OrgRoleLeft,
    OrgRoleRT
  },
  data() {
    return {
      activeName: 'first',
      filterText: '',
      orgHeight: ''
    }
  },
  mounted() {
    this.matchHeight()
  },
  methods: {
    matchHeight() {
      let height1 = document.getElementById('OrgLeft').clientHeight
      var height2 = 0
      var that = this

      this.$nextTick(function() {
        height2 = document.getElementById('OrgRight').clientHeight
        that.orgHeight = height1 > height2 ? height1 : height2
        console.log(that.orgHeight)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-container {
  position: relative;
}
.el-container > .el-input {
  padding: 10px;
  width: 180px;
  height: 40px;
  background: #f4f6f8;
}
.el-container > .el-tabs > .el-tabs__header {
  position: absolute;
  left: 0px;
  top: 60px;
  width: 200px;
  margin: 0;
  background: #f4f6f8;
}
.el-aside {
  padding: 15px 0;
}
</style>
