<template>
  <el-container>
    <OrgLeft />
    <OrgRT />
  </el-container>
</template>
<script>
import OrgLeft from './OrgLeft'
import OrgRT from './OrgRT'
export default {
  name: 'OrgMain',
  components: {
    OrgLeft,
    OrgRT
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
