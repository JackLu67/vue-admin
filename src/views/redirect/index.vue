<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 10:59:19
 * @LastEditTime: 2019-09-02 11:14:20
 * @LastEditors: Please set LastEditors
 -->
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // 避免警告消息
  }
}
</script>
