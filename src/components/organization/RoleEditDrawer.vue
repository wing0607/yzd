<template>
  <div class="wing-container">
    <el-drawer
      :before-close="roleHandleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="roleEditDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
      :wrapperClosable="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">编辑角色</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">角色信息</div>
          <el-form label-width="100px" :rules="rules">
            <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model=" roleName"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="100px" :rules="rules">
            <el-form-item label="分组到:" prop="roleParentId">
              <el-select
                v-model="value"
                placeholder="请选择"
                class="wing-select-container"
                style="top:0px"
                disabled
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="roleHandleClose">确 定</el-button>
          <el-button type="danger" @click="deleRole" plain>删除</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'RoleEditDrawer',
  inject: ['reload'],
  data() {
    return {
      depdirection: 'rtl',
      loading: false,
      timer: null,
      rules: {
        //roleTeamName: [{ required: true }]
      },
      options: [],
      value: '',
      roleName: '',
      roleDetail: ''
    }
  },
  computed: {},
  props: {
    roleEditDrawer: {
      type: Boolean
    }
  },
  mounted() {},
  watch: {
    roleEditDrawer() {
      this.getRoleTeam()
    }
  },
  components: {},

  methods: {
    getRoleTeam() {
      this.options = []
      var data = { roleId: this.$store.state.orgRole.roleId }
      this.axios
        .post('/company/role/getRoleInfo', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          if (code == 0) {
            var results = res.data.results
            this.roleDetail = results
            this.options.push({
              value: results.parentId,
              label: results.parentName
            })
            this.value = results.parentId
            this.roleName = results.name
          } else {
            // this.$message({
            //   type: 'danger',
            //   message: res.data.msg
            // })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    //删除
    deleRole() {
      this.$confirm('是否删除此角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var roleId = this.$store.state.orgRole.roleId
          this.axios
            .post('/company/role/delete', { id: roleId })
            .then(res => {
              console.log(res)
              var code = res.data.code
              if (code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.reload()
                this.$emit('updateRoleEditDrawer', false)
              } else {
                // var msg = res.data.msg
                //that.$message.error(msg)
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
    },
    //添加部门表单提交
    roleHandleClose(done) {
      console.log(this.value)
      let obj = {}
      console.log(this.options)
      obj = this.options.find(item => {
        console.log(item)
        return item.value === this.value
      })
      var that = this
      if (this.roleName == '') {
        this.$message.error('请输入角色名称')
        return
      }
      console.log(obj.value)
      var data = {
        name: this.roleName,
        parentId: obj.value,
        id: this.roleDetail.id
        //roleType: 2
      }
      this.axios
        .post('/company/role/updateRole', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          var results = res.data.results
          if (code == 0) {
            this.$message({
              type: 'success',
              message: results
            })
            this.reload()
          } else {
            console.log(res.data.msg)
            //that.$message.error(results)
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$emit('updateRoleEditDrawer', false)
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('updateRoleEditDrawer', false)
      clearTimeout(this.timer)
    }
  }
}
</script>
<style>
.addDep-header {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 19px 35px;
  font-size: 20px;
  width: 100%;
  background: #fff;
  z-index: 999999999;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.addDep-footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: #fff;
  z-index: 999999999;
  text-align: center;
  padding: 10px 0px;
  margin-bottom: 0px;
  border-top: 1px solid #eee;
}
#wing-staff-input {
  text-align: left;
  cursor: pointer;
}
#wing-staff-input span {
  padding: 5px;
  background: #eee;
  margin-left: 5px;
}
</style>