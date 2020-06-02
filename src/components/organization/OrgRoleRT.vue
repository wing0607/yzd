<template>
  <el-main class>
    <div class="wing-role-first" v-if="!this.$store.state.orgRole.roleId">
      <div class="wing-role-img">
        <img src="../../assets/img/role-img.png" />
      </div>
      <div class="wing-role-btn-container">
        <el-button round size="mini" type="primary">新增角色</el-button>
      </div>
    </div>

    <div class="wing-role-second" v-if="this.$store.state.orgRole.roleId">
      <div class="orgRt-title clearfix">
        <span class="orgRt-tit fl">{{orgRoleTreeName}}</span>
        <el-button round size="mini" class="fl" @click="roleEdit">编辑</el-button>
      </div>
      <div class="wing-gray-title clearfix">
        <el-button class="fl" round size="mini" @click="chooseDepRoleVisible=true">添加成员</el-button>
        <el-button class="fl" round size="mini" @click="batchDelete">批量移除</el-button>
      </div>
      <el-table
        :data="tableRoleData"
        class="role-table"
        id="role-table"
        default-expand-all
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" type="index" width="50px"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="部门" prop="orgName"></el-table-column>
      </el-table>
    </div>
    <RoleEditDrawer :roleEditDrawer="roleEditDrawer" @updateRoleEditDrawer="updateRoleEditDrawer" />
    <RoleTeamEditDrawer
      :roleTeamEditDrawer="roleTeamEditDrawer"
      @updateRoleTeamEditDrawer="updateRoleTeamEditDrawer"
    />
    <ChooseDepRole
      :chooseDepRoleVisible="chooseDepRoleVisible"
      @updateChooseDepRole="updateChooseDepRole"
    />
  </el-main>
</template>

<script>
import RoleEditDrawer from './RoleEditDrawer'
import RoleTeamEditDrawer from './RoleTeamEditDrawer'
import ChooseDepRole from './ChooseDepRole'
export default {
  name: 'OrgRoleRT',
  components: {
    RoleEditDrawer,
    RoleTeamEditDrawer,
    ChooseDepRole
  },
  data() {
    return {
      show: true,
      tableRoleData: [],
      multipleSelection: [],
      roleEditDrawer: false,
      roleTeamEditDrawer: false,
      chooseDepRoleVisible: false
    }
  },

  props: ['roleHeight'],
  watch: {
    orgRoleTreeName() {
      var roleId = this.$store.state.orgRole.roleId
      // console.log(roleId)
      if (roleId != '') {
        this.roleTableData(roleId)
      }
    }
  },
  computed: {
    orgRoleTreeName() {
      return this.$store.state.orgRole.roleName
    }
  },
  mounted() {},
  methods: {
    roleEdit() {
      var roleType = this.$store.state.orgRole.roleType
      console.log(roleType)
      if (roleType == 1) {
        this.roleTeamEditDrawer = true
      } else if (roleType == 2) {
        this.roleEditDrawer = true
      }
    },
    updateRoleEditDrawer(data) {
      this.roleEditDrawer = data
    },

    updateRoleTeamEditDrawer(data) {
      this.roleTeamEditDrawer = data
    },
    updateChooseDepRole(data) {
      this.chooseDepRoleVisible = data
    },
    roleTableData(roleId) {
      //  var roleId = this.$store.state.orgRole.roleId
      this.axios
        .post('/company/role/user/getUserList', { roleId: roleId })
        .then(res => {
          var resData = res.data.results
          console.log(res)
          if (res.data.code == 0) {
            console.log(resData.data)
            this.tableRoleData = resData.data
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSelectionChange(val) {
      console.log(val)
      for (var i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].userId)
      }
    },
    batchDelete() {
      var that = this
      var len = that.multipleSelection.length
      if (len == 0) {
        that.$message.error('请选择要删除的人员')
      } else {
        this.$confirm('确认从该角色中移除选中员工？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var data = {
              roleId: that.$store.state.orgRole.roleId,
              userIds: that.multipleSelection
            }
            console.log(data)
            that.axios
              .post('/company/role/user/deleteUser', data)
              .then(res => {
                console.log(res)
                var code = res.data.code
                if (code == 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })

                  var roleId = this.$store.state.orgRole.roleId
                  this.roleTableData(roleId)
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
.wing-role-img img {
  width: 100%;
}
.wing-role-btn-container {
  padding: 10px 0;
  text-align: center;
}
.orgRt-tit {
  font-size: 20px;
  line-height: 28px;
  margin-right: 10px;
}
.orgRt-title {
  margin-bottom: 10px;
}
</style>
