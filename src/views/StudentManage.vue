<template>
  <div class="student-manage">
    <el-card>
      <h2>学生管理</h2>
      <p>学生信息管理功能开发中...</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StudentManage'
}
</script>

<style scoped>
.student-manage {
  padding: 0;
}

.student-manage >>> .el-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.student-manage >>> .el-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
