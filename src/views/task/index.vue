<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 14:11:53
 * @LastEditTime: 2019-09-04 09:59:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="top-wrapper">
      <el-row>
        <el-col :span="21">
          <span>未指派情况:地类样本:</span>
          <span style="color: red">132</span>
          <span>个</span>
          <span> 初次举证:</span>
          <span style="color: red">1302</span>
          <span>个</span>
          <span> 补充举证:</span>
          <span style="color: red">0</span>
          <span>个</span>
          <span> 在线举证:</span>
          <span style="color: red">0</span>
          <span>个</span>
        </el-col>
        <el-col :span="3">
          <el-button type="success" plain>查看历史下发任务</el-button>
        </el-col>
      </el-row>
    </div>
    <el-steps :active="active" align-center>
      <el-step title="选择发布方式" description="" />
      <el-step title="选择举证图斑" description="" />
      <el-step title="选择举证人员" description="" />
      <el-step title="完成任务发布" description="" />
    </el-steps>
    <div class="bottom-wrapper">
      <fade>
        <div v-if="isShow" class="select-wrapper">
          <div class="img-wrapper">
            <p>地图发布</p>
            <img :src="src" alt="" width="100%" height="300" @click="handleImg(1)">
            <div class="text">
              <div class="title">地图发布:</div>
              <div class="list">
                <span>1.所有图斑将会聚合展示在地图上</span>
                <span>2.点击聚合图标，查看具体的图斑位置（不同颜色区分图斑分发状态）</span>
                <span>3.点击“多边形选取”按钮，在地图上绘制区域框选中下发图斑</span>
              </div>
            </div>
          </div>
          <div class="center" />
          <div class="img-wrapper">
            <div />
            <p>地图发布</p>
            <img :src="src" alt="" width="100%" height="300" @click="handleImg(2)">
            <div class="text">
              <div class="title">列表发布:</div>
              <div class="list">
                <span>1.所有图斑列表展示，可勾选图斑进行下发</span>
                <span>2.可导出待下发图斑（Excel格式），在Excel中填写每个图斑的外业人员，然后导入自动下发</span>
              </div>
            </div>
          </div>
        </div>
      </fade>
      <el-tabs v-if="listPageIsShow" type="border-card">
        <el-tab-pane label="地类样本">
          <cust-table @handlePrev="handlePrev" />
        </el-tab-pane>
        <el-tab-pane label="初次举证">
          <cust-table @handlePrev="handlePrev" />
        </el-tab-pane>
        <el-tab-pane label="补充举证">
          <cust-table @handlePrev="handlePrev" />
        </el-tab-pane>
        <el-tab-pane label="在线举证">
          <cust-table @handlePrev="handlePrev" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Fade from '@/components/fade'
import CustTable from './components/table'
export default {
  name: 'Task',
  components: {
    CustTable,
    Fade
  },
  props: {},
  data() {
    return {
      loading: true,
      isShow: true,
      listPageIsShow: false,
      active: 1,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  methods: {
    handleImg(n) {
      if (n === 1) {
        this.isShow = false
        this.active = 2
      } else {
        this.isShow = false
        this.active = 2
        this.listPageIsShow = true
      }
    },
    handlePrev(flag) {
      this.listPageIsShow = !flag
      this.isShow = flag
      this.active = 1
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  .top-wrapper {
    color: #555;
    margin-bottom: 15px;
    padding: 10px 10px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
  .bottom-wrapper {
    margin-top: 15px;
    border: 1px solid #eee;
    background: #eee;
    .select-wrapper {
      margin: 50px auto;
      width: 60%;
      display: flex;
      .img-wrapper {
        color: #666;
        font-size: 14px;
        p {
          text-align: center;
          font-size: 20px;
          color: #0458b1;
          font-weight: bold;
        }
        flex: 1;
        position: relative;
        img {
          cursor: pointer;
          border-radius: 5px;
        }
        .text {
          display: flex;
          .title {
            width: 80px;
          }
          .list {
            display: flex;
            flex-direction: column;
            text-align: left;
          }
        }
      }
      .center {
        width: 50px;
      }
    }
  }
}
</style>
