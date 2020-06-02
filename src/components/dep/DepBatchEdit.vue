<template>
  <div class="wing-container">
    <el-drawer
      :before-close="roleHandleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="depBatchEditDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
      :wrapperClosable="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">批量编辑部门</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">已选择部门：</div>
          <ul class="wing-depbatch-btns">
            <li
              class="wing-depbatch-btn"
              v-for="item in this.multipleSelection"
              :key="item.id"
            >{{item.name}}</li>
          </ul>
          <div class="wing-drawer-title">角色信息</div>
          <el-form label-width="100px" :rules="rules">
            <el-form-item label="上级部门">
              <!-- <el-input v-model="form.topdep" @click="chooseDepDialogVisible = true"></el-input> -->
              <div class="el-form-item__content">
                <div class="el-input">
                  <div
                    class="el-input__inner"
                    @click="chooseDepDialogVisible = true"
                    id="wing-staff-input-add"
                  ></div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="roleHandleClose">确 定</el-button>
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
import ChooseDepDialog from '../organization/ChooseDepDialog'
export default {
  name: 'DepBatchEdit',
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
      chooseDepDialogVisible: false
    }
  },
  computed: {},
  props: {
    depBatchEditDrawer: {
      type: Boolean
    },
    multipleSelection: {
      type: Array
    }
  },
  mounted() {},
  watch: {},
  components: {
    ChooseDepDialog
  },

  methods: {
    updateChooseDepDialog(data) {
      this.chooseDepDialogVisible = data
    },
    //添加部门表单提交
    roleHandleClose(done) {
      var that = this
      var parentId = this.$store.state.orgDep.depId
      var depts = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        depts.push({
          id: this.multipleSelection[i].id
        })
      }
      if (parentId == '') {
        this.$message.error('请选择上级部门')
        return
      }
      var data = { parentId: parentId, depts: depts }
      this.axios
        .post('/company/dept/listUpdate', data)
        .then(res => {
          var code = res.data.code
          var results = res.data.results
          if (code == 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'danger',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$emit('updateDepBatchEdit', false)
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('updateDepBatchEdit', false)
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
.wing-depbatch-btn {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  padding: 0 14px;
  line-height: 30px;
  display: inline-block;
  margin: 0 12px 10px 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.87);
}
</style>