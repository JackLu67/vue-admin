<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 17:02:17
 * @LastEditTime: 2019-09-20 10:36:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="filter-container">
      <el-input v-model="name" placeholder="请输入角色名字" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="handleAddRole">
        新增
      </el-button>
    </div>
    <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">角色列表</div>
    <el-table :data="rolesList" highlight-current-row style="width: 100%;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="角色名" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="20"
      :current-page="currentPage"
    />
    <el-dialog :title="dialogType" :visible.sync="dialogVisible">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.name" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="列表">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routes"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { constantRoutes } from '../../../mock/routes'
import checkPermission from '@/utils/permission'
import path from 'path'
import { deepClone } from '@/utils'
import { getRoles, addRole, deleteRole, getPermissionsForRoleId, updateRole, getAllPermissionsTree } from '@/api/role'
// const asyncRoutes = JSON.parse(localStorage.getItem('asyncRoutes'))
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
// 获取异步路由
// const routes = deepClone([...constantRoutes, ...asyncRoutes])
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      name: null,
      role: Object.assign({}, defaultRole),
      rolesList: [],
      routes: [],
      dialogType: '新增角色',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkStrictly: false,
      dialogVisible: false,
      total: null,
      currentPage: 1
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
    this.getAllPermissionsTree()
    // this.getRoutes()
  },
  methods: {
    checkPermission,
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    // async getRoutes() {
    //   // const res = await getRoutes()
    //   this.serviceRoutes = routes
    //   this.routes = this.generateRoutes(routes)
    // },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
      this.total = res.total
    },
    async getAllPermissionsTree() {
      const data = await getAllPermissionsTree()
      this.serviceRoutes = data.data
      this.routes = this.generateRoutes(data.data)
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
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
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
    },
    handleSearch() {
      const name = this.name
      if (!name) {
        this.$message({
          message: '角色名不能为空',
          type: 'warning'
        })
      } else {
        const name = this.name
        const list = this.rolesList.filter(item => item.name.indexOf(name) > -1)
        this.rolesList = list
      }
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = '新增角色'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      getPermissionsForRoleId(scope.row.id).then(res => {
        this.dialogType = '编辑角色'
        this.dialogVisible = true
        this.checkStrictly = true
        this.role = deepClone(scope.row)
        this.$nextTick(() => {
          const routes = this.generateRoutes(res.data.routes)
          this.$refs.tree.setCheckedNodes(this.generateArr(routes))
          // set checked state of a node not affects its father and child nodes
          this.checkStrictly = false
        })
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === '编辑角色'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      if (isEdit) {
        await updateRole(this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.getRoles()
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Nmae: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
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
