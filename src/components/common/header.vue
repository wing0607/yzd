<template>
  <div class="wing-header">
    <div class="wing-top-header">
      <div class="wing-top-head clearfix">
        <div class="wing-top-head-left fl"></div>
        <div class="wing-top-head-center fl">
          <ul class="clearfix">
            <li>
              <router-link to="/">通讯录</router-link>
            </li>
            <li>
              <router-link to="/">工作台</router-link>
            </li>
            <li>
              <router-link to="/">增值服务</router-link>
            </li>
            <li>
              <router-link to="/">企业数据</router-link>
            </li>
            <li>
              <router-link to="/">企业主页</router-link>
            </li>
            <li>
              <router-link to="/">设置</router-link>
            </li>
          </ul>
        </div>
        <div class="wing-top-head-right fr">退出</div>
      </div>
    </div>
    <div class="wing-bottom-header">
      <div class="wing-bottom-head">
        <ul class="clearfix">
          <li>
            <router-link to="/">内部通讯录管理</router-link>
          </li>
          <li>
            <router-link to="/dep">部门管理</router-link>
          </li>
          <li>
            <router-link to="/">智能人事</router-link>
          </li>
          <li>
            <router-link to="/">外部联系人</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>