<template>
  <div class="batchIn-main">
    <div class="batchIn-main-left">
      <div class="batchIn-content">
        <h2>1、按部门导出员工信息</h2>
        <p>仅导出未激活员工</p>
        <a class="batchIn-btn">导出</a>
      </div>
    </div>
    <div class="batchIn-main-right">
      <h2>2、上传修改好的员工信息表</h2>
      <p>仅支持xls、xlsx格式文件</p>
      <a class="batchIn-btn">上传文件</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatchOut',
  data() {
    return {}
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
}
.batchIn-main::after {
  content: ' ';
  display: block;
  clear: both;
  visibility: hidden;
}
.batchIn-main h2,
.batchIn-main p {
  font-size: 14px;
  color: #111f2c;
  font-weight: inherit;
}
.batchIn-content a {
  color: #0e77ca;
}
.batchIn-content {
  border-right: 1px dashed #ddd;
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
</style>>


