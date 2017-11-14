import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

//系统管理

import Dict from '@/components/system/dict'
import Menu from '@/components/system/menu'
import Super from '@/components/system/super'
import map from '@/components/map/mapTree'

//用户管理
import Role from '@/components/user/role'
import Depart from '@/components/user/depart'
import Company from '@/components/user/company'
import Area from '@/components/user/area'
import CorAdd from '@/components/cor/add'
import Staff from '@/components/user/staff'
import StaffAdd from '@/components/staff/add'
import StaffEdit from '@/components/staff/edit'
import DeptAdd from '@/components/dept/add'




//日志查看
import Equiplog from '@/components/log/equiplog'
import Syslog from '@/components/log/syslog'


//钥匙管理
import KeyList from '@/components/key/keyList'

//锁具管理
import Line from '@/components/lock/line'
import LockList from '@/components/lock/lockList'

//任务管理
import TaskList from '@/components/task/taskList'



// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)


let router = new Router({
// mode: 'history',

  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },

    //系统管理
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        {path: '/map', component: map,  menuShow: true},
        {path: '/system/dict', component: Dict,  menuShow: true},
        {path: '/system/menu',component: Menu,  menuShow: true},
        {path: '/system/super', component: Super,  menuShow: true}
      ]
    },


    //用户管理
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        {path: '/user/role', component: Role,  menuShow: true},
        {path: '/user/depart',component: Depart,  menuShow: true},
        {path: '/user/company', component: Company,  menuShow: true},
        {path: '/user/area', component: Area,  menuShow: true},
        {path: '/cor/add', component: CorAdd,  menuShow: false},
        {path: '/user/staff', component: Staff,  menuShow: true},
        {path: '/staff/add', component: StaffAdd,  menuShow: false},
        {path: '/staff/edit', component: StaffEdit,  menuShow: false},
        {path: '/dept/add', component: DeptAdd,  menuShow: false}
      ]
    },

    //日志查看
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        {path: '/log/equiplog',component: Equiplog,  menuShow: true},
        {path: '/log/syslog', component: Syslog,  menuShow: true}
      ]
    },
    //钥匙管理
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        {path: '/key/keyList', component: KeyList,  menuShow: true}
      ]
    },
    //锁具管理
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        {path: '/lock/line', component: Line,  menuShow: true},
        {path: '/lock/lockList', component: LockList,  menuShow: true}
      ]
    },
    //任务管理
    {
      path: '/',
      component: Home,
      menuShow: true,
      redirect:'/map',
      children: [
        { path: '/task/taskList',component: TaskList,  menuShow: true}
      ]
    }




  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router


