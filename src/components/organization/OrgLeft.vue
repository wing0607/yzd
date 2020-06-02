<template>
  <el-aside id="info-box">
    <el-tree
      class="filter-tree"
      :data="orgdatas"
      :props="defaultProps"
      :filter-node-method="filterNode"
      node-key="id"
      default-expand-all
      highlight-current
      @node-click="orgNodeClick"
      :expand-on-click-node="false"
      ref="tree"
    ></el-tree>
  </el-aside>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrgLeft',
  components: {},
  props: ['orgHeight'],
  data() {
    return {
      orgdatas: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    parentId() {
      return this.$store.state.orgDep.depId
    }
  },
  created() {
    this.getOrgTree()
  },
  mounted() {},
  watch: {
    parentId(newId, oldId) {
      this.$refs.tree.setCurrentKey(newId)
    }
  },
  methods: {
    //获取组织结构树
    getOrgTree() {
      this.axios
        .post('/company/dept/listTree', { parentId: -1 })
        .then(res => {
          var resData = res.data
          if (res.status == 200) {
            var results = resData.results
            this.orgdatas = results
            var orgDep = {
              depId: results[0].id,
              depName: results[0].name,
              depManager: results[0].deptManager,
              depParentManager: results[0].deptParentManager,
              userCount: results[0].userCount,
              parentId: results[0].parentId
            }
            this.$store.dispatch('orgDep', orgDep)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(1)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterNode(value, orgdatas) {
      if (!value) return true
      return orgdatas.name.indexOf(value) !== -1
    },
    //tree 拖拽排序
    // handleDrop(draggingNode, dropNode, dropType, ev) {
    //   console.log(this.orgdatas)
    //   this.axios
    //     .post('/company/dept/reOrder', this.orgdatas)
    //     .then(res => {
    //       console.log(res)
    //       // var resData = res.data
    //       // if (res.status == 200) {
    //       //   this.orgdatas = resData.results
    //       //   this.$nextTick(() => {
    //       //     this.$refs.tree.setCurrentKey(1)
    //       //   })
    //       // }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },

    ...mapActions(['orgNodeClick'])
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
}
</style>
