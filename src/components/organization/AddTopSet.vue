<template>
  <div class="wing-container">
    <el-drawer
      :before-close="handleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="orgTreeSetDrawer"
      :direction="depdirection"
      :with-header="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">编辑部门</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">部门信息</div>
          <el-form label-width="100px" :model="form" :rules="rules">
            <el-form-item label="部门名称:" prop="depname">
              <el-input v-model="form.depname" disabled></el-input>
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
          <!-- <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>-->
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
        topdep: ''
      },
      leadDialogVisible: false,
      depdirection: 'rtl',
      loading: false,
      timer: null,
      rules: {
        depname: [{ required: true }]
      }
    }
  },
  props: {
    orgTreeSetDrawer: {
      type: Boolean
    }
  },
  components: {
    LeadDialog
  },

  methods: {
    //添加部门表单提交
    handleClose(done) {
      // var that = this
      // if (this.loading) {
      //   return
      // }
      // this.$confirm('确定要提交表单吗？')
      //   .then(_ => {
      //     this.loading = true
      //     this.timer = setTimeout(() => {
      //       done()
      //       // 动画关闭需要一定的时间
      //       setTimeout(() => {
      //         that.loading = false
      //         that.$emit('changeupdateOrgTreeSetDrawer', false)
      //         document.getElementById('wing-staff-input').innerHTML = ''
      //       }, 400)
      //     }, 2000)
      //   })
      //   .catch(_ => {})
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('changeupdateOrgTreeSetDrawer', false)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      // let parentId = this.$store.state.orgTreeParentId
      //   ? this.$store.state.orgTreeParentId
      //   : 0
      // alert(parentId)
      // this.axios
      //   .post('/dept/delete', { id: parentId })
      //   .then(res => {
      //     console.log(res)
      //     var resData = res.data
      //     if (resData.success == true) {
      //       console.log(resData.result)
      //       //this.orgdatas = resData.result
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
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