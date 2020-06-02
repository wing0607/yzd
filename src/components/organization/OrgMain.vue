<template>
  <div>
    <el-container class="wing-contain">
      <el-input placeholder="搜索" v-model="filterText"></el-input>
      <el-tabs v-model="activeName" @tab-click="funRoleHeight" class="wing-tab">
        <el-tab-pane label="组织架构" name="first">
          <div
            id="OrgLeft"
            class="wing-org-left"
            width="260px"
            :style="{height:orgHeight-100+ 'px'}"
          >
            <OrgLeft id="OrgLeftMain" ref="first" />
          </div>
          <div id="OrgRight" class="wing-orgR-container" :style="{height:orgHeight+ 'px'}">
            <OrgRT id="OrgRightMain" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色" name="second">
          <div
            id="OrgRoleLeft"
            class="wing-org-left"
            width="260px"
            :style="{height:roleHeight-100+ 'px'}"
          >
            <OrgRoleLeft :roleHeight="roleHeight" />
          </div>
          <div id="OrgRoleRight" class="wing-orgR-container" :style="{height:roleHeight+ 'px'}">
            <OrgRoleRT id="OrgRoleRT" :roleHeight="roleHeight" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
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
      roleHeight: ''
      // roleLeftHeight: '',
      // roleRightHeight: ''
    }
  },

  mounted() {
    setTimeout(() => {
      this.funOrgHeight()
    }, 300)
  },
  computed: {
    parentId() {
      return this.$store.state.orgDep.depId
    },
    roleParentId() {
      return this.$store.state.orgRole.parentId
    }
  },
  watch: {
    filterText(val) {
      this.$refs.first.$refs.tree.filter(val)
    },
    parentId(newId, oldId) {
      var that = this
      setTimeout(() => {
        that.funOrgHeight()
      }, 500)
    },
    roleParentId(newId, oldId) {
      var that = this
      setTimeout(() => {
        // that.funOrgHeight()
      }, 300)
    }
  },
  methods: {
    funOrgHeight() {
      var height1 = document.getElementById('OrgLeftMain').clientHeight + 100
      var height2 = 0
      var that = this
      setTimeout(() => {
        height2 = document.getElementById('OrgRightMain').clientHeight
        that.orgHeight = height1 > height2 ? height1 : height2
        console.log(height2)
      }, 200)

      // this.$nextTick(function() {

      // })
    },
    funRoleHeight(tab, event) {
      var index = tab.index
      if (index == '1') {
        var height1 = 0
        var height2 = 0
        var that = this
        this.$nextTick(function() {
          height1 = document.getElementById('OrgRoleLeft').clientHeight + 100
          height2 = document.getElementById('OrgRoleRT').clientHeight
          console.log(height1, height2)
          that.roleHeight = height1 > height2 ? height1 : height2

          console.log(that.roleHeight)
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wing-org-left {
  background: #f4f6f8;
}
.el-container {
  position: relative;
}
.el-container > .el-input {
  padding: 10px;
  width: 240px;
  height: 40px;
  background: #f4f6f8;
}

.wing-tab .el-tabs__header {
  position: absolute;
  left: 0px;
  top: 60px;
  width: 240px;
  padding: 0 10px;
  margin: 0;
  background: #f4f6f8;
  height: 40px;
}
.el-tabs__active-bar .wing-tab {
  height: 0;
}
.wing-tab .el-tabs__nav-wrap::after {
  height: 0;
}
.wing-tab .el-tabs__active-bar {
  height: 0;
}

.wing-tab .el-tabs__header {
  margin: auto;
}
.wing-tab .el-tabs__item {
  padding: 0;
  height: 28px;
  box-sizing: border-box;
  line-height: 28px;
  text-align: center;
  width: 120px;
}
.wing-tab #tab-first.is-active,
.wing-tab .el-tabs__nav .el-tabs__item.is-active {
  background: #409eff;
  color: #fff;
}
.wing-tab .el-tabs__header {
  margin: 0;
}
.wing-tab #tab-first {
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  background: #e7eaef;
  border-right: 0;
}

.wing-tab #tab-first.is-active {
  padding-left: 15px;
}
.wing-tab .el-tabs__item:last-of-type {
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  padding-right: 15px;
  background: #e7eaef;
  border-left: 0;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.wing-tab .el-tabs__item.is-active {
  color: #fff;
}
</style>
