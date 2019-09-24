<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 09:47:36
 * @LastEditTime: 2019-09-18 20:05:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="6">
        <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">角色列表</div>
        <el-table ref="roleList" :data="rolesList" highlight-current-row style="width: 100%;" border @row-click="handleRow">
          <el-table-column align="center" label="角色名">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="描述">
            <template slot-scope="scope">
              {{ scope.row.description }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="18">
        <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">已关联列表</div>
        <div style="padding: 5px;">
          <el-button class="filter-item" type="primary" icon="el-icon-minus" @click="handleCancel">
            取消关联
          </el-button>
        </div>
        <el-table ref="userList1" v-loading="loading" :data="userList1" highlight-current-row style="width: 100%;height:300px;overflow-y: scroll;" border>
          <el-table-column type="selection" width="55" />
          <el-table-column align="center" label="角色名">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="描述">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
        </el-table>
        <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">未关联列表</div>
        <div style="padding: 5px;">
          <el-button class="filter-item" type="primary" icon="el-icon-circle-plus" @click="handleRelation">
            关联
          </el-button>
        </div>
        <el-table ref="userList2" v-loading="loading" :data="userList2" highlight-current-row style="width: 100%;height:300px;overflow-y: scroll;" border>
          <el-table-column type="selection" width="55" />
          <el-table-column align="center" label="角色名">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="描述">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRoles, getExcludeUserListByRoleId, getUserListByRoleId, unbundlingUserFromRole, bindingUserToRole } from '@/api/role'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      form: {
        roleId: null,
        userIds: ''
      },
      rolesList: [],
      userList1: [],
      userList2: []
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      const data = await getRoles()
      this.rolesList = data.data
    },
    async handleRow(row) {
      this.form.roleId = row.id
      this.loading = true
      const data1 = await getExcludeUserListByRoleId(row.id) // 未关联
      const data2 = await getUserListByRoleId(row.id)
      this.userList1 = data2.data
      this.userList2 = data1.data
      this.loading = false
    },
    // 取消关联
    async handleCancel() {
      const data = this.$refs.userList1.selection
      if (data.length !== 0) {
        this.loading = true
        const users = []
        data.forEach(item => {
          users.push(item.id)
        })
        this.form.userIds = users.join(',')
        const resData = await unbundlingUserFromRole(this.form)
        if (resData.code === 20000) {
          this.$message({
            message: '已取消关联',
            type: 'success'
          })
        }
        const data1 = await getExcludeUserListByRoleId(this.form.roleId) // 未关联
        const data2 = await getUserListByRoleId(this.form.roleId)
        this.userList1 = data2.data
        this.userList2 = data1.data
        this.loading = false
      } else {
        this.$message({
          message: '请勾选需要取消关联的用户',
          type: 'error'
        })
      }
    },
    // 关联
    async handleRelation() {
      const data = this.$refs.userList2.selection
      if (data.length !== 0) {
        this.loading = true
        const users = []
        data.forEach(item => {
          users.push(item.id)
        })
        this.form.userIds = users.join(',')
        const resData = await bindingUserToRole(this.form)
        if (resData.code === 20000) {
          this.$message({
            message: '已关联',
            type: 'success'
          })
        }
        const data1 = await getExcludeUserListByRoleId(this.form.roleId) // 未关联
        const data2 = await getUserListByRoleId(this.form.roleId)
        this.userList1 = data2.data
        this.userList2 = data1.data
        this.loading = false
      } else {
        this.$message({
          message: '请勾选需要关联的用户',
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
