<template>
  <el-drawer
    :before-close="handleClose"
    custom-class="demo-drawer"
    ref="drawer"
    :with-header="false"
    :visible.sync="roledrawer"
    :direction="roledirection"
  >
    <div class="addDep-container">
      <div class="addDep-header">添加成员</div>
      <div class="addDep-main">
        <el-form label-width="80px" :model="form" :rules="rules">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机:" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="部门:" prop="dep">
            <el-input v-model="form.dep"></el-input>
          </el-form-item>
          <el-form-item label="职位:">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="addDep-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button
          type="primary"
          @click="$refs.drawer.closeDrawer()"
          :loading="loading"
        >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: 'AddDep',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        dep: '',
        job: '',
        email: ''
      },
      roledirection: 'rtl',
      loading: false,
      timer: null,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [{ required: true }],
        dep: [{ required: true }]
      }
    }
  },
  props: {
    roledrawer: {
      type: Boolean
    }
  },
  methods: {
    //添加成员表单提交
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
          this.$emit('changeupdateRoledrawer', false)
        })
        .catch(_ => {})
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