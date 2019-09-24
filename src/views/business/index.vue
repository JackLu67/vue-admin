<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 17:02:17
 * @LastEditTime: 2019-08-24 14:16:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="filter-container">
      <el-input placeholder="name" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true">
        新增
      </el-button>
    </div>
    <el-table
      :data="rolesList"
      border
      fit
      style="width: 100%"
    >
      <el-table-column prop="key" label="key" width="180" />
      <el-table-column prop="name" label="角色名" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="date" label="新增日期" width="180" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-close">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="角色名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-tree :data="routesData" :props="defaultProps" show-checkbox @check-change="handleCheckChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { getRoles, getRoutes } from '@/api/role'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      role: Object.assign({}, defaultRole),
      rolesList: [],
      routes: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkStrictly: false,
      dialogFormVisible: false,
      form: {
        key: '',
        name: '',
        description: '',
        date1: '',
        date2: ''
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
    this.getRoutes()
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // 跳过路由
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // 递归子路由
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    // 参考: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // 当只有一个子路由时，默认显示子路由。
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // 如果没有要显示的子路由，则显示父路由
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px 20px;
  .filter-container {
    margin-bottom: 20px;
  }
}
</style>
