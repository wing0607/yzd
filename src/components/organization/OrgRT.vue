<template>
  <el-main id="el-main" :style="{height:orgHeight+ 'px'}">
    <div class="orgRt-title clearfix">
      <span class="orgRt-tit fl">{{orgTreeName}}</span>
      <el-button
        round
        size="mini"
        v-show="orgTreeSet"
        class="fl"
        @click="orgTreeSetDrawer = true"
      >设置</el-button>
      <el-button
        round
        size="mini"
        v-show="orgTreeEdit"
        class="fl"
        @click="orgTreeEditDrawer = true"
      >编辑</el-button>
    </div>
    <div class="wing-org-title">
      <i class="iconfont wing-org-fonts">&#xe645;</i>
      <span>下级部门</span>
    </div>
    <div class="wing-gray-title clearfix">
      <el-button @click="depdrawer = true" class="fl" round size="mini">添加子部门</el-button>
    </div>
    <el-table
      :data="tableDepData"
      :show-header="hiddenTableHeader"
      @row-click="depRowClick"
      class="department-table"
      id="department-table"
      default-expand-all
    >
      <el-table-column label="序号" type="index" width="20px"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <div class="wing-org-title">
      <i class="iconfont wing-org-fonts">&#xe63d;</i>
      <span>部门人员</span>
    </div>
    <div class="wing-gray-title clearfix">
      <el-button @click="changeDepVisible = true" class="fl" round size="mini" type="primary">添加成员</el-button>
      <router-link
        class="el-button fl el-button--default el-button--mini is-round"
        to="/batch"
      >批量导入/导出/修改</router-link>
      <el-button class="fl" round size="mini" @click="changeDep">调整部门</el-button>
      <el-button class="fl" round size="mini" type="danger" plain @click="batchDelete">批量删除</el-button>
    </div>
    <el-table
      :data="RtableData"
      row-key="id"
      class="role-table"
      default-expand-all
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="姓名" prop="realname"></el-table-column>
      <el-table-column label="手机" prop="mobile"></el-table-column>
    </el-table>
    <AddDep :depdrawer="depdrawer" @changeupdateDepdrawer="updateDepdrawer" />
    <AddStaff :roledrawer="roledrawer" @changeupdateRoledrawer="updateRoledrawer" />
    <AddTopSet
      :orgTreeSetDrawer="orgTreeSetDrawer"
      @changeupdateOrgTreeSetDrawer="updateOrgTreeSetDrawer"
    />
    <EditTop
      :orgTreeEditDrawer="orgTreeEditDrawer"
      @changeupdateOrgTreeEditDrawer="updateOrgTreeEditDrawer"
    />
    <ChangeDep
      :changeDepVisible="changeDepVisible"
      @updateChangeDep="updateChangeDep"
      :multipleSelection="multipleSelection"
    />
  </el-main>
</template>

