<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 13:54:56
 * @LastEditTime: 2019-09-19 16:10:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <el-badge :value="messages.inbox.length" class="item">
      <el-button size="small" type="success" disabled>已接收</el-button>
    </el-badge>
    <el-badge :value="messages.outbox.length" class="item">
      <el-button size="small" type="primary" disabled>已发送</el-button>
    </el-badge>
    <el-badge :value="messages.drafts.length" class="item">
      <el-button size="small" type="info" disabled>草稿箱</el-button>
    </el-badge>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收件箱" name="first">
        <el-table
          v-loading="loading"
          border
          fit
          :data="messages.inbox"
          :highlight-current-row="true"
          style="width: 100%"
        >
          <el-table-column prop="sendName" label="发件人" width="180" />
          <el-table-column prop="title" label="主题" />
          <el-table-column prop="createTime" label="时间" width="180" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template>
              <el-button type="primary" size="mini" icon="el-icon-edit">
                转发
              </el-button>
              <el-button size="mini" type="danger" icon="el-icon-close">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="messages.inbox.length" layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="PageSize" :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-tab-pane>
      <el-tab-pane label="发件箱" name="second">
        <el-table
          v-loading="loading1"
          border
          fit
          :data="messages.outbox"
          style="width: 100%"
        >
          <el-table-column prop="receiveName" label="收件人" width="180" />
          <el-table-column prop="title" label="主题" />
          <el-table-column prop="date" label="发送时间" width="180" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template>
              <el-button type="primary" size="mini" icon="el-icon-edit">
                转发
              </el-button>
              <el-button size="mini" type="danger" icon="el-icon-close">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="total1" layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes1" :page-size="PageSize1" :current-page="currentPage1" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" />
      </el-tab-pane>
      <el-tab-pane label="写信" name="third">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="receipt-list">
              <el-form ref="noticeform" :model="noticeform" :rules="noticeRules" label-width="80px">
                <el-form-item label="主题" prop="title">
                  <el-input v-model="noticeform.title" name="title" />
                </el-form-item>
                <el-form-item label="收件人" prop="receiveNames">
                  <el-input v-model="noticeform.receiveNames" name="receiveNames" readonly="readonly">
                    <i v-if="noticeform.receiveNames != null" slot="suffix" style="cursor: pointer;" class="el-input__icon el-icon-error" @click="clearInput" />
                  </el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input v-model="noticeform.content" name="content" type="textarea" :rows="20" />
                </el-form-item>
                <el-form-item>
                  <el-button type="info">保存草稿</el-button>
                  <el-button type="primary" @click="submit">立即发送</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="user-list">
              <el-card class="box-card">
                <div slot="header">
                  <div class="header-title">通讯录</div>
                </div>
                <div style="margin-bottom: 15px;">
                  <el-input placeholder="请输入用户名">
                    <i slot="suffix" class="el-input__icon el-icon-search" style="color: green" />
                  </el-input>
                </div>
                <div v-for="(item, index) in userdata" :key="index" class="text item" :class="{isActive: item.selected}" @click="handleUser(item, item.id)">
                  {{ item.username }}
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="fourth">
        <el-table
          border
          fit
          :data="messages.drafts"
          style="width: 100%"
        >
          <el-table-column prop="name" label="收件人" width="180" />
          <el-table-column prop="title" label="主题" />
          <el-table-column prop="date" label="发送时间" width="180" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template>
              <el-button type="primary" size="mini" icon="el-icon-edit">
                发送
              </el-button>
              <el-button size="mini" type="danger" icon="el-icon-close">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getNotice, getSendNotice, sendNoticeInfo, getDraftBox } from '@/api/notice'
import checkPermission from '@/utils/permission' // 权限判断函数
import { getUserList } from '@/api/user'

