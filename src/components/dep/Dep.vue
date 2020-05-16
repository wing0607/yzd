<template>
  <div class="wing-contain padd20">
    <div class="dep-title">部门管理</div>
    <p class="dep-tip">在这里创建、编辑和批量修改部门设置</p>
    <div class="wing-gray-title clearfix">
      <el-button class="fl" round size="mini">添加部门</el-button>
      <router-link
        class="el-button fl el-button--default el-button--mini is-round"
        to="/depBatch"
      >批量创建部门</router-link>

      <el-button class="fr" round size="mini">编辑选中部门</el-button>
      <el-button class="fr" round size="mini">删除选中部门</el-button>
    </div>
    <el-table
      :data="depData"
      class="wing-dep-table"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="部门名称" width="180"></el-table-column>
      <el-table-column prop="deptManager" label="主管"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Dep',
  data() {
    return {
      depData: []
    }
  },
  mounted() {
    this.getOrgTree()
  },
  methods: {
    getOrgTree() {
      let depData = []
      this.axios
        .post('/dept/list', { parentId: 0 })
        .then(res => {
          var resData = res.data
          if (resData.success == true) {
            console.log(resData.result)
            this.depData = resData.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.dep-title {
  width: 100%;
  font-size: 20px;
}
.dep-tip {
  font-size: 12px;
  width: 100%;
  color: #929292;
  margin: 10px 0;
}
</style>