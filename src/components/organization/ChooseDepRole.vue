<template>
  <el-dialog
    title="选择部门"
    :before-close="updateChooseDepRole"
    :visible.sync="chooseDepRoleVisible"
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
      <el-button @click="updateChooseDepRole">取 消</el-button>
      <el-button type="primary" @click="saveChooseDepRole">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'ChooseDepRole',
  props: ['chooseDepRoleVisible'],
  data() {
    return {
      data: [],
      value: [],
      staffArrs: []
    }
  },
  mounted() {},
  watch: {
    chooseDepRoleVisible() {
      this.orgDepTable(1)
    }
  },
  methods: {
    //获取部门
    orgDepTable(deptId) {
      var that = this
      this.axios
        .post('/company/dept/oneInfo', { deptId: deptId })
        .then(res => {
          var resData = res.data
          if (resData.code == 0) {
            var results = resData.results
            this.data = []
            console.log(resData.results)
            var deptUsers = results.deptUsers
            var subDepts = results.subDepts
            var arr = []
            for (var i = 0; i < deptUsers.length; i++) {
              arr.push({
                key: deptUsers[i].id,
                label: deptUsers[i].realname,
                type: deptUsers[i].type
              })
            }
            for (var i = 0; i < subDepts.length; i++) {
              arr.push({
                key: subDepts[i].id,
                label: subDepts[i].name,
                type: subDepts[i].type
              })
            }
            console.log(arr)
            this.data = arr
            // for (let i = 0; i < results.length; i++) {
            //   this.data.push({
            //     key: results[i].id,
            //     label: results[i].name,
            //     children: results[i].children
            //   })
            // }
          }

          return this.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    leftCheckChoose(e) {
      console.log(e)
      let len = this.data.length
      if (e.length == 0) {
        for (var i = 0; i < len; i++) {
          this.data[i].disabled = false
        }
      } else {
        for (var i = 0; i < len; i++) {
          if (this.data[i].key == e[0]) {
            this.data[i].disabled = false
          } else {
            this.data[i].disabled = true
          }
        }
      }
    },
    rightCheckChoose(e) {
      // console.log(e)
      // let len = this.data.length
      // for (var i = 0; i < len; i++) {
      //   this.data[i].disabled = false
      // }
    },

    renderFunc(h, option) {
      debugger
      console.log(h)
      var that = this
      if (option.type == 'dept') {
        return h('div', { attrs: { class: 'clearfix' } }, [
          h('p', { attrs: { class: 'fl' } }, option.label),
          h(
            'p',
            {
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
      } else if (option.type == 'user') {
        return h('p', option.label)
      }
      // var that = this
      // var isHide = false
      // if (option.children.length == 0) {
      //   isHide = true
      // }
      // return h('div', { attrs: { class: 'clearfix' } }, [
      //   h('p', { attrs: { class: 'fl' } }, option.label),
      //   h(
      //     'p',
      //     {
      //       class: { isHide: isHide },
      //       style: { float: 'right' },
      //       on: {
      //         click: function() {
      //           that.orgDepTable(option.key)
      //         }
      //       }
      //     },
      //     '下级'
      //   )
      // ])
    },
    updateChooseDepRole() {
      this.$emit('updateChooseDepRole', false)
    },
    handleChange(value, direction, movedKeys) {
      console.log(value)
      if (direction == 'right') {
        // this.staffArrs = value
        var len = this.data.length
        this.staffArrs = []
        for (var i = 0; i < len; i++) {
          console.log(this.data[i].key)
          if (this.data[i].key == value[0]) {
            this.staffArrs.push({
              key: this.data[i].key,
              label: this.data[i].label
            })
            console.log(this.staffArrs[0].label)
            var orgDep = {
              depId: this.staffArrs[0].key,
              depName: this.staffArrs[0].label,
              depManager: this.$store.state.orgDep.depManager,
              depParentManager: this.$store.state.orgDep.depParentManager,
              userCount: this.$store.state.orgDep.userCount,
              parentId: this.$store.state.orgDep.parentId
            }
            this.$store.dispatch('orgDep', orgDep)
          }
        }
      } else if (direction == 'left') {
        let len = this.data.length
        for (var i = 0; i < len; i++) {
          this.data[i].disabled = false
        }
      }
    },
    saveChooseDepRole() {
      this.$emit('updateChooseDepRole', false)
      var len = this.staffArrs.length
      var str = ''
      for (let i = 0; i < len; i++) {
        str += `<span>${this.staffArrs[i].label}</span>`
      }
      document.getElementById('wing-staff-input-add').innerHTML = str
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