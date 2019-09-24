/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:50:01
 * @LastEditTime: 2019-09-11 09:31:04
 * @LastEditors: Please set LastEditors
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getMenu } from '@/api/role'
/* Layout */
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过getinfo获取了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          var asyncRoutes
          // get user info
          // 提示: 角色必须是对象数组！ such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // getMenu(hasToken).then(res => {
          //   asyncRoutes = mergeRoutes(res.data)
          // })
          const res = await getMenu(hasToken)
          localStorage.setItem('asyncRoutes', JSON.stringify(res.data))
          const page404 = { path: '*', redirect: '/404', hidden: true }
          asyncRoutes = mergeRoutes(res.data)
          asyncRoutes.push(page404)
          // 基于角色生成可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, asyncRoutes })
          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // 确保addroutes完整的hack方法
          // 设置replace:true，这样导航就不会留下历史记录。
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

function mergeRoutes(menus) {
  menus.forEach(menu => {
    if (menu.children && menu.children.length >= 1) {
      const children = menu.children
      menu.component = Layout
      children.forEach(child => {
        // const component = () => import('@/views' + child.component)
        // const component = resolve => require([`@/${child.component}.vue`], resolve)
        const component = child.component
        child.component = () => import(`@/views${component}`)
      })
    }
  })
  return menus
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
