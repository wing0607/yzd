<template>
  <el-container>
    <el-input placeholder="搜索" v-model="filterText"></el-input>
    <el-tabs v-model="activeName" @tab-click="funRoleHeight">
      <el-tab-pane label="组织架构" name="first">
        <OrgLeft id="OrgLeft" :orgHeight="orgHeight" />
        <OrgRT id="OrgRight" :orgHeight="orgHeight" />
      </el-tab-pane>
      <el-tab-pane label="角色" name="second">
        <OrgRoleLeft id="OrgRoleLeft" :roleHeight="roleHeight" />
        <OrgRoleRT id="OrgRoleRT" :roleRightHeight="roleRightHeight" />
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
      orgHeight: '',
      roleHeight: '',
      roleLeftHeight: '',
      roleRightHeight: ''
    }
  },
  mounted() {
    this.funOrgHeight()
  },
  methods: {
    funOrgHeight() {
      var height1 = document.getElementById('OrgLeft').clientHeight
      var height2 = 0
      var that = this
      this.$nextTick(function() {
        height2 = document.getElementById('OrgRight').clientHeight
        that.orgHeight = height1 > height2 ? height1 : height2
      })
    },
    funRoleHeight(tab, event) {
      var index = tab.index
      if (index == '1') {
        var height1 = 0
        var height2 = 0
        var that = this
        this.$nextTick(function() {
          height1 = document.getElementById('OrgRoleLeft').clientHeight
          height2 = document.getElementById('OrgRoleRT').clientHeight
          that.roleHeight = height1 > height2 ? height1 : height2
          that.roleLeftHeight =
            height1 > height2 ? that.roleHeight : that.roleHeight - 100
          that.roleRightHeight =
            height1 > height2 ? that.roleHeight + 100 : that.roleHeight
        })
      }
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
