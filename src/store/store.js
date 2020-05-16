import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    orgTreeSet: true,//组织架构树顶级设置按钮显示
    orgTreeParentId: '',//获取组织架构parentId
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
  },
  mutations: {
    nodeClick: (state, payload) => {
      console.log(state, payload)
      state.orgTreeParentId = payload.id
      state.orgTreeName = payload.name
      var parentId = payload.parentId
      if (parentId == 0) {
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
      console.log(context, payload)
      context.commit("nodeClick", payload);
    }

  }
});






