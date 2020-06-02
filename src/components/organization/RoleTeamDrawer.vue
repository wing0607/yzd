<template>
  <div class="wing-container">
    <el-drawer
      :before-close="roleHandleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="roleTeamDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
      :wrapperClosable="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">新增角色组</div>
        <div class="wing-drawer-main">
          <div class="wing-drawer-title">角色组信息</div>
          <el-form label-width="100px" :rules="rules">
            <el-form-item label="角色组名称:" prop="roleTeamName">
              <el-input v-model=" roleTeamName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="addDep-footer">
          <el-button type="primary" @click="roleHandleClose">确 定</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'RoleTeamDrawer',
  data() {
    return {
      roleTeamName: '',
      depdirection: 'rtl',
      loading: false,
      timer: null,
      rules: {
        //roleTeamName: [{ required: true }]
      }
    }
  },
  computed: {},
  props: {
    roleTeamDrawer: {
      type: Boolean
    }
  },
  mounted() {},
  watch: {},
  components: {},

  methods: {
    //添加部门表单提交
    roleHandleClose(done) {
      var that = this
      if (this.roleTeamName == '') {
        this.$message.error('请输入角色组名称')
        return
      }
      var data = {
        name: this.roleTeamName,
        parentId: -1,
        roleType: 1
      }

      this.axios
        .post('/company/role/addRole', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          var results = res.data.results
          if (code == 0) {
            this.$message({
              type: 'success',
              message: results
            })
          } else {
            that.$message.error(results)
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$emit('changeupdateRoleTeamDrawer', false)
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateRoleTeamDrawer', false)
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