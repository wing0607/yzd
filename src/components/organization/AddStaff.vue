<template>
  <div>
    <el-drawer
      :before-close="handleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :with-header="false"
      :visible.sync="roledrawer"
      :direction="roledirection"
      :modal="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">添加成员</div>
        <div class="addDep-main">
          <el-form label-width="80px">
            <el-form-item label="姓名:">
              <el-input v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机:">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="部门:">
              <div class="el-form-item__content">
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="chooseDepDialogVisible = true"
                    id="wing-staff-input-add"
                  >{{parDepName}}</div>
                </div>
              </div>
              <!-- <el-input v-model="form.departments"></el-input> -->
            </el-form-item>
            <!-- <el-form-item label="职位:">
              <el-input v-model="form.job"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="邮箱:">
              <el-input v-model="form.email"></el-input>
            </el-form-item>-->
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">确 定</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <ChooseDepDialog
      :chooseDepDialogVisible="chooseDepDialogVisible"
      @changeChooseDepDialog="updateChooseDepDialog"
    />
  </div>
</template>
<script>
import ChooseDepDialog from './ChooseDepDialog'
export default {
  name: 'AddDep',
  data() {
    return {
      form: {
        realname: '',
        phone: '',
        departments: ''
      },
      chooseDepDialogVisible: false,
      roledirection: 'rtl',
      loading: false,
      timer: null
    }
  },
  inject: ['reload'],
  props: {
    roledrawer: {
      type: Boolean
    }
  },
  components: {
    ChooseDepDialog
  },
  computed: {
    parDepName() {
      return this.$store.state.orgDep.depName
    }
  },
  methods: {
    updateChooseDepDialog(data) {
      this.chooseDepDialogVisible = data
    },
    //添加成员表单提交
    handleClose(done) {
      console.log(this.form.realname)
      if (this.form.realname == '') {
        this.$message({
          type: 'danger',
          message: '人员名称不能为空!'
        })
        return
      }
      if (this.form.phone == '') {
        this.$message({
          type: 'danger',
          message: '手机号不能为空!'
        })
        return
      }
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.$message({
          type: 'danger',
          message: '请输入正确的手机号!'
        })
        return
      }
      // if (this.$store.state.orgDep.depId == '') {
      //   this.$message({
      //     type: 'danger',
      //     message: '部门名称不能为空!'
      //   })
      //   return
      // }
      this.axios
        .post('/company/user/add', {
          departments: this.$store.state.orgDep.depId,
          mobile: this.form.phone,
          realname: this.form.realname
        })
        .then(res => {
          console.log(res)
          var resData = res.data
          if (resData.code == 0) {
            // var results = resData.results
            this.$message({
              type: 'success',
              message: '新增部门人员成功!'
            })
            this.reload()
          } else {
            console.log(resData.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
      ;(this.form = {
        realname: '',
        phone: '',
        departments: ''
      }),
        this.$emit('changeupdateRoledrawer', false)
    },
    //取消成员表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateRoledrawer', false)
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