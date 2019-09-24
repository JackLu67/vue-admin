/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:50:01
 * @LastEditTime: 2019-09-20 14:52:36
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth' // get token from cookie

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList() {
  const token = getToken()
  return request({
    url: '/personalInfo/getUserList',
    method: 'get',
    // baseURL: 'http://192.168.1.2:9502',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token }
  })
}

// 用户信息
export function getInfo(access_token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { access_token }
  })
}

// 修改头像
export function upload(data) {
  const token = getToken()
  return request({
    url: 'http://192.168.1.2:9504/localUpload/upload',
    method: 'post',
    data,
    params: { 'access_token': token }
  })
}

// 新增用户
export function updateUser(data) {
  const token = getToken()
  return request({
    url: '/personalInfo/update',
    method: 'post',
    data,
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token }
  })
}

// 搜索
export function searchUserInfo(username) {
  const token = getToken()
  return request({
    url: '/personalInfo/getUserList',
    method: 'GET',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token, username: username }
  })
}

// 删除
export function deleteUser(id) {
  const token = getToken()
  return request({
    url: `/personalInfo/deletePersonalInfo/${id}`,
    method: 'post',
    baseURL: 'http://192.168.1.116:9502',
    params: { 'access_token': token }
  })
}
// 登出
export function logout(access_token) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: { access_token }
  })
}