const validateTitle = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入标题'))
  } else {
    callback()
  }
}
const validateReceiveNames = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请选择收件人'))
  } else {
    callback()
  }
}
const validateContent = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}
export default {
  data() {
    return {
      loading: false,
      loading1: false,
      activeName: 'first',
      total: null,
      total1: null,
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      PageSize: 20,
      currentPage1: 1,
      pageSizes1: [10, 20, 30, 40],
      PageSize1: 10,
      noticeform: {
        title: '',
        receiveNames: null,
        receiveIdes: [],
        receiveIds: null,
        content: '',
        sendName: ''
      },
      noticeRules: {
        title: [{ required: true, trigger: 'blur', validator: validateTitle }],
        receiveNames: [{ required: true, trigger: 'blur', validator: validateReceiveNames }],
        content: [{ required: true, trigger: 'blur', validator: validateContent }]
      },
      messages: {
        inbox: [],
        outbox: [],
        drafts: []
      },
      userdata: [],
      multipleSelection: []
    }
  },
  created() {
    this.getNotice()
    this.getUserList()
    this.getSendNotice()
    this.getDraftBox()
    this.noticeform.sendName = this.$store.getters.name
  },
  methods: {
    checkPermission,
    // 获取发件箱列表
    async getNotice() {
      this.loading = true
      const data = await getNotice(this.currentPage, this.PageSize)
      this.messages.inbox = data.data
      this.loading = false
    },
    // 获取收件箱
    async getSendNotice() {
      this.loading1 = true
      const data = await getSendNotice(this.currentPage, this.PageSize)
      this.messages.outbox = data.data
      this.total1 = data.total
      this.loading1 = false
    },
    async getDraftBox() {
      const data = await getDraftBox()
      console.log(data)
    },
    async getUserList() {
      const res = await getUserList()
      this.userdata = res.data
    },
    handleClick(tab, event) {
      // alert(tab, event)
    },
    // 点击通讯录列表
    handleUser(item, id) {
      item.selected = !item.selected
      if (!this.noticeform.receiveNames) {
        this.noticeform.receiveNames = item.username
      } else {
        this.noticeform.receiveNames = this.noticeform.receiveNames.trim() + '/' + item.username
      }
      this.noticeform.receiveIdes.push(item.id)
      this.noticeform.receiveIds = this.noticeform.receiveIdes.join(',')
    },
    //  清空收件人
    clearInput() {
      this.noticeform.receiveNames = null
      this.noticeform.receiveIdes.length = 0
      this.noticeform.receiveIds = null
      this.userdata.forEach(item => {
        item.selected = false
      })
    },
    // 提交表单
    async submit() {
      this.$refs.noticeform.validate(valid => {
        if (valid) {
          sendNoticeInfo(this.noticeform).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: '发送成功',
                type: 'success'
              })
              this.$refs.noticeform.resetFields()
            }
          })
        }
      })
    },
    async handleSizeChange(val) {
      this.pagesize = val
      this.loading = true
      this.pagesize = val
      const data = await getNotice(this.currentPage, this.PageSize)
      this.messages.outbox = data.data
      this.loading = false
    },
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      this.pagesize = val
      const data = await getNotice(this.currentPage, this.PageSize)
      this.messages.outbox = data.data
      this.loading = false
    },
    async handleSizeChange1(val) {
      this.loading1 = true
      this.pagesize1 = val
      const data = await getSendNotice(this.currentPage1, this.PageSize1)
      this.messages.outbox = data.data
      this.loading1 = false
    },
    async handleCurrentChange1(val) {
      this.loading1 = true
      this.currentPage1 = val
      const data = await getSendNotice(this.currentPage1, this.PageSize1)
      this.messages.outbox = data.data
      this.loading1 = false
    }
  }
}
</script>
<style lang="scss" scoped>
.isActive{
  color: #00A8E6;
}
.wrapper {
  padding: 20px 20px;
  .item {
    margin-right: 40px;
  }
}
.receipt-list {
  height: 80vh;
  overflow-y: auto;
}
.user-list {
  height: 80vh;
  overflow: hidden;
  overflow-y: auto;
  text-align: center;
  .header-title {
    text-align: left;
  }
  .text {
    font-size: 14px;
  }
  .item {
    cursor: pointer;
    margin-bottom: 18px;
  }
}
</style>
