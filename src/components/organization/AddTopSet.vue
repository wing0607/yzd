<template>
  <div class="wing-container">
    <el-drawer
      :before-close="handleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="orgTreeSetDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
      :wrapperClosable="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">编辑部门</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">部门信息</div>
          <el-form label-width="100px" :model="form" :rules="rules">
            <el-form-item label="部门名称:" prop="depname">
              <el-input disabled v-model=" orgDepName"></el-input>
            </el-form-item>
            <el-form-item label="设置主管:">
              <!-- <el-input v-model="form.topdep"></el-input> -->
              <div class="el-form-item__content">
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="leadDialogVisible = true"
                    id="wing-staff-input"
                  ></div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">确 定</el-button>
          <el-button type="danger" @click="deleDep" plain>删除</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <LeadDialog :leadDialogVisible="leadDialogVisible" @changeLeadDialog="updateLeadDialog" />
  </div>
</template>
<script>
import LeadDialog from './LeadDialog'
export default {
  name: 'AddTopSet',
  data() {
    return {
      form: {
        name: '',
        topdep: this.$store.state.orgDep.depName
      },
      leadDialogVisible: false,
      depdirection: 'rtl',
      loading: false,
      timer: null,
      rules: {
        // depname: [{ required: true }]
      }
    }
  },
  inject: ['reload'],
  computed: {
    orgDepName() {
      return this.$store.state.orgDep.depName
    }
  },
  props: {
    orgTreeSetDrawer: {
      type: Boolean
    }
  },
  mounted() {},
  watch: {
    orgTreeSetDrawer() {
      this.getDepInfo()
    }
  },
  components: {
    LeadDialog
  },

  methods: {
    //获取部门信息
    getDepInfo() {
      var depId = this.$store.state.orgDep.depId
      this.axios
        .post('/company/dept/oneInfo', { deptId: depId })
        .then(res => {
          console.log(res)
          var code = res.data.code
          if (code == 0) {
            var results = res.data.results
            this.form.depName = results.name
            this.form.depId = results.id
            this.form.parDepName = results.parentName
            this.form.parentId = results.parentId
            this.form.deptManager = results.deptManager
            this.form.deptParentManager = results.deptParentManager
          } else {
            // var msg = res.data.msg
            //that.$message.error(msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //添加部门表单提交
    handleClose(done) {
      console.log(this.$store.state.orgDep.depManager)
      var that = this
      var data = {
        deptManager: this.$store.state.orgDep.depManager,
        id: this.$store.state.orgDep.depId,
        name: this.$store.state.orgDep.depName,
        parentId: this.$store.state.orgDep.parentId
      }
      console.log(data)
      this.axios
        .post('/company/dept/update', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          if (code == 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            var msg = res.data.msg
            that.$message.error(msg)
            this.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$emit('changeupdateOrgTreeSetDrawer', false)
      document.getElementById('wing-staff-input').innerHTML = ''
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateOrgTreeSetDrawer', false)
      clearTimeout(this.timer)
      document.getElementById('wing-staff-input').innerHTML = ''
    },
    updateLeadDialog(data) {
      this.leadDialogVisible = data
    },
    deleDep() {
      this.$confirm('确定删除该部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var data = []
          let orgDep = this.$store.state.orgDep
          data.push({
            id: orgDep.depId,
            depName: orgDep.depName,
            depManager: orgDep.depManager,
            depParentManager: orgDep.depParentManager,
            userCount: orgDep.userCount,
            parentId: orgDep.parentId
          })
          this.axios
            .post('/company/dept/delete', data)
            .then(res => {
              console.log(res)
              var code = res.data.code
              if (code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.$emit('changeupdateOrgTreeSetDrawer', false)
                this.reload()
              } else {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
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