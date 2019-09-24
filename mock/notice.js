/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 19:33:20
 * @LastEditTime: 2019-08-26 19:58:38
 * @LastEditors: Please set LastEditors
 */

const notices = {
  inbox: [
    { name: '测试1', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试50', title: 'hello', date: '2019-8-26' }
  ],
  outbox: [
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试50', title: 'hello', date: '2019-8-26' }
  ],
  drafts: [
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试', title: 'hello', date: '2019-8-26' },
    { name: '测试50', title: 'hello', date: '2019-8-26' }
  ],
  inboxTotal: 44,
  outboxTotal: 6,
  draftsTotal: 6
}

export default [
  // mock get all notice
  {
    url: '/notice',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: notices
      }
    }
  }
]
