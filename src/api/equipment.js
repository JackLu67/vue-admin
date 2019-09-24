/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 14:23:46
 * @LastEditTime: 2019-09-23 09:47:38
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth' // get token from cookie

// 获取未审核列表
export function getList(page, size) {
  const token = getToken()
  return request({
    url: `/equipmentInfo/list/${page}/${size}`,
    method: 'get',
    params: { 'access_token': token, 'avalType': 1 },
    baseURL: 'http://192.168.1.116:9503'
    // baseURL: 'http://192.168.1.2:10102'
  })
}

// 获取已审核列表
export function getAList(page, size) {
  const token = getToken()
  return request({
    url: `/equipmentInfo/list/${page}/${size}`,
    method: 'get',
    params: { 'access_token': token, 'avalType': 0 },
    baseURL: 'http://192.168.1.116:9503'
    // baseURL: 'http://192.168.1.2:10102'
  })
}

// 获取数量
export function getApprovalCount() {
  const token = getToken()
  return request({
    url: '/equipmentInfo/pendingApprovalAndAlreadyApprovalCount',
    method: 'get',
    params: { 'access_token': token },
    baseURL: 'http://192.168.1.116:9503'
    // baseURL: 'http://192.168.1.2:10102'
  })
}

export function add(data) {
  return request({
    url: '/equipmentInfo/create',
    method: 'post',
    data
  })
}

export function update(data) {
  const token = getToken()
  return request({
    url: '/equipmentInfo/update',
    method: 'post',
    data,
    baseURL: 'http://192.168.1.116:9503',
    params: { 'access_token': token }
  })
}

export function deleteEquipment(id) {
  return request({
    url: `/equipmentInfo/${id}`,
    method: 'delete'
  })
}
