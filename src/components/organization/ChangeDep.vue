<template>
  <el-dialog
    title="调整部门"
    :before-close="updateChangeDep"
    :visible.sync="changeDepVisible"
    width="650px"
    center
    class="wing-dialog"
  >
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value"
      filterable
      :render-content="renderFunc"
      :titles="['全选', '全选']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      @left-check-change="leftCheckChoose"
      @right-check-change="rightCheckChoose"
      :data="data"
      class="wing-transfer"
    ></el-transfer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateChangeDep">取 消</el-button>
      <el-button type="primary" @click="saveChangeDep">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'ChangeDep',
  props: ['changeDepVisible', 'multipleSelection'],
  inject: ['reload'],
  data() {
    return {
      data: [],
      value: [],
      staffArrs: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.orgDepTable(-1)
    }, 1000)
  },
  methods: {
    //获取部门
    orgDepTable(parentId) {
      console.log(parentId)
      var that = this
      this.axios
        .post('/company/dept/listTree', { parentId: parentId })
        .then(res => {
          var resData = res.data
          if (resData.code == 0) {
            var results = resData.results
            this.data = []
            console.log(resData.results)
            for (let i = 0; i < results.length; i++) {
              this.data.push({
                key: results[i].id,
                label: results[i].name,
                children: results[i].children
              })
            }
          }
          return this.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    leftCheckChoose(e) {},
    rightCheckChoose(e) {},

    renderFunc(h, option) {
      console.log(option)
      var that = this
      var isHide = false
      if (option.children.length == 0) {
        isHide = true
      }
      return h('div', { attrs: { class: 'clearfix' } }, [
        h('p', { attrs: { class: 'fl' } }, option.label),
        h(
          'p',
          {
            class: { isHide: isHide },
            style: { float: 'right' },
            on: {
              click: function() {
                that.orgDepTable(option.key)
              }
            }
          },
          '下级'
        )
      ])
    },
    updateChangeDep() {
      this.$emit('updateChangeDep', false)
    },
    handleChange(value, direction, movedKeys) {
      console.log(value)
      if (direction == 'right') {
        // this.staffArrs = value
        var len = this.data.length
        this.staffArrs = []
        for (var i = 0; i < len; i++) {
          console.log(this.data[i].key)

          this.staffArrs.push({
            key: this.data[i].key,
            label: this.data[i].label
          })

          // var orgDep = {
          //   depId: this.staffArrs[0].key,
          //   depName: this.staffArrs[0].label,
          //   depManager: this.$store.state.orgDep.depManager,
          //   depParentManager: this.$store.state.orgDep.depParentManager,
          //   userCount: this.$store.state.orgDep.userCount,
          //   parentId: this.$store.state.orgDep.parentId
          // }
          // this.$store.dispatch('orgDep', orgDep)
        }
      } else if (direction == 'left') {
        let len = this.data.length
        for (var i = 0; i < len; i++) {
          this.data[i].disabled = false
        }
      }
    },
    saveChangeDep() {
      this.$emit('updateChangeDep', false)
      var userIds = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        userIds.push(this.multipleSelection[i].id)
      }
      var data = {
        deptId: this.$store.state.orgDep.depId,
        newDeptIds: this.value,
        userIds: userIds
      }
      console.log(data)
      this.axios
        .post('/company/user/changeDept', data)
        .then(res => {
          console.log(res)
          var resData = res.data
          if (resData.code == 0) {
            this.$message({
              type: 'success',
              message: '调整部门成功!'
            })
            this.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })

      // var len = this.staffArrs.length
      // var str = ''
      // for (let i = 0; i < len; i++) {
      //   str += `<span>${this.staffArrs[i].label}</span>`
      // }
      // document.getElementById('wing-staff-input-add').innerHTML = str
    }
  }
}
</script>
<style>
.wing-dialog .el-dialog__header {
  background: #eceff4;
}
.isHide {
  display: none;
}
</style>