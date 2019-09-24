/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 14:14:15
 * @LastEditTime: 2019-09-19 17:23:42
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth' // get token from cookie

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}
// 获取左侧权限路由
export function getMenu() {
  const token = getToken()
  return request({
    url: '/permissions/getPermissionsTree',
    method: 'get',
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

// 获取角色信息
export function getAllPermissionsTree() {
  const token = getToken()
  return request({
    url: '/permissions/getAllPermissionsTree',
    method: 'get',
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

// 获取角色
export function getRoles() {
  const token = getToken()
  return request({
    url: '/role/getRoles/1/10',
    method: 'get',
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

// 新增角色
export function addRole(data) {
  const token = getToken()
  return request({
    url: '/rolePermissions/saveRolePermissions',
    method: 'post',
    data,
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

// 根据ID查询角色信息
export function getPermissionsForRoleId(id) {
  const token = getToken()
  return request({
    url: `/rolePermissions/getRolePermissions/${id}`,
    method: 'get',
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

// 编辑角色
export function updateRole(data) {
  const token = getToken()
  return request({
    url: '/rolePermissions/updateRolePermissions',
    method: 'POST',
    data,
    // baseURL: 'http://192.168.1.2:10102',
    baseURL: 'http://192.168.1.116:10102',
    params: { 'access_token': token }
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

// 未关联列表
export function getExcludeUserListByRoleId(id) {
  const token = getToken()
  return request({
    url: `/personalInfo/getExcludeUserListByRoleId/${id}`,
    method: 'get',
    // baseURL: 'http://192.168.1.2:9502',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token }
  })
}

// 已关联列表
export function getUserListByRoleId(id) {
  const token = getToken()
  return request({
    url: `/personalInfo/getUserListByRoleId/${id}`,
    method: 'get',
    // baseURL: 'http://192.168.1.2:9502',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token }
  })
}

// 取消关联
export function unbundlingUserFromRole(data) {
  const token = getToken()
  return request({
    url: '/personalInfo/unbundlingUserFromRole',
    method: 'post',
    // baseURL: 'http://192.168.1.2:9502',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token, 'roleId': data.roleId, 'userIds': data.userIds }
  })
}

// 关联
export function bindingUserToRole(data) {
  const token = getToken()
  return request({
    url: '/personalInfo/bindingUserToRole',
    method: 'post',
    // baseURL: 'http://192.168.1.2:9502',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token, 'roleId': data.roleId, 'userIds': data.userIds }
  })
}
