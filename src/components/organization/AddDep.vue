<template>
  <div class="wing-container">
    <el-drawer
      :before-close="handleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="depdrawer"
      :direction="depdirection"
      :with-header="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">添加部门</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">部门信息</div>
          <el-form label-width="100px" :model="form" :rules="rules">
            <el-form-item label="部门名称:" prop="depname">
              <el-input v-model="form.depname"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
              <!-- <el-input v-model="form.topdep" @click="chooseDepDialogVisible = true"></el-input> -->
              <div class="el-form-item__content">
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="chooseDepDialogVisible = true"
                    id="wing-staff-input"
                  ></div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="$refs.drawer.closeDrawer()">保存</el-button>
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
        name: '',
        topdep: ''
      },
      depdirection: 'rtl',
      loading: false,
      timer: null,
      chooseDepDialogVisible: false,
      rules: {
        depname: [
          { required: true, message: '请输入部门名称', trigger: 'change' }
        ]
        // topdep: [{ required: true, message: '请选择上级部门' }]
      }
    }
  },
  props: {
    depdrawer: {
      type: Boolean
    }
  },
  components: {
    ChooseDepDialog
  },

  methods: {
    updateChooseDepDialog(data) {
      this.chooseDepDialogVisible = data
    },
    //添加部门表单提交
    handleClose(done) {
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
      //         this.loading = false
      //       }, 400)
      //     }, 2000)
      //     this.$emit('changeupdateDepdrawer', false)
      //   })
      //   .catch(_ => {})
      this.$emit('changeupdateDepdrawer', false)
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateDepdrawer', false)
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