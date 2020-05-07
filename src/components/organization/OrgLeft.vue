<template>
  <el-aside width="200px">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tabs v-model="activeName">
      <el-tab-pane label="组织架构" name="first">
        <el-tree
          class="filter-tree"
          :data="orgdatas"
          :props="defaultProps"
          :filter-node-method="filterNode"
          default-expand-all
          highlight-current
          draggable
          @node-drop="handleDrop"
          @node-click="nodeClick"
          ref="tree"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="角色" name="second">
        <OrgRole />
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import OrgRole from './OrgRole'
import { mapActions } from 'vuex'
export default {
  name: 'OrgLeft',
  components: {
    OrgRole
  },
  props: {},
  data() {
    return {
      activeName: 'first',
      filterText: '',
      orgdatas: [
        {
          id: 111,
          label: '组织',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, orgdata) {
      if (!value) return true
      return orgdata.label.indexOf(value) !== -1
    },

    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(this.orgdatas)
    },
    ...mapActions(['nodeClick'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
  background: #f4f6f8;
  border-right: 1px solid #dedede;
}
.el-aside .el-input {
  padding: 10px;
  width: 178px;
}
</style>