<script>
import Sortable from 'sortablejs'
import AddDep from './AddDep'
import AddStaff from './AddStaff'
import AddTopSet from './AddTopSet'
import EditTop from './EditTop'
import ChangeDep from './ChangeDep'
export default {
  name: 'OrgRT',
  components: {
    AddDep,
    AddStaff,
    AddTopSet,
    EditTop,
    ChangeDep
  },
  props: ['orgHeight'],
  data() {
    return {
      depdrawer: false,
      roledrawer: false,
      orgTreeSetDrawer: false,
      orgTreeEditDrawer: false,
      hiddenTableHeader: false,
      changeDepVisible: false,
      // orgTreeName1: '',
      form: {
        name: '',
        topdep: ''
      },
      tableDepData: [],
      RtableData: [],
      multipleSelection: [] //部门人员checkbox
    }
  },
  computed: {
    orgTreeSet() {
      return this.$store.state.orgTreeSet
    },
    orgTreeName() {
      return this.$store.state.orgDep.depName
    },

    orgTreeEdit() {
      return this.$store.state.orgTreeEdit
    }
  },
  created() {
    //this.orgFunTreeName()
    this.orgDepTable(1)
    this.orgRoleTable(1)
  },
  mounted() {
    this.depRowDrop()
    this.roleRowDrop()
  },
  watch: {
    //点击组织架构树获取tableDepData
    orgTreeName() {
      var parentId = this.$store.state.orgDep.depId
      console.log(parentId)
      if (parentId != '') {
        this.orgDepTable(parentId)
        this.orgRoleTable(parentId)
      }
    }
  },
  methods: {
    //部门拖拽排序
    depRowDrop() {
      const tbody = document.querySelector('.department-table tbody')
      const that = this
      Sortable.create(tbody, {
        onEnd(evt) {
          that.tableDepData.splice(
            evt.newIndex,
            0,
            that.tableDepData.splice(evt.oldIndex, 1)[0]
          )
          let newArray = that.tableDepData.slice(0)
          for (let i in newArray) {
            newArray[i].index = ++i
          }
          that.tableDepData = []
          that.$nextTick(function() {
            that.tableDepData = newArray
            this.axios
              .post('/company/dept/reOrder', that.tableDepData)
              .then(res => {
                if (res.data.code != 0) {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
        }
      })
    },
    //人员拖拽排序
    roleRowDrop() {
      const tbody = document.querySelector('.role-table tbody')
      const that = this
      Sortable.create(tbody, {
        onEnd(evt) {
          that.RtableData.splice(
            evt.newIndex,
            0,
            that.RtableData.splice(evt.oldIndex, 1)[0]
          )
          let newArray = that.RtableData.slice(0)
          for (let i in newArray) {
            newArray[i].index = ++i
          }
          that.RtableData = []
          that.$nextTick(function() {
            that.RtableData = newArray
            var deptId = that.$store.state.orgDep.depId
              ? that.$store.state.orgDep.depId
              : 1
            var rData = { deptId: deptId, companyUserDOS: that.RtableData }
            this.axios
              .post('/company/user/reOrder', rData)
              .then(res => {
                if (res.data.code != 0) {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
        }
      })
    },
    updateDepdrawer(data) {
      this.depdrawer = data
    },
    updateRoledrawer(data) {
      this.roledrawer = data
    },
    updateOrgTreeSetDrawer(data) {
      this.orgTreeSetDrawer = data
    },
    updateOrgTreeEditDrawer(data) {
      this.orgTreeEditDrawer = data
    },

    updateChangeDep(data) {
      this.changeDepVisible = data
    },
    // 获取公司名称
    // orgFunTreeName() {
    //   var that = this
    //   this.axios
    //     .post('/company/dept/listTree', { parentId: -1 })
    //     .then(res => {
    //       var resData = res.data
    //       if (res.status == 200) {
    //         let result = resData.results
    //         result.forEach(function(value, index, array) {
    //           if (array[index].parentId == -1) {
    //             // var depname = result[index].name
    //             // that.orgTreeName1 = depname
    //             var orgDep = {
    //               depId: result[index].id,
    //               depName: result[index].name,
    //               deptManager: result[index].deptManager,
    //               deptParentManager: result[index].deptParentManager,
    //               userCount: result[index].userCount,
    //               parentId: result[index].parentId
    //             }
    //             this.$store.dispatch('orgDep', orgDep)
    //             // that.$store.dispatch('orgDepName', depname)
    //           }
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    //加载时获取下级部门
    orgDepTable(parentId) {
      var that = this
      this.axios
        .post('/company/dept/listTree', { parentId: parentId })
        .then(res => {
          var resData = res.data
          if (res.status == 200) {
            that.tableDepData = resData.results
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //加载时获部门人员
    orgRoleTable(parentId) {
      var that = this
      this.axios
        .post('/company/user/list', { deptId: parentId })
        .then(res => {
          //console.log(res)
          var resData = res.data
          if (resData.code == 0) {
            console.log(resData.results)
            that.RtableData = resData.results
          } else {
            console.log(resData.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //部门table行点击
    depRowClick(row, column, event) {
      console.log(row)
      var orgDep = {
        depId: row.id,
        depName: row.name,
        depManager: row.deptManager,
        depParentManager: row.deptParentManager,
        userCount: row.userCount,
        parentId: row.parentId
      }
      this.$store.dispatch('orgDep', orgDep)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    //人员部门调整
    changeDep() {
      if (this.multipleSelection == 0) {
        this.$message({
          type: 'danger',
          message: '请选择要调整部门的员工!'
        })
      } else {
        this.changeDepVisible = true
      }
    },
    batchDelete() {
      var that = this
      var len = that.multipleSelection.length
      if (len == 0) {
        that.$message.error('请选择要删除的人员')
      } else {
        this.$confirm('是否要删除选中的员工？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var data = {
              deptId: that.$store.state.orgDep.depId,
              companyUserDOS: that.multipleSelection
            }
            that.axios
              .post('/company/user/removeList', data)
              .then(res => {
                console.log(res)
                var code = res.data.code
                if (code == 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  var parentId = this.$store.state.orgDep.depId
                  this.orgRoleTable(parentId)
                } else {
                  var msg = res.data.msg
                  that.$message.error(msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>
<style scoped>
.orgRt-tit {
  font-size: 20px;
  line-height: 28px;
  margin-right: 10px;
}

.no-underline {
  text-decoration: none;
}
.wing-org-title {
  width: 100%;
  padding: 19px 0px;
  font-size: 20px;
}
.wing-org-fonts{
  fo
}
</style>
