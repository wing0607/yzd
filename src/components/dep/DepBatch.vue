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
            <el-button round size="mini" type="primary" @click="download">下载</el-button>
          </p>
        </el-step>
        <el-step>
          <p slot="title" class="clearfix">
            <span class="fl">上传填写好的部门信息表格</span>
            <el-upload
              class="upload-demo fl wing-upload"
              ref="upload"
              action
              :accept="acceptFileType"
              :limit="1"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" round size="mini" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传.xls文件</div>
            </el-upload>
          </p>
        </el-step>
      </el-steps>
      <el-row class="wing-text-aligin-center padd20">
        <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading">确定上传</el-button>
        <!-- <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button> -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DepBatch',
  data: function() {
    return {
      uploadTemplateDialog: false,
      fileList: [],
      uploadLoading: false,
      acceptFileType: '.xls',
      downLoadLoading: ''
    }
  },

  methods: {
    download() {
      this.axios({
        method: 'post',
        url: '/company/dept/download',
        responseType: 'blob'
      }).then(res => {
        console.log(res)
        if (res.data.type === 'application/json') {
          this.$message({
            type: 'error',
            message: '下载失败，文件不存在或权限不足'
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
    },
    uploadFile() {
      this.uploadLoading = false
      var that = this
      this.fileList = []
      this.uploadTemplateDialog = true
      setTimeout(function() {
        that.$refs.upload.clearFiles()
      }, 100)
    },
    handleExceed(files, fileList) {
      alert('11')
      this.$message.warning('只能选择1个文件!')
    },
    submitUpload() {
      this.uploadLoading = true
      var that = this
      setTimeout(function() {
        if (that.$refs.upload.$children[0].fileList.length == 1) {
          that.$refs.upload.submit()
        } else {
          that.uploadLoading = false
          that.$message({
            type: 'error',
            showClose: true,
            duration: 3000,
            message: '请选择文件!'
          })
        }
      }, 100)
    },
    handleRemove(file, fileList) {
      //console.log(file,fileList);
    },
    handlePreview(file) {
      //console.log(file);
    },
    beforeUpload(file) {
      var that = this
      //文件类型
      var fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileName != 'xls') {
        that.uploadTemplateDialog = false
        that.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件类型不是.xls文件!'
        })
        return false
      }
      //读取文件大小
      var fileSize = file.size
      console.log(fileSize)
      if (fileSize > 1048576) {
        that.uploadTemplateDialog = false
        that.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件大于1M!'
        })
        return false
      }
      that.downloadLoading = that.$loading({
        lock: true,
        text: '数据导入中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      })
      let fd = new FormData()
      fd.append('file', file)

      this.axios({
        method: 'post',
        url: '/company/dept/upload',
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(rsp => {
          console.log(rsp)
          that.downloadLoading.close()
          that.uploadLoading = false
          let resp = rsp.data
          console.log(resp.results)
          if (resp.code == 0) {
            that.uploadTemplateDialog = false
            that.$message({
              type: 'success',
              message: resp.results
            })
          } else {
            that.uploadTemplateDialog = false
            that.$message({
              type: 'error',
              message: resp.msg
            })
          }
        })
        .catch(error => {
          that.downloadLoading.close()
          that.uploadLoading = false
          that.uploadTemplateDialog = false
          that.$message({
            type: 'error',
            message: '请求失败! error:' + error
          })
        })
      return false
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