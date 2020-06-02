<template>
  <div>
    <el-drawer
      :before-close="handleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="orgTreeEditDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">编辑部门</div>
        <div class="addDep-main">
          <el-form label-width="80px" v-model="form">
            <el-form-item label="部门名称:">
              <el-input v-model="form.depName"></el-input>
            </el-form-item>
            <el-form-item label="上级部门:">
              <!-- <el-input v-model="form.topdep" @click="chooseDepDialogVisible = true"></el-input> -->
              <div class>
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="chooseDepDialogVisible = true"
                    id="wing-staff-input-add"
                  >{{form.parDepName}}</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="设置主管:">
              <div class>
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="leadDialogVisible = true"
                    id="wing-staff-input"
                  ></div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="分管领导:">
              <div class>
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="leadDialogVisible = true"
                    id="wing-deptParentManager"
                  ></div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">确 定</el-button>
          <el-button type="danger" @click="deleDep">删除</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <LeadDialog :leadDialogVisible="leadDialogVisible" @changeLeadDialog="updateLeadDialog" />
    <ChooseDepDialog
      :chooseDepDialogVisible="chooseDepDialogVisible"
      @changeChooseDepDialog="updateChooseDepDialog"
    />
  </div>
</template>
<script>
import ChooseDepDialog from './ChooseDepDialog'
import LeadDialog from './LeadDialog'
export default {
  name: 'EditTop',
  data() {
    return {
      form: {
        depName: ''
        // deptManager: '',
        // parDepName: '',
        // deptParentManager: ''
      },
      depdirection: 'rtl',
      loading: false,
      timer: null,
      chooseDepDialogVisible: false,
      leadDialogVisible: false
    }
  },
  props: {
    orgTreeEditDrawer: {
      type: Boolean
    }
  },
  inject: ['reload'],
  components: {
    ChooseDepDialog,
    LeadDialog
  },
  mounted() {},
  watch: {
    orgTreeEditDrawer() {
      this.getDepInfo()
    }
  },
  methods: {
    updateLeadDialog(data) {
      this.leadDialogVisible = data
    },
    updateChooseDepDialog(data) {
      this.chooseDepDialogVisible = data
    },
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
      var data = {
        deptManager: [],
        deptParentManager: [],
        id: this.$store.state.orgDep.depId,
        name: this.form.depName,
        parentId: this.$store.state.orgDep.parentId
      }
      this.axios
        .post('/company/dept/add', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          if (code == 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$emit('changeupdateOrgTreeEditDrawer', false)
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

      this.$emit('changeupdateOrgTreeEditDrawer', false)
    },
    //部门删除
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
                this.$emit('changeupdateOrgTreeEditDrawer', false)
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
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateOrgTreeEditDrawer', false)
      clearTimeout(this.timer)
    }
  }
}
</script>
<style scoped>
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
.addDep-main {
  padding: 98px 30px 87px 30px;
  height: 100%;
  overflow-y: auto;
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
</style>