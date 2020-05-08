import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    orgTreeSet: true,//组织架构树顶级设置
    orgTreeName: '',
    orgTreeEdit: '',
    orgMainH: '',
    roledatas: [{
      id: 1,
      label: '一级 2221',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],

  },
  getters: {
    orgMainH: (state) => {
      // let height1 = document.getElementById('el-main').clientHeight;
      // console.log(height1)
      // let height2 = document.getElementById('info-box').clientHeight
      // state.orgMainH = height1 > height2 ? height1 : height2;
    }
  },
  mutations: {
    nodeClick: (state, payload) => {
      console.log(state, payload)
      state.orgTreeName = payload.label
      var treeNodeId = payload.$treeNodeId
      if (treeNodeId == 1) {
        state.orgTreeSet = true
        state.orgTreeEdit = false
      } else {
        state.orgTreeSet = false
        state.orgTreeEdit = true
      }
    },
  },
  actions: {
    nodeClick: (context, payload) => {
      context.commit("nodeClick", payload);
    }

  }
});






