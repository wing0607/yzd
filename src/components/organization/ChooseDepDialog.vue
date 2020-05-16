<template>
  <el-dialog
    title="选择人员"
    :before-close="updateChooseDepDialog"
    :visible.sync="chooseDepDialogVisible"
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
      :data="data"
      class="wing-transfer"
    ></el-transfer>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateChooseDepDialog">取 消</el-button>
      <el-button type="primary" @click="saveChooseDepDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'ChooseDepDialog',
  props: ['chooseDepDialogVisible'],
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: `备选项${i}`
          // label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [],
      staffArrs: [],
      renderFunc(h, option) {
        return <span>{option.key}</span>
      }
    }
  },

  methods: {
    updateChooseDepDialog() {
      this.$emit('changeChooseDepDialog', false)
    },
    handleChange(value, direction, movedKeys) {
      if (direction == 'right') {
        this.staffArrs = value
      }
    },
    saveChooseDepDialog() {
      this.$emit('changeChooseDepDialog', false)
      var len = this.staffArrs.length
      var str = ''
      for (let i = 0; i < len; i++) {
        str += `<span>${this.staffArrs[i]}</span>`
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