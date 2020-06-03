<template>
  <div class="wing-container">
    <el-drawer
      :before-close="roleHandleClose"
      custom-class="demo-drawer"
      ref="drawer"
      :visible.sync="roleDrawer"
      :direction="depdirection"
      :with-header="false"
      :modal="false"
      :wrapperClosable="false"
    >
      <div class="addDep-container">
        <div class="addDep-header">新增角色</div>
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
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'RoleDrawer',
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
      roleName: ''
    }
  },
  computed: {},
  props: {
    roleDrawer: {
      type: Boolean
    }
  },
  mounted() {
    this.getRoleTeam()
  },
  watch: {},
  components: {},

  methods: {
    getRoleTeam() {
      var data = { roleType: 1 }
      this.axios
        .post('/company/role/getRoleGroupList', data)
        .then(res => {
          console.log(res)
          var code = res.data.code
          var results = res.data.results
          if (code == 0) {
            for (var i = 0; i < results.length; i++) {
              this.options.push({
                value: results[i].id,
                label: results[i].name
              })
            }
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
        roleType: 2
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
            console.log(res.data.msg)
            //that.$message.error(results)
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$emit('changeupdateRoleDrawer', false)
    },
    //取消部门表单提交
    cancelForm() {
      this.loading = false
      this.$emit('changeupdateRoleDrawer', false)
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