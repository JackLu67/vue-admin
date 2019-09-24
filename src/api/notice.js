/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 19:31:52
 * @LastEditTime: 2019-09-19 16:08:36
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth' // get token from cookie
// 收件
export function getNotice(page, size) {
  const token = getToken()
  return request({
    url: `/noticeInfo/getAllNoticeInfo/${page}/${size}`,
    method: 'get',
    baseURL: 'http://192.168.1.120:9507',
    params: { 'access_token': token, 'username': 'kennysong', 'noticeState': 1 }
  })
}

// 发件
export function getSendNotice(page, size) {
  const token = getToken()
  return request({
    url: `/noticeInfo/getAllNoticeInfo/${page}/${size}`,
    method: 'get',
    baseURL: 'http://192.168.1.120:9507',
    params: { 'access_token': token, 'username': 'kennysong', 'sendStatus': 0 }
  })
}

// 收件
export function getDraftBox(page, size) {
  const token = getToken()
  return request({
    url: `/noticeInfo/getAllNoticeInfo/${page}/${size}`,
    method: 'get',
    baseURL: 'http://192.168.1.120:9507',
    params: { 'access_token': token, 'username': 'kennysong', 'noticeState': 0 }
  })
}

// 发送消息
export function sendNoticeInfo(form) {
  const token = getToken()
  return request({
    url: '/noticeInfo/sendNoticeInfo',
    method: 'POST',
    baseURL: 'http://192.168.1.120:9507',
    params: { 'access_token': token, 'title': form.title, 'receiveIds': form.receiveIds, 'content': form.content, 'sendName': form.sendName }
  })
}
