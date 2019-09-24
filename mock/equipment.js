/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 14:28:41
 * @LastEditTime: 2019-09-03 14:59:29
 * @LastEditors: Please set LastEditors
 */
const list = {
  listOne: [
    { id: '1', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' },
    { id: '2', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' },
    { id: '3', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' },
    { id: '4', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' }
  ],
  listTwo: [
    { id: '1', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' },
    { id: '2', number: 'n12121', name: '测试', type: '手机', model: 'JSN-AL00a', date: '2019-07-02' }
  ]
}
export default [
  {
    url: '/equipment/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: list
      }
    }
  }
]
