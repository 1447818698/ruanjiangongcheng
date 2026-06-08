<template>
  <div class="class-manage">
    <el-card>
      <h2>班级管理</h2>
      <p>班级管理功能开发中...</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ClassManage'
}
</script>

<style scoped>
.class-manage {
  padding: 0;
}

.class-manage >>> .el-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.class-manage >>> .el-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
