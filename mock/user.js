/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:50:01
 * @LastEditTime: 2019-09-04 15:22:55
 * @LastEditors: Please set LastEditors
 */

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  test: {
    token: 'test-token'
  }
}

const userList = [
  { name: 'admin', phone: '13118886666', roler: '超级管理员', createDate: '2019-08-24', address: '测试', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
  { name: 'system', phone: '13118886666', roler: '系统管理员', createDate: '2019-08-24', address: '测试', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' }
]

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'test-token': {
    roles: ['editor'],
    introduction: 'I am an test',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'test'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账户或密码不正确'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },
  // get user list
  {
    url: '/user/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: userList
      }
    }
  },
  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
