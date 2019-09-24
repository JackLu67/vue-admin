<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 20:12:41
 * @LastEditTime: 2019-09-04 09:53:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="filter-container">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="(item, index) in optionsData" :key="index" :label="item.label" :value="item.value" />
      </el-select>
      <el-input placeholder="请输入图斑预编号查询" style="width: 300px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-search">按权属单位查询</el-button>
      <el-button type="success" icon="el-icon-download">导出所有图斑</el-button>
      <el-button type="primary" icon="el-icon-upload">导入任务表单</el-button>
      <i style="color: red; cursor: pointer;" class="el-icon-question">帮助</i>
    </div>
    <el-table v-loading="loading" style="width: 100%" border fit highlight-current-row tooltip-effect="dark">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="预编号" width="180" sortable />
      <el-table-column prop="title" label="图斑来源" width="180" />
      <el-table-column prop="date" label="图斑面积" width="180" />
      <el-table-column prop="name" label="权属单位名称" width="180" />
      <el-table-column prop="title" label="下发状态" width="180" />
      <el-table-column prop="title" label="外业人员" width="180" />
      <el-table-column prop="date" label="最新下发时间" width="180" />
      <el-table-column prop="date" label="操作" />
    </el-table>
    <el-pagination
      :total="400"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="100"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-button type="primary" @click="handlePrev">上一步,选择分发方式</el-button>
      <el-button type="success">下一步,选择外业人员</el-button>
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
      loading: true,
      currentPage4: 4,
      value: '全部',
      optionsData: [
        { value: '0', label: '全部' },
        { value: '1', label: '已下发' },
        { value: '2', label: '未下发' }
      ]
    }
  },
  created() {
    this.loading = false
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handlePrev() {
      const flag = true
      this.$emit('handlePrev', flag)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  .filter-container {
    padding: 10px 0px;
  }
}
</style>
