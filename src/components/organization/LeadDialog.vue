<template>
  <el-dialog
    title="选择人员"
    :before-close="updateLeadDialog"
    :visible.sync="leadDialogVisible"
    width="650px"
    center
    class="wing-dialog"
  >
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value"
      :data="data"
      class="wing-transfer"
      @change="handleChange"
    ></el-transfer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateLeadDialog">取 消</el-button>
      <el-button type="primary" @click="saveLeadDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'LeadDialog',
  props: ['leadDialogVisible'],
  data() {
    var depManager = this.$store.state.orgDep.depManager
    var rData = []
    for (var i = 0; i < depManager.length; i++) {
      rData.push(depManager[i])
    }
    return {
      data: [],
      value: rData,
      staffArrs: []
    }
  },
  computed: {},
  mounted() {},
  watch: {
    leadDialogVisible() {
      this.generateData()
    }
  },

  created() {},
  methods: {
    generateData() {
      const that = this
      var depId = this.$store.state.orgDep.depId
      that.data = []
      console.log(depId)
      this.axios
        .post('/company/user/list', { deptId: depId })
        .then(res => {
          console.log(res)
          var resData = res.data
          if (resData.code == 0) {
            var results = resData.results
            for (let i = 0; i < results.length; i++) {
              that.data.push({
                key: results[i].id,
                label: results[i].realname
              })
            }
          }
        })
        .catch(err => {
          //console.log(err)
        })
    },
    updateLeadDialog() {
      this.$emit('changeLeadDialog', false)
    },
    handleChange(value, direction, movedKeys) {
      var arr = [],
        depManagerArr = []
      //  console.log(movedKeys)
      if (direction == 'right') {
        console.log(this.data)
        var len = this.data.length
        for (var j = 0; j < value.length; j++) {
          for (var i = 0; i < len; i++) {
            console.log(this.data[i].key)
            if (this.data[i].key == value[j]) {
              arr.push({
                key: this.data[i].key,
                label: this.data[i].label
              })
              depManagerArr.push({
                id: this.data[i].key,
                name: this.data[i].label
              })
            }
          }
        }
        console.log(arr)
        var orgDep = {
          depId: this.$store.state.orgDep.depId,
          depName: this.$store.state.orgDep.depName,
          depManager: depManagerArr,
          depParentManager: this.$store.state.orgDep.depParentManager,
          userCount: this.$store.state.orgDep.userCount,
          parentId: this.$store.state.orgDep.parentId
        }
        this.$store.dispatch('orgDep', orgDep)
      }
    },
    saveLeadDialog() {
      var depManager = this.$store.state.orgDep.depManager
      console.log(depManager)
      this.$emit('changeLeadDialog', false)
      var len = depManager.length
      var str = ''
      for (let i = 0; i < len; i++) {
        str += `<span>${depManager[i].name}</span>`
      }
      document.getElementById('wing-staff-input').innerHTML = str
    }
  }
}
</script>
<style>
.wing-dialog .el-dialog__header {
  background: #eceff4;
}
</style>