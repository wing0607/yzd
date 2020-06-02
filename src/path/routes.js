import OrgMain from '../components/organization/OrgMain'
import Batch from '../components/batch/Batch'
import Dep from '../components/dep/Dep'
import DepBatch from '../components/dep/DepBatch'
import Login from '../components/login/Login'
export default [
  { path: "/", component: Login },
  { path: "/org", component: OrgMain },
  { path: "/batch", component: Batch },
  { path: "/dep", component: Dep },
  { path: "/DepBatch", component: DepBatch }


]