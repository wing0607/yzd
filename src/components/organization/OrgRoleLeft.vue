<template>
  <el-tree
    :style="{height:roleLeftHeight+ 'px'}"
    class="filter-tree"
    :data="roledatas"
    :props="defaultProps"
    :filter-node-method="filterNode1"
    default-expand-all
    ref="tree"
  ></el-tree>
</template>

<script>
export default {
  name: 'OrgRoleLeft',
  props: ['roleLeftHeight'],
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
</style>
