<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 15:32:25
 * @LastEditTime: 2019-08-27 19:17:47
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
              <li v-for="o in 12" :key="o">
                <el-badge :value="10">
                  <div>
                    <img :src="src" alt="" width="40" height="40">
                    <span class="username">用户名</span>
                  </div>
                </el-badge>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="header">
            用户名
          </div>
          <div class="main">
            <div :class="{isLeft: isLeft}">
              <img :src="src" alt="" width="30" height="30">
              <span class="left-text">测试小寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻测试小寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻测试小寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻测试小寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻测试小寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻</span>
            </div>
            <div :class="{isRight: isRight}">
              <span class="right-text">1</span>
              <img :src="src" alt="" width="30" height="30">
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
            <el-input v-model="text" type="textarea" :rows="3" class="send-text" />
            <el-button class="send-btn">发送</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      text: '',
      isLeft: true,
      isRight: true
    }
  }
}
</script>
<style>
/* 重写elementui */
.el-textarea__inner {
  border: none !important;
  color: #000 !important;
}
.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 22px !important;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
</style>
<style lang="scss" scoped>
.isActive {
  background: #666;
}
.isLeft {
  margin-left: 20px;
}
.isRight {
  float: right;
  margin-right:20px;
}
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0,0,0,.3);
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
              margin-left: 4px;
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
      font-size: 24px;
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
