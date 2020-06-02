import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    orgTreeSet: true,//组织架构树顶级设置按钮显示
    // org: {//获取组织架构当前部门
    //   depId: 1,
    //   depname: '',
    // },
    // leadDepManager: [],
    orgDep: {
      depId: '',
      depName: '',
      depManager: '',
      depParentManager: '',
      userCount: '',
      parentId: ''
    },
    orgRole: {
      roleId: '',
      roleName: '',
      parentId: '',
      roleType: ''
    },
    orgTreeEdit: '',
    orgMainH: '',

  },
  getters: {
  },
  mutations: {
    // orgDepName: (state, orgValue) => {
    //   state.org.depname = orgValue
    // },
    // orgDepId: (state, orgValue) => {
    //   state.org.depId = orgValue
    // },
    orgDep: (state, orgValue) => {
      console.log(orgValue)
      state.orgDep = orgValue

    },
    orgRole: (state, orgValue) => {
      console.log(orgValue)
      state.orgRole = orgValue

    },

    orgNodeClick: (state, payload) => {
      console.log(payload.id)
      state.orgDep = {
        depId: payload.id,
        depName: payload.name,
        depManager: payload.deptManager,
        depParentManager: payload.deptParentManager,
        userCount: payload.userCount,
        parentId: payload.parentId
      }
      var parentId = payload.parentId
      if (parentId == -1) {
        state.orgTreeSet = true
        state.orgTreeEdit = false
      } else {
        state.orgTreeSet = false
        state.orgTreeEdit = true
      }
    },
    roleNodeClick: (state, payload) => {
      console.log(payload)
      state.orgRole = {
        roleId: payload.id,
        roleName: payload.name,
        parentId: payload.parentId,
        roleType: payload.roleType
      }
      // var parentId = payload.parentId
      // if (parentId == -1) {
      //   state.orgTreeSet = true
      //   state.orgTreeEdit = false
      // } else {
      //   state.orgTreeSet = false
      //   state.orgTreeEdit = true
      // }
    },
  },
  actions: {
    orgNodeClick: (context, payload) => {
      context.commit("orgNodeClick", payload);
    },
    roleNodeClick: (context, payload) => {
      context.commit("roleNodeClick", payload);
    },
    // orgDepName: (context, payload) => {
    //   context.commit("orgDepName", payload);
    // },
    // orgDepId: (context, payload) => {
    //   context.commit("orgDepId", payload);
    // },
    orgDep: (context, payload) => {
      context.commit("orgDep", payload);
    },
    orgRole: (context, payload) => {
      context.commit("orgRole", payload);
    }
  }
});






