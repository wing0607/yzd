<template>
  <el-aside width="260px" id="info-box" :style="{height:orgHeight-100+ 'px'}">
    <el-tree
      class="filter-tree"
      :data="orgdatas"
      :props="defaultProps"
      :filter-node-method="filterNode"
      node-key="id"
      default-expand-all
      highlight-current
      draggable
      @node-drop="handleDrop"
      @node-click="nodeClick"
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
  computed: {},
  created() {
    this.getOrgTree()
  },
  mounted() {},
  methods: {
    getOrgTree() {
      var token = localStorage.token
      this.axios
        .post('/company/dept/listTree', { parentId: -1 })
        .then(res => {
          var resData = res.data
          if (res.status == 200) {
            this.orgdatas = resData.results
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
}
</style>
