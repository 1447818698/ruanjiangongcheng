<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h2>页面不存在</h2>
      <p>您访问的页面不存在或已被移除</p>
      <el-button type="primary" @click="$router.push('/dashboard')" size="medium">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
.not-found-content {
  text-align: center;
}
.error-code {
  font-size: 120px;
  font-weight: 700;
  color: #409EFF;
  line-height: 1;
  margin-bottom: 16px;
  opacity: 0.8;
}
.not-found-content h2 {
  font-size: 24px;
  color: #303133;
  margin-bottom: 12px;
}
.not-found-content p {
  font-size: 14px;
  color: #909399;
  margin-bottom: 24px;
}
</style>
