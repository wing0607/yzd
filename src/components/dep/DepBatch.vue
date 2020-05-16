<template>
  <div class="wing-contain padd20 wing-depBatch">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="wing-depBatch-title">
      <el-breadcrumb-item :to="{ path: '/' }">通讯录</el-breadcrumb-item>
      <el-breadcrumb-item>批量创建部门</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wing-depBatch-tips">
      <p>1. 在这里批量建立和修改部门架构。</p>
      <p>2. 新建部门名称相同时会更新修改原有的部门信息和设置。</p>
      <p>3. 子账号仅能在具有管理权限范围的部门下创建部门。</p>
    </div>
    <div class="wing-depBatch-steps">
      <el-steps direction="vertical">
        <el-step>
          <p slot="title">
            下载组织部门模版，填写部门信息
            <el-button round size="mini" type="primary">下载</el-button>
          </p>
        </el-step>
        <el-step>
          <p slot="title" class="clearfix">
            <span class="fl">上传填写好的部门信息表格</span>
            <el-upload
              class="upload-demo fl wing-upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button round size="mini" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </p>
        </el-step>
      </el-steps>
      <el-row class="wing-text-aligin-center padd20">
        <el-button type="primary" plain size="small">上传</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DepBatch',
  data() {
    return {
      fileList: []
    }
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style>
.wing-depBatch-title {
  padding-bottom: 10px;
  padding-top: 5px;
}
.wing-depBatch-tips {
  font-size: 14px;
  background: rgba(255, 159, 0, 0.08);
  padding: 9px;
  color: #333;
  border: 1px solid rgba(255, 159, 0, 0.56);
  border-radius: 4px;
  font-family: ArialMT;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 20px;
}
.wing-depBatch .el-step__icon {
  width: 40px;
  height: 40px;
  border: 2px solid #999;
  color: #999;
}
.wing-depBatch .el-step__icon-inner {
  font-size: 22px;
}
.wing-depBatch .el-step.is-vertical .el-step__line {
  left: 19px;
}
.wing-depBatch .el-step.is-vertical .el-step__head {
  width: 40px;
}
.wing-depBatch .el-step.is-vertical .el-step__title {
  line-height: 40px;
  color: #333;
}
.wing-depBatch-steps {
  height: 260px;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px 4px 4px 4px;
  display: flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  padding: 0px 16px;
  padding-top: 10px;
}
.wing-upload .el-upload__tip {
  display: inline;
}
.wing-depBatch-steps button {
  margin: 0 5px;
}
</style>