/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 14:01:01
 * @LastEditTime: 2019-09-09 14:01:50
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth' // get token from cookie

export function addMenu(data) {
  const token = getToken()
  return request({
    url: '/permissions/savePermissions',
    method: 'POST',
    data,
    baseURL: 'http://192.168.1.2:10102',
    params: { 'access_token': token }
  })
}
