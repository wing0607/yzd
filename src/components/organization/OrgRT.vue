<template>
  <el-main id="el-main">
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
    <el-button @click="depdrawer = true" class="fl">添加子部门</el-button>
    <el-table
      :data="tableData"
      row-key="id"
      :show-header="hiddenTableHeader"
      class="department-table"
      id="department-table"
    >
      <el-table-column label="序号" prop="index" width="20px"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <div class="btn-container">
      <el-button @click="roledrawer = true" class="fl">添加成员</el-button>
      <router-link class="el-button fl el-button--default no-underline" to="/batch">批量导入/导出/修改</router-link>
      <el-button class="fl">调整部门</el-button>
      <el-button class="fl">添加成员</el-button>
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
  data() {
    return {
      depdrawer: false,
      roledrawer: false,
      orgTreeSetDrawer: false,
      orgTreeEditDrawer: false,
      hiddenTableHeader: false,
      form: {
        name: '',
        topdep: ''
      },
      tableData: [
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
      ],
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
    },
    orgTreeEdit() {
      return this.$store.state.orgTreeEdit
    }
  },
  mounted() {
    this.rowDrop()
    // this.orgMainH()
  },
  methods: {
    // orgMainH() {
    //   this.$nextTick(function() {
    //     let height = document.getElementById('el-main').clientHeight
    //     console.log(height)
    //   })
    // },
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

.btn-container {
  padding: 15px 0;
}
.el-main {
  padding: 20px;
}
.no-underline {
  text-decoration: none;
}
</style>
