<template>
  <div class="batch">
    <div class="batch-header">
      <span class="batch-back fl" @click="goBack">返回</span>批量导入/导出/修改成员
    </div>
    <div class="batch-main">
      <el-tabs v-model="activeName" class="batch-main-tabs">
        <el-tab-pane label="批量导入成员" name="first">
          <BatchIn />
        </el-tab-pane>
        <el-tab-pane label="导出/修改成员" name="second">
          <BatchOut />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import BatchIn from './BatchIn'
import BatchOut from './BatchOut'
export default {
  name: 'Batch',
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    BatchIn,
    BatchOut
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
.batch {
  width: 1000px;
  margin: 0 auto;
  background: #fff;
}
.batch-header {
  background: #f2f4f5;
  height: 44px;
  line-height: 44px;
  margin-bottom: 24px;
  position: relative;
  font-size: 14px;
  color: #111f2c;
  text-align: center;
}
.fl {
  float: left;
}
.batch-back {
  width: 58px;
  line-height: 28px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(17, 31, 44, 0.12);
  margin: 7px 0 7px 12px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
}
.batch-main-tabs .el-tabs__nav-wrap::after {
  height: 0;
}
.batch-main-tabs .el-tabs__active-bar {
  height: 0;
}

.batch-main .batch-main-tabs .el-tabs__header {
  width: 320px;
  margin: auto;
  margin-bottom: 25px;
}
.batch-main-tabs .el-tabs__item {
  padding: 0;
  height: 28px;
  box-sizing: border-box;
  line-height: 28px;
  text-align: center;
  width: 160px;
}
.batch-main-tabs .is-active {
  background: #409eff;
  color: #fff;
}
.batch-main-tabs .el-tabs__header {
  margin: 0;
}
.batch-main-tabs #tab-first {
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border: 1px solid #ddd;
  border-right: 0;
}

.batch-main-tabs #tab-first.is-active {
  padding-left: 15px;
}
.batch-main-tabs .el-tabs__item:last-of-type {
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  padding-right: 15px;
  border: 1px solid #ddd;
  border-left: 0;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.batch-main .el-tabs__content {
  width: 1000px;
}
</style>