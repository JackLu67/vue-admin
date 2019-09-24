/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:50:01
 * @LastEditTime: 2019-09-07 12:51:35
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    id: '1',
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    id: '2',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

// 异步加载路由
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    name: 'System',
    meta: { title: '系统管理', icon: 'system', roles: [] },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'peoples', roles: [] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'people', roles: [] }
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/dictionary/index',
    name: 'Dictionary',
    meta: { title: '数据字典', icon: 'dictionary', roles: ['user'] },
    children: [
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/dictionary/index'),
        meta: { title: '数据字典', icon: 'dictionary', roles: ['user'] }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    redirect: '/map/index',
    name: 'map',
    meta: { title: '地图浏览', icon: 'map', roles: ['user'] },
    children: [
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/map/index'),
        meta: { title: '地图浏览', icon: 'map', roles: [] }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'Notice',
    meta: { title: '通知公告', icon: 'notice', roles: [] },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '通知公告', icon: 'notice', roles: [] }
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/index',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'equipment', roles: [] },
    children: [
      {
        path: 'equipment',
        name: 'Equipment',
        component: () => import('@/views/equipment/index'),
        meta: { title: '设备管理', icon: 'equipment', roles: [] }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/index',
    name: 'Task',
    meta: { title: '任务管理', icon: 'task', roles: [] },
    children: [
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/task/index'),
        meta: { title: '任务管理', icon: 'task', roles: [] }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/index',
    name: 'Business',
    meta: { title: '内业处理', icon: 'business', roles: [] },
    children: [
      {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/business/index'),
        meta: { title: '内业处理', icon: 'business', roles: [] }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat/index',
    name: '',
    meta: { title: '站内通讯', icon: 'chat', roles: [] },
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/views/chat/index'),
        meta: { title: '站内通讯', icon: 'chat', roles: [] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
