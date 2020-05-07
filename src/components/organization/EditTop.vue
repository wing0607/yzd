<template>
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
      <div class="addDep-main">
        <el-form label-width="80px">
          <el-form-item label="部门名称:">
            <el-input v-model="form.depname"></el-input>
          </el-form-item>
          <el-form-item label="设置主管:">
            <el-input v-model="form.topdep"></el-input>
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
  name: 'AddTopSet',
  data() {
    return {
      form: {
        name: '',
        topdep: ''
      },
      depdirection: 'rtl',
      loading: false,
      timer: null
    }
  },
  props: {
    orgTreeSetDrawer: {
      type: Boolean
    }
  },

  methods: {
    //添加部门表单提交
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
          this.$emit('changeupdateOrgTreeSetDrawer', false)
        })
        .catch(_ => {})
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateOrgTreeSetDrawer', false)
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