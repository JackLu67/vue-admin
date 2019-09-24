<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 09:56:30
 * @LastEditTime: 2019-09-04 09:59:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <transition>
    <slot />
  </transition>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
