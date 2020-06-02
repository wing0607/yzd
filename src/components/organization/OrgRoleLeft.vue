<template>
  <el-aside width="260px" id="info-box">
    <div class="wing-roleLeft-btn">
      <el-button round size="mini" @click="roleTeamDrawer = true">新增角色组</el-button>
      <el-button round size="mini" @click="roleDrawer = true">新增角色</el-button>
    </div>
    <el-tree
      class="filter-tree"
      :data="roledatas"
      :filter-node-method="filterNode1"
      default-expand-all
      :props="defaultProps"
      node-key="id"
      ref="roleTree"
      highlight-current
      :expand-on-click-node="false"
      @node-click="roleNodeClick"
    ></el-tree>
    <RoleTeamDrawer
      :roleTeamDrawer="roleTeamDrawer"
      @changeupdateRoleTeamDrawer="updateRoleTeamDrawer"
    />
    <RoleDrawer :roleDrawer="roleDrawer" @changeupdateRoleDrawer="updateRoleDrawer" />
  </el-aside>
</template>

<script>
import { mapActions } from 'vuex'
import RoleTeamDrawer from './RoleTeamDrawer'
import RoleDrawer from './RoleDrawer'
export default {
  name: 'OrgRoleLeft',
  props: ['roleHeight'],
  components: {
    RoleTeamDrawer,
    RoleDrawer
  },
  data() {
    return {
      roleTeamDrawer: false,
      roleDrawer: false,
      roledatas: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    // roledatas() {
    //   return this.$store.state.roledatas
    // }
  },
  mounted() {
    this.getRoleTree()
  },
  methods: {
    //获取角色树
    getRoleTree() {
      this.axios
        .post('/company/role/getTreeList', { parentId: -1 })
        .then(res => {
          var resData = res.data
          if (resData.code == 0) {
            var results = resData.results
            this.roledatas = results
            console.log(results)
            // var orgRole = {
            //   roleId: results[0].id,
            //   roleName: results[0].name,
            //   parentId: results[0].parentId,
            //   roleType: results[0].roleType
            // }
            // this.$store.dispatch('orgRole', orgRole)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    filterNode1(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    updateRoleTeamDrawer(data) {
      this.roleTeamDrawer = data
    },
    updateRoleDrawer(data) {
      this.roleDrawer = data
    },
    ...mapActions(['roleNodeClick'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-container .el-tree {
  background: #f4f6f8;
}
.wing-roleLeft-btn {
  padding: 5px 20px;
  text-align: center;
}
</style>
