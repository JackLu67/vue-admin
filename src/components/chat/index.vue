<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:51:14
 * @LastEditTime: 2019-08-27 19:31:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <el-badge is-dot class="item">
      <img :src="imgUrl" alt="" height="40" width="40" @click="handleChat">
    </el-badge>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      imgUrl: require('../../images/chat.png'),
      isShow: false
    }
  },
  methods: {
    handleChat() {
      this.isShow = !this.isShow
      this.$emit('isShow', this.isShow)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  right: 0px;
  top: 40%;
  z-index: 999;
  img {
    cursor: pointer;
  }
}
</style>
