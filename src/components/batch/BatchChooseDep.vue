<template>
  <el-dialog
    title="选择人员"
    :before-close="updateChooseDepDialog"
    :visible.sync="batchChooseDepVisible"
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
      <el-button @click="updateChooseDepDialog">取 消</el-button>
      <el-button type="primary" @click="saveChooseDepDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'BatchChooseDep',
  props: ['batchChooseDepVisible'],
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
    updateChooseDepDialog() {
      this.$emit('updateBatchChooseDep', false)
    },
    handleChange(value, direction, movedKeys) {
      if (direction == 'right') {
        this.value = value
        console.log(value)
        // // this.staffArrs = value
        // var len = this.data.length
        // this.staffArrs = []
        // for (var i = 0; i < len; i++) {
        //   console.log(value)
        //   if (this.data[i].key == value[0]) {
        //     this.staffArrs.push({
        //       key: this.data[i].key,
        //       label: this.data[i].label
        //     })
        //     console.log(this.staffArrs[0].label)
        //   }
        // }
      }
    },
    saveChooseDepDialog() {
      let ids = this.value
      this.axios
        .post(
          '/company/dept/downloadByDept',
          {
            ids: ids
          },
          { responseType: 'blob' }
        )
        .then(res => {
          console.log(res)
          if (res.data.type === 'application/json') {
            this.$message({
              type: 'error',
              message: '导出失败，文件不存在或权限不足'
            })
          } else {
            let blob = new Blob([res.data])
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, file.fileName)
            } else {
              let link = document.createElement('a')
              let evt = document.createEvent('HTMLEvents')
              evt.initEvent('click', false, false)
              link.href = URL.createObjectURL(blob)
              link.download = 'data.xls'
              link.style.display = 'none'
              document.body.appendChild(link)
              link.click()
              window.URL.revokeObjectURL(link.href)
            }
          }
        })

      this.$emit('updateBatchChooseDep', false)
      console.log(this.staffArrs)
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