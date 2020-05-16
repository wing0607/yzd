<template>
  <el-main id="el-main" class="wing-orgR-container" :style="{height:orgHeight+ 'px'}">
    <div class="orgRt-title clearfix">
      <span class="orgRt-tit fl">{{orgTreeName}}</span>
      <el-button
        round
        size="mini"
        v-show="orgTreeSet"
        class="fl"
        @click="orgTreeSetDrawer = true"
      >设置</el-button>
      <el-button
        round
        size="mini"
        v-show="orgTreeEdit"
        class="fl"
        @click="orgTreeEditDrawer = true"
      >编辑</el-button>
    </div>
    <div class="wing-gray-title clearfix">
      <el-button @click="depdrawer = true" class="fl" round size="mini">添加子部门</el-button>
    </div>
    <el-table
      :data="tableDepData"
      row-key="id"
      :show-header="hiddenTableHeader"
      class="department-table"
      id="department-table"
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column label="序号" type="index" width="20px"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <div class="wing-gray-title clearfix">
      <el-button @click="roledrawer = true" class="fl" round size="mini" type="primary">添加成员</el-button>
      <router-link
        class="el-button fl el-button--default el-button--mini is-round"
        to="/batch"
      >批量导入/导出/修改</router-link>
      <el-button class="fl" round size="mini">调整部门</el-button>
      <el-button class="fl" round size="mini" type="danger" plain>批量删除</el-button>
    </div>
    <el-table :data="RtableData" row-key="id" class="role-table">
      <el-table-column label="序号" prop="index" width="50px"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <AddDep :depdrawer="depdrawer" @changeupdateDepdrawer="updateDepdrawer" />
    <AddRole :roledrawer="roledrawer" @changeupdateRoledrawer="updateRoledrawer" />
    <AddTopSet
      :orgTreeSetDrawer="orgTreeSetDrawer"
      @changeupdateOrgTreeSetDrawer="updateOrgTreeSetDrawer"
    />
    <EditTop
      :orgTreeSetDrawer="orgTreeSetDrawer"
      @changeupdateOrgTreeSetDrawer="updateOrgTreeSetDrawer"
    />
  </el-main>
</template>

<script>
import Sortable from 'sortablejs'
import AddDep from './AddDep'
import AddRole from './AddRole'
import AddTopSet from './AddTopSet'
import EditTop from './EditTop'

export default {
  name: 'OrgRT',
  components: {
    AddDep,
    AddRole,
    AddTopSet,
    EditTop
  },
  props: ['orgHeight'],
  data() {
    return {
      depdrawer: false,
      roledrawer: false,
      orgTreeSetDrawer: false,
      orgTreeEditDrawer: false,
      hiddenTableHeader: false,
      orgTreeName1: '',
      form: {
        name: '',
        topdep: ''
      },
      tableDepData: [],
      RtableData: [
        {
          index: '1',
          name: '前端 （1人）'
        },
        {
          index: '2',
          name: '后台 （3人）'
        },
        {
          index: '3',
          name: '流程测试 （0人）'
        }
      ]
    }
  },
  computed: {
    orgTreeSet() {
      return this.$store.state.orgTreeSet
    },
    orgTreeName() {
      return this.$store.state.orgTreeName
        ? this.$store.state.orgTreeName
        : this.orgTreeName1
    },
    orgTreeEdit() {
      return this.$store.state.orgTreeEdit
    }
  },
  created() {
    this.orgFunTreeName()
    this.orgFunDep(1)
  },
  mounted() {
    this.rowDrop()
  },
  watch: {
    orgTreeName() {
      var parentId = this.$store.state.orgTreeParentId
      var that = this
      this.axios
        .post('/company/dept/listTree', { parentId: parentId })
        .then(res => {
          var resData = res.data
          if (res.status == 200) {
            that.tableDepData = resData.results
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector('.department-table tbody')
      const that = this
      Sortable.create(tbody, {
        onEnd(evt) {
          that.tableData.splice(
            evt.newIndex,
            0,
            that.tableData.splice(evt.oldIndex, 1)[0]
          )
          let newArray = that.tableData.slice(0)
          for (let i in newArray) {
            newArray[i].index = ++i
          }
          that.tableData = []
          that.$nextTick(function() {
            that.tableData = newArray
          })
        }
      })
    },
    updateDepdrawer(data) {
      this.depdrawer = data
    },
    updateRoledrawer(data) {
      this.roledrawer = data
    },
    updateOrgTreeSetDrawer(data) {
      this.orgTreeSetDrawer = data
    },
    updateOrgTreeEditDrawer(data) {
      this.orgTreeEditDrawer = data
    },
    // 获取公司名称
    orgFunTreeName() {
      var that = this
      this.axios
        .post('/company/dept/listTree', { parentId: -1 })
        .then(res => {
          var resData = res.data
          if (res.status == 200) {
            let result = resData.results
            result.forEach(function(value, index, array) {
              if (array[index].parentId == -1) {
                that.orgTreeName1 = result[index].name
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    orgFunDep(parentId) {
      var that = this
      this.axios
        .post('/company/dept/listTree', { parentId: parentId })
        .then(res => {
          console.log(res)
          var resData = res.data
          if (res.status == 200) {
            that.tableDepData = resData.results
            console.log(that.tableDepData)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.orgRt-title {
  margin-bottom: 20px;
}
.orgRt-tit {
  font-size: 20px;
  line-height: 28px;
  margin-right: 10px;
}

.no-underline {
  text-decoration: none;
}
</style>
