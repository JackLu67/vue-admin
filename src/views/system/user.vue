<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 17:02:17
 * @LastEditTime: 2019-09-20 10:34:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="filter-container">
      <el-input v-model="username" placeholder="请输入用户名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSeachUserInfo">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="handleAddUser">
        新增
      </el-button>
    </div>
    <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">用户列表</div>
    <el-table
      v-loading="loading"
      :data="userList"
      highlight-current-row
      border
      fit
      style="width: 100%"
    >
      <el-table-column prop="username" label="登录名" width="150" />
      <el-table-column prop="nickName" label="昵称" width="150" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="icon" label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="currentAddress" label="当前地址" width="300" />
      <el-table-column prop="createTime" label="新增日期" width="180" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-close" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogType" :visible.sync="dialogVisible">
      <el-form ref="userForm" :model="userForm" :rules="userRoles" auto-complete="on" label-width="80px" label-position="left">
        <el-form-item label="用户名" prop="username">
          <el-input ref="username" v-model="userForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input ref="nickName" v-model="userForm.nickName" name="nickName" type="text" auto-complete="on" placeholder="昵称" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input ref="phone" v-model="userForm.phone" name="phone" type="text" auto-complete="on" placeholder="手机号码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input ref="email" v-model="userForm.email" name="email" type="text" auto-complete="on" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="登录类型" prop="userType">
          <el-select v-model="userForm.userType" name="userType" collapse-tags auto-complete="on" placeholder="请选择类型">
            <el-option v-for="item in userTypes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input ref="education" v-model="userForm.education" name="education" type="text" auto-complete="on" placeholder="学历" />
        </el-form-item>
        <el-form-item label="家庭地址" prop="homeAddress">
          <el-input ref="homeAddress" v-model="userForm.homeAddress" name="homeAddress" type="text" auto-complete="on" placeholder="家庭地址" />
        </el-form-item>
        <el-form-item label="当前地址" prop="currentAddress">
          <el-input ref="currentAddress" v-model="userForm.currentAddress" name="currentAddress" type="text" auto-complete="on" placeholder="当前地址" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('userForm')">取 消</el-button>
        <el-button type="primary" @click="confirmRole('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateUser, searchUserInfo, deleteUser } from '@/api/user'
import { deepClone } from '@/utils'
import { isvalidPhone, isvalidEmail } from '@/utils/validate'

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validateNickName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!isvalidEmail(value)) {
    callback(new Error('请输入正确的邮箱号'))
  } else {
    callback()
  }
}
const validateUserType = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请选择登录类型'))
  } else {
    callback()
  }
}
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      username: '',
      userTypes: [
        { value: 0, label: 'web端' },
        { value: 1, label: '移动端' },
        { value: 2, label: '桌面端' }
      ],
      userList: [],
      userForm: {
        id: null,
        username: '',
        nickName: '',
        phone: '',
        email: '',
        userType: '',
        education: '',
        homeAddress: '',
        currentAddress: ''
      },
      userRoles: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        nickName: [{ required: true, trigger: 'blur', validator: validateNickName }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        userType: [{ required: true, trigger: 'blur', validator: validateUserType }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      dialogType: '新增用户',
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const res = await getUserList()
      this.userList = res.data
      this.loading = false
    },
    async handleSeachUserInfo() {
      const res = await searchUserInfo(this.username)
      this.userList = res.data
    },
    handleAddUser() {
      this.dialogType = '新增用户'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.userForm = deepClone(scope.row)
      this.dialogType = '编辑用户'
      this.dialogVisible = true
    },
    async handleDelete(scope) {
      const data = await deleteUser(scope.row.id)
      if (data.code === 20000) {
        this.getUserList()
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: '操作成功',
          type: 'success'
        })
      }
    },
    cancel(form) {
      this.dialogVisible = false
      this.$refs[form].resetFields()
    },
    confirmRole(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updateUser(this.userForm).then(res => {
            if (res.code === 20000) {
              this.dialogVisible = false
              this.$refs[form].resetFields()
              this.getUserList()
              this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: '操作成功',
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-select {
  display: block !important
}
.wrapper {
  padding: 20px 20px;
  .filter-container {
    margin-bottom: 20px;
  }
}
</style>
