<template>
  <div class="wing-contain padd20">
    <div class="dep-title">部门管理</div>
    <p class="dep-tip">在这里创建、编辑和批量修改部门设置</p>
    <div class="wing-gray-title clearfix">
      <el-button class="fl" round size="mini" @click="depdrawer = true">添加部门</el-button>
      <router-link
        class="el-button fl el-button--default el-button--mini is-round"
        to="/depBatch"
      >批量创建部门</router-link>

      <el-button
        class="wing-edit-btn fr"
        round
        size="mini"
        :disabled="isDisabled"
        @click="editDep"
      >编辑选中部门</el-button>
      <el-button
        class="wing-delete-btn fr"
        round
        size="mini"
        :disabled="isDisabled"
        @click="depDelete"
      >删除选中部门</el-button>
    </div>
    <el-table
      :data="depData"
      class="wing-dep-table"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      @selection-change="handleSelectionChange"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="部门名称" width="180"></el-table-column>
      <el-table-column prop="userCount" label="成员数"></el-table-column>
      <el-table-column prop="deptManagerName" label="主管"></el-table-column>
    </el-table>
    <AddDep :depdrawer="depdrawer" @changeupdateDepdrawer="updateDepdrawer" />
    <EditTop
      :orgTreeEditDrawer="orgTreeEditDrawer"
      @changeupdateOrgTreeEditDrawer="updateOrgTreeEditDrawer"
    />
    <DepBatchEdit
      :depBatchEditDrawer="depBatchEditDrawer"
      @updateDepBatchEdit="updateDepBatchEdit"
      :multipleSelection="multipleSelection"
    />
  </div>
</template>
<script>
import EditTop from '../organization/EditTop'
import AddDep from '../organization/AddDep'
import DepBatchEdit from './DepBatchEdit'
export default {
  name: 'Dep',
  data() {
    return {
      depData: [],
      depdrawer: false,
      multipleSelection: [], //部门人员checkbox
      isDisabled: true,
      orgTreeEditDrawer: false,
      depBatchEditDrawer: false
    }
  },
  components: {
    AddDep,
    EditTop,
    DepBatchEdit
  },
  mounted() {
    this.getOrgTree()
  },
  methods: {
    updateOrgTreeEditDrawer(data) {
      this.orgTreeEditDrawer = data
    },
    updateDepBatchEdit(data) {
      this.depBatchEditDrawer = data
    },
    //checkbox选中
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      if (val == '') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    //批量删除部门

    depDelete() {
      this.$confirm('确定删除该部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios
            .post('/company/dept/delete', this.multipleSelection)
            .then(res => {
              console.log(res)
              var resData = res.data
              if (resData.code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })

                this.getOrgTree()
              } else {
                this.$message({
                  type: 'danger',
                  message: resData.msg
                })
              }
            })
            .catch(err => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    updateDepdrawer(data) {
      this.depdrawer = data
    },
    getOrgTree() {
      let depData = []
      this.axios
        .post('/company/dept/listTree', { parentId: -1 })
        .then(res => {
          console.log(res)
          var resData = res.data
          if (resData.code == 0) {
            this.depData = resData.results
          }
          return this.depData
        })
        .catch(err => {
          console.log(err)
        })
    },
    //编辑部门
    editDep() {
      if (this.multipleSelection.length == 1) {
        var orgDep = {
          depId: this.multipleSelection[0].id,
          depName: this.multipleSelection[0].name,
          depManager: this.multipleSelection[0].deptManager,
          depParentManager: this.multipleSelection[0].deptParentManager,
          userCount: this.multipleSelection[0].userCount,
          parentId: this.multipleSelection[0].parentId
        }
        this.$store.dispatch('orgDep', orgDep)
        this.orgTreeEditDrawer = true
      } else if (this.multipleSelection.length > 1) {
        this.depBatchEditDrawer = true
      }
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