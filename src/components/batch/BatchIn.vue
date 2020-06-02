<template>
  <div class="batchIn-main">
    <div class="batchIn-main-left">
      <div class="batchIn-content">
        <h2>1、下载通讯录模版，填写成员信息</h2>
        <p class="iconfont icon-p">&#xe643;</p>
        <p>
          如需修改成员信息类别，请点击
          <a>修改</a>
        </p>

        <a class="batchIn-btn" @click="download">下载模版</a>
      </div>
    </div>
    <div class="batchIn-main-right">
      <h2>2、上传填好的文件</h2>
      <p class="iconfont icon-p">&#xe644;</p>
      <p>仅支持xls、xlsx格式文件</p>
      <!-- <a class="batchIn-btn">上传文件</a> -->

      <p slot="title" class="clearfix">
        <el-upload
          class="upload-demo wing-upload"
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
          <el-button slot="trigger" round size="mini">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.xls文件</div>
        </el-upload>
      </p>

      <el-row class="wing-text-aligin-center padd20">
        <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading">确定上传</el-button>
        <!-- <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button> -->
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatchIn',
  data() {
    return {
      //uploadTemplateDialog: false,
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
        url: '/company/user/downloadTmp',
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
        url: '/company/user/importAdd',
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
.batchIn-main {
  margin: 0 auto;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 25px;
  box-shadow: 0px 1px 2px rgba(17, 31, 44, 0.12);
  font-size: 14px;
}

.batchIn-main-left {
  float: left;
  width: 50%;
}

.batchIn-main-right {
  float: left;
  width: 50%;
  text-align: center;
}
.batchIn-main::after {
  content: ' ';
  display: block;
  clear: both;
  visibility: hidden;
}
.batchIn-content > h2,
.batchIn-content > p,
.batchIn-main-right h2,
.batchIn-main-right p {
  font-size: 14px;
  color: #111f2c;
  font-weight: inherit;
  margin: 15px auto;
}
.batchIn-content a {
  color: #0e77ca;
}
.batchIn-content {
  border-right: 1px dashed #ddd;
  text-align: center;
}
.batchIn-main .batchIn-btn {
  line-height: 28px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(17, 31, 44, 0.12);
  margin: 7px 0 7px 12px;
  padding: 5px 10px;
  color: #414141;
}
.batchIn-btn:hover {
  border: 1px solid #a4a8b1;
  background: #fff;
  color: #767676;
}
.batchIn-main p.icon-p {
  font-size: 50px;
  color: #ccc;
}
</style>>


