<template>
  <el-col :sm="12" :lg="6">
    <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
      </template>
    </el-result>
  </el-col>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>

</style>