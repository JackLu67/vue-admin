<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 15:32:25
 * @LastEditTime: 2019-08-30 19:17:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="chat-wrpper">
      <el-row style="border: 1px solid #eee;border-radius: 5px;">
        <el-col :span="8">
          <div class="user-wrapper">
            <span class="title">通讯录</span>
            <el-input placeholder="请输入用户名" suffix-icon="el-icon-search" style="display: block; margin: 0 auto;" />
            <ul>
              <li v-for="(item, index) in userList" :key="index" :class="{isActive: index === currentIndex}" @click="handleUserList(index, item.name)">
                <el-badge :value="10">
                  <div>
                    <img :src="item.avatar" alt="" width="40" height="40">
                    <span class="username">{{ item.name }}</span>
                  </div>
                </el-badge>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="header">
            {{ userName }}
          </div>
          <div ref="main" class="main">
            <div v-for="item in datas" :key="item.id" :class="[item.key === 'sender' ? 'isLeft' : 'isRight']">
              <div v-if="item.key === 'sender'">
                <img :src="item.avatar" alt="" height="30" width="30">
                <span class="left-text">{{ item.content }}</span>
              </div>
              <div v-else>
                <span class="right-text">{{ item.content }}</span>
                <img :src="item.avatar" alt="" width="30" height="30">
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="tools">
              <el-tooltip class="item" effect="dark" content="发送图片" placement="top-start">
                <i class="el-icon-picture" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="聊天记录" placement="top-start">
                <i class="el-icon-tickets" />
              </el-tooltip>
            </div>
            <el-input v-model="content" type="textarea" :rows="3" class="send-text" />
            <el-button class="send-btn" @click="handleSubmit">发送</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      currentIndex: 0,
      userName: '',
      src: 'http://b-ssl.duitang.com/uploads/item/201802/21/20180221223815_xkkyq.jpg',
      content: '',
      userList: null,
      datas: [
        { id: 1, content: '你是猪么', sender: 'admin', receiver: 'editor', key: 'sender', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 2, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 3, content: '你是猪么', sender: 'editor', receiver: 'admin', key: 'sender', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 4, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 5, content: '你是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 6, content: '你是猪么', sender: 'admin', receiver: 'editor', key: 'sender', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 7, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 8, content: '你是猪么', sender: 'editor', receiver: 'admin', key: 'sender', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 9, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 10, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 11, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' },
        { id: 12, content: '是猪么', sender: 'editor', receiver: 'admin', key: 'receiver', avatar: 'http://b-ssl.duitang.com/uploads/item/201712/22/20171222223729_d8HCB.jpeg' }
      ]
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {
    this.handelScroll()
  },
  methods: {
    // 滚动条自动滚动
    handelScroll() {
      const m = this.$refs.main
      const h = m.scrollHeight
      m.scrollTop = h
    },
    handleSubmit() {
      const content = this.content
      const a = {
        id: this.datas.length + 1,
        content: content,
        sender: 'admin',
        receiver: 'editor',
        key: 'receiver',
        avatar: 'http://b-ssl.duitang.com/uploads/item/201704/20/20170420191558_YCic5.jpeg'
      }
      this.datas.push(a)
      this.content = ''
    },
    // 获取用户列表
    async getUserList() {
      const data = await getUserList()
      this.userList = data.data
    },
    handleUserList(index, name) {
      this.currentIndex = index
      this.userName = name
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-textarea__inner {
  border: none;
  color: #000 !important;
}
/deep/.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 22px !important;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
.isActive {
  background: #c4c4c4;
}
.isLeft {
  margin-left: 20px;
  clear: both;
}
.isRight {
  float: right;
  margin-right:20px;
  clear: both;
}
.wrapper {
  .chat-wrpper {
    margin: 100px auto;
    width: 60%;
    height: 70vh;
    background: #eee;
    box-sizing: border-box;
    .user-wrapper {
      box-sizing: border-box;
      height: 70vh;
      overflow: hidden;
      overflow-y: auto;
      border-right: 1px solid #fff;
      .title {
        display: inline-block;
        padding: 10px 10px;
      }
      ul {
        list-style: none;
        padding: 0;
        li {
          width: 100%;
          padding: 5px 10px;
          border-bottom: 1px solid #fff;
          cursor: pointer;
          // background: #fff;
          div {
            display: flex;
            .username {
              margin-left: 12px;
            }
          }
        }
      }
    }
    .header {
      width: 66.66667%;
      height: 39px;
      line-height: 39px;
      text-align: left;
      text-indent: 20px;
      font-size: 20px;
      border-bottom: 1px solid #fff;
      position: absolute;
      top: 0;
      background: #eee;
    }
    .main {
      background: #eee;
      width: 66.66667%;
      overflow: auto;
      top: 39px;
      position: absolute;
      z-index: 10;
      bottom: 160px;
      padding-bottom: 40px;
      div {
        margin-top: 20px;
        display: flex;
        box-sizing: border-box;
        .left-text {
          margin-left: 10px;
        }
        .left-text::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 10px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right:10px solid #eee;
        }
        .left-text::after {
          content: '';
          position: absolute;
          left: -8px;
          top: 10px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right:10px solid #fff;
        }
        .right-text {
          margin-right: 10px;
        }
        .right-text::before {
          content: '';
          position: absolute;
          right: -10px;
          top: 10px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid #eee;
        }
        .right-text::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 10px;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid #fff;
        }
        span {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 4px;
          display: inline-block;
          padding: 5px 20px;
          position: relative;
          color: #000;
          font-size: 14px;
          max-width: 300px;
        }
      }
    }
    .footer {
      height: 160px;
      width: 66.66667%;
      position: absolute;
      z-index: 200;
      bottom: 0;
      text-align: left;
      background: #ffffff;
      .tools {
        line-height: 40px;
        font-size: 20px;
        i {
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .send-btn {
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }
}
/*css主要部分的样式*/

/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}
/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #fff;
  border-radius: 3px;
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb{
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #E8E8E8;
}
</style>
