<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 14:08:26
 * @LastEditTime: 2019-09-23 14:08:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <el-badge :value="total" class="item">
      <el-button size="small" type="primary" disabled>待审核设备</el-button>
    </el-badge>
    <el-badge :value="total1" class="item">
      <el-button size="small" type="success" disabled>已审核设备</el-button>
    </el-badge>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待审核设备" name="first">
        <div class="filter-container">
          <el-input placeholder="请输入用户名" style="width: 200px;" class="filter-item" />
          <el-button class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="list"
          border
          fit
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="number" label="设备编号" />
          <el-table-column prop="username" label="外业人员" width="180" />
          <el-table-column prop="type" label="设备类型" width="180" />
          <el-table-column prop="model" label="设备型号" width="180" />
          <el-table-column prop="registerTime" label="注册时间" width="180" />
          <el-table-column prop="avalType" label="是否审核" width="180">
            <template slot-scope="scope">
              {{ scope.row.avalType === 0 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button v-if="scope.row.avalType===1" type="primary" size="mini" icon="el-icon-edit" @click="handleApproval(scope)">
                审批
              </el-button>
              <el-button v-if="scope.row.avalType===0" type="primary" size="mini" icon="el-icon-edit">
                重设密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pagesize"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane label="已审核设备" name="second">
        <div class="filter-container">
          <el-input placeholder="请输入用户名" style="width: 200px;" class="filter-item" />
          <el-button class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
        </div>
        <el-table
          v-loading="loading1"
          :data="Alist"
          border
          fit
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="number" label="设备编号" />
          <el-table-column prop="username" label="外业人员" width="180" />
          <el-table-column prop="type" label="设备类型" width="180" />
          <el-table-column prop="model" label="设备型号" width="180" />
          <el-table-column prop="registerTime" label="注册时间" width="180" />
          <el-table-column prop="avalType" label="是否审核" width="180" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template>
              <el-button type="primary" size="mini" icon="el-icon-edit">
                重设密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total1"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pagesize1"
          :current-page="currentPage1"
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogType" :visible.sync="dialogVisible">
      <el-row style="border: 1px solid #eee;border-radius: 5px;">
        <el-col :span="16">
          <div class="info-wrapper">
            <div>
              <span>用户名:</span>
              <span>{{ info.username }}</span>
            </div>
            <div>
              <span>昵称:</span>
              <span>{{ info.username }}</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>设备来源:</span>
              <span>通用发放</span>
            </div>
            <div>
              <span>电话:</span>
              <span>131111111111</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>是否ROOT:</span>
              <span>{{ info.isRoot === 0 ? '是' : '否' }}</span>
            </div>
            <div>
              <span>邮箱:</span>
              <span>admin1@163.com</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>设备编号:</span>
              <span>{{ info.number }}</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>设备生产商:</span>
              <span>HUAWEI</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>所属单位:</span>
              <span>千景空间科技有限公司</span>
            </div>
          </div>
          <div class="info-wrapper">
            <div>
              <span>申请说明:</span>
              <span>三调</span>
            </div>
          </div>
          <el-form ref="avalForm" :model="avalForm" :rules="avalRules" style="padding: 10px;">
            <el-form-item label="审核" prop="avalType">
              <el-radio-group id="avalType" ref="avalType" v-model="avalForm.avalType" name="avalType">
                <el-radio value="0" label="0">通过</el-radio>
                <el-radio value="1" label="1">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核理由" style="display: flex;" prop="avalReason">
              <el-input v-model="avalForm.avalReason" type="textarea" name="avalReason" placeholder="审核不通过必须输入理由" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" style="padding:10px;">
          <div width="100%" height="100%">
            <img :src="src" width="100%" height="100%">
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRole('avalForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getAList, update } from '@/api/equipment'
import { deepClone } from '@/utils'

const validateAvalType = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请选择是否通过'))
  } else {
    callback()
  }
}

export default {
  name: '',
  components: {},
  props: {},
  data() {
    const validateAvalReason = (rule, value, callback) => {
      const avalType = this.$refs.avalType.value
      if (avalType === '1' && value === null) {
        callback(new Error('审核不通过必须输入理由'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loading1: false,
      activeName: 'first',
      list: [],
      Alist: [],
      currentPage: 1,
      pagesize: 20,
      total: null,
      currentPage1: 1,
      pagesize1: 20,
      total1: null,
      dialogType: '设备审核',
      dialogVisible: false,
      info: {
        username: null,
        number: null,
        hasRoot: null,
        deviceSource: null,
        code: null
      },
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      avalForm: {
        id: null,
        avalType: null,
        avalReason: null
      },
      avalRules: {
        avalType: [{ required: true, trigger: 'click', validator: validateAvalType }],
        avalReason: [{ required: false, trigger: 'blur', validator: validateAvalReason }]
      }
    }
  },
  created() {
    this.getList()
    this.getAList()
    //  this.getApprovalCount()
  },
  methods: {
    // 获取待列表
    async getList() {
      this.loading = true
      const data = await getList(this.currentPage, this.pagesize)
      this.total = data.total
      this.list = data.data
      this.loading = false
    },
    // 获取已审核列表
    async getAList() {
      this.loading1 = true
      const data = await getAList(this.currentPage1, this.pagesize1)
      this.total1 = data.total
      this.Alist = data.data
      this.loading1 = false
    },
    handleApproval(data) {
      this.dialogVisible = true
      this.avalForm.id = data.row.id
      this.info = deepClone(data.row)
    },
    async handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.loading = true
      this.pagesize = val
      const data = await getList(this.currentPage, this.pagesize)
      this.total = data.total
      this.list = data.data
      this.loading = false
    },
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.loading = true
      this.currentPage = val
      const data = await getList(this.currentPage, this.pagesize)
      this.total = data.total
      this.list = data.data
      this.loading = false
    },
    async handleSizeChange1(val) {
      // console.log(`每页 ${val} 条`)
      this.loading1 = true
      this.pagesize1 = val
      const data = await getAList(this.currentPage1, this.pagesize1)
      this.total1 = data.total
      this.Alist = data.data
      this.loading1 = false
    },
    async handleCurrentChange1(val) {
      // console.log(`当前页: ${val}`)
      this.loading1 = true
      this.currentPage = val
      const data = await getAList(this.currentPage1, this.pagesize1)
      this.total1 = data.total
      this.Alist = data.data
      this.loading1 = false
    },
    avalTypeFormatter(row, column) {
      const status = row.status
      if (status === 0 || status === '') {
        return '是'
      } else {
        return '否'
      }
    },
    async confirmRole(form) {
      console.log(this.avalForm)
      this.$refs[form].validate(valid => {
        if (valid) {
          update(this.avalForm).then(res => {
            if (res.code === 2000) {
              this.dialogVisible = false
              this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: '操作成功',
                type: 'success'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__header {
  border-bottom: 1px solid #ebeef5;
}
.wrapper {
  padding: 20px 20px;
  .item {
    margin-right: 40px;
  }
  .filter-container {
    margin-bottom: 20px;
  }
  .info-wrapper {
    display: flex
  }
  .info-wrapper div {
    flex: 1;
    padding: 10px;
  }
}
</style>
