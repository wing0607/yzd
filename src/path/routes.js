import Vue from 'vue'
import Router from 'vue-router'
import OrgMain from '../components/organization/OrgMain'
import Batch from '../components/batch/Batch'
import Dep from '../components/dep/Dep'
import DepBatch from '../components/dep/DepBatch'
import Login from '../components/login/Login'

Vue.use(Router)
// export default [
//   { path: "/", component: Login },
//   { path: "/org", component: OrgMain },
//   { path: "/batch", component: Batch },
//   { path: "/dep", component: Dep },
//   { path: "/DepBatch", component: DepBatch }


// ]




const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Login },
    { path: "/org", component: OrgMain },
    { path: "/batch", component: Batch },
    { path: "/dep", component: Dep },
    { path: "/DepBatch", component: DepBatch }



  ]
})
// 添加路由守卫
router.beforeEach((to, from, next) => {

  const isLogin = localStorage.token ? true : false;
  if (to.path == "/") {
    next();
  } else {
    isLogin ? next() : next("/");
  }
})
export default router;




