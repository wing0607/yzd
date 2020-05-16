<template>
  <el-aside width="260px" id="info-box" :style="{height:roleHeight-100+ 'px'}">
    <div class="wing-roleLeft-btn">
      <el-button round size="mini">新增角色组</el-button>
      <el-button round size="mini">新增角色</el-button>
    </div>
    <el-tree
      class="filter-tree"
      :data="roledatas"
      :props="defaultProps"
      :filter-node-method="filterNode1"
      default-expand-all
      ref="tree"
    ></el-tree>
  </el-aside>
</template>

<script>
export default {
  name: 'OrgRoleLeft',
  props: ['roleHeight'],
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    roledatas() {
      return this.$store.state.roledatas
    }
  },
  methods: {
    filterNode1(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-container .el-tree {
  background: #f4f6f8;
}
.wing-roleLeft-btn {
  padding: 5px 20px;
  text-align: center;
}
</style>
