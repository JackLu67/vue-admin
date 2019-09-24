/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 10:26:47
 * @LastEditTime: 2019-09-06 10:42:30
 * @LastEditors: Please set LastEditors
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: '/views/login/index',
    hidden: true
  },

  {
    path: '/404',
    component: '/views/404',
    hidden: true
  },
  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: '/views/dashboard/index',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// 异步加载路由
export const asyncRoutes = [
  {
    path: '/system',
    component: 'layout/Layout',
    redirect: '/system/role',
    name: 'System',
    meta: { title: '系统管理', icon: 'lock', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: '/views/system/role',
        meta: { title: '角色管理', icon: 'lock', roles: ['admin', 'editor'] }
      },
      {
        path: 'user',
        name: 'User',
        component: 'views/system/user',
        meta: { title: '用户管理', icon: 'people', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/dictionary',
    component: 'layout/Layout',
    redirect: '/dictionary/index',
    name: 'Dictionary',
    meta: { title: '数据字典', icon: 'example', roles: ['admin'] }
  },
  {
    path: '/map',
    component: 'layout/Layout',
    redirect: '/map/index',
    name: 'Map',
    meta: { title: '地图浏览', icon: 'eye', roles: ['admin'] },
    children: [
      {
        path: 'map',
        name: 'Map',
        component: '/views/map/index',
        meta: { title: '地图浏览', icon: 'eye', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/notice',
    component: 'layout/Layout',
    redirect: '/notice/index',
    name: 'Notice',
    meta: { title: '通知公告', icon: 'notice', roles: ['admin'] },
    children: [
      {
        path: 'notice',
        name: 'Notice',
        component: '/views/notice/index',
        meta: { title: '通知公告', icon: 'notice', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/equipment',
    component: 'layout/Layout',
    redirect: '/equipment/index',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'equipment', roles: ['admin'] },
    children: [
      {
        path: 'equipment',
        name: 'Equipment',
        component: '/views/equipment/index',
        meta: { title: '设备管理', icon: 'equipment', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/task',
    component: 'layout/Layout',
    redirect: '/task/index',
    name: 'Task',
    meta: { title: '任务管理', icon: 'task', roles: ['admin'] },
    children: [
      {
        path: 'task',
        name: 'Task',
        component: '/views/task/index',
        meta: { title: '任务管理', icon: 'task', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/business',
    component: 'layout/Layout',
    redirect: '/business/index',
    name: 'Business',
    meta: { title: '内业处理', icon: 'business', roles: ['admin'] },
    children: [
      {
        path: 'business',
        name: 'Business',
        component: '/views/business/index',
        meta: { title: '内业处理', icon: 'business', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/chat',
    component: 'layout/Layout',
    redirect: '/chat/index',
    name: 'Chat',
    meta: { title: '站内通讯', icon: 'chat', roles: ['admin'] },
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: '/views/chat/index',
        meta: { title: '站内通讯', icon: 'chat', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
