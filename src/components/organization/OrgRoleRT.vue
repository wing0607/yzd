<template>
  <el-main class="wing-orgR-container" :style="{height:roleHeight+ 'px'}">
    <div class="wing-role-img">
      <img src="../../assets/img/role-img.png" />
    </div>
    <div class="wing-role-btn-container">
      <el-button round size="mini" type="primary">新增角色</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'OrgRoleRT',
  components: {},
  data() {
    return {}
  },
  props: ['roleHeight'],
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
.wing-role-img img {
  width: 100%;
}
.wing-role-btn-container {
  padding: 10px 0;
  text-align: center;
}
</style>
