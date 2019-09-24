<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 17:02:17
 * @LastEditTime: 2019-09-20 10:35:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="handleAddMenu">
        新增
      </el-button>
    </div>
    <div style="background: #eee;padding: 10px 10px;color:#666;border:1px solid #EBEEF5">栏目列表</div>
    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="id"
      border
      fit
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
    >
      <el-table-column prop="meta.title" label="目录名" width="180" />
      <el-table-column prop="name" label="name" width="100" />
      <el-table-column prop="path" label="path" width="180" />
      <el-table-column prop="redirect" label="redirect" width="180" />
      <el-table-column prop="meta.roles" label="roles" width="180" />
      <el-table-column prop="component" label="component" width="180" />
      <el-table-column prop="createTime" label="新增日期" width="180" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.component !== '/layout'" type="primary" size="mini" @click="handleBtn(scope)">
            按钮管理
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-close">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogType" :visible.sync="dialogVisible">
      <el-form v-model="form" label-width="80px" label-position="left">
        <el-form-item label="parent">
          <el-select v-model="form.pid" collapse-tags placeholder="请选择">
            <el-option v-for="item in menuList" :key="item.id" :label="item.meta.title" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="type">
          <el-select v-model="form.type" collapse-tags placeholder="请选择类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="name">
          <el-input v-model="form.name" placeholder="name" />
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="form.value" placeholder="value" />
        </el-form-item>
        <el-form-item label="path">
          <el-input v-model="form.path" placeholder="path" />
        </el-form-item>
        <el-form-item label="component">
          <el-input v-model="form.component" placeholder="component" />
        </el-form-item>
        <el-form-item label="title">
          <el-input v-model="form.title" placeholder="title" />
        </el-form-item>
        <el-form-item label="icon">
          <el-input v-model="form.icon" placeholder="icon" />
        </el-form-item>
        <el-form-item label="redirect">
          <el-input v-model="form.redirect" placeholder="redirect" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="buttonType" :visible.sync="buttonVisible">
      <div style="padding: 20px 0px;">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" @click="handleAddMenu">
          新增按钮
        </el-button>
      </div>
      <el-table
        border
        fit
        style="width: 100%"
      >
        <el-table-column prop="name" label="name" width="100" />
        <el-table-column prop="value" label="path" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-close">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu } from '@/api/role'
import { addMenu } from '@/api/menu'
import { deepClone } from '@/utils'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      loading: true,
      menuList: [],
      buttonType: '按钮管理',
      buttonVisible: false,
      dialogVisible: false,
      dialogType: '新增',
      options: [
        { value: '0', label: '目录' },
        { value: '1', label: '菜单' },
        { value: '2', label: '按钮' }
      ],
      form: {
        id: null,
        pid: null,
        name: null,
        path: null,
        component: null,
        title: null,
        redirect: null,
        type: null,
        icon: null,
        value: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAddMenu() {
      this.dialogType = '新增'
      this.dialogVisible = true
    },
    async getList() {
      const data = await getMenu()
      this.menuList = data.data
      this.loading = false
    },
    handleEdit(data) {
      this.dialogType = '编辑'
      this.dialogVisible = true
      this.form = deepClone(data.row)
    },
    handleBtn(data) {
      this.buttonVisible = true
      console.log(data)
    },
    async confirmRole() {
      const idEdit = this.dialogType === '编辑'
      if (idEdit) {
        console.log(1)
      } else {
        await addMenu(this.form)
        this.getList()
      }
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: '操作成功',
        type: 'success'
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
