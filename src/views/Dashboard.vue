<template>
  <div class="dashboard">
    <div class="page-header">
      <h2>系统首页</h2>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-cards">
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon blue">
            <i class="el-icon-user"></i>
          </div>
          <div class="stat-info">
            <div class="stat-label">在册学生</div>
            <div class="stat-value">24</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon green">
            <i class="el-icon-collection"></i>
          </div>
          <div class="stat-info">
            <div class="stat-label">覆盖班级</div>
            <div class="stat-value">2</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon orange">
            <i class="el-icon-document"></i>
          </div>
          <div class="stat-info">
            <div class="stat-label">待审批</div>
            <div class="stat-value">5</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 实训进度区域 -->
    <el-card class="progress-card" shadow="hover">
      <div class="card-header">
        <h3>实训进度</h3>
      </div>
      <div class="timeline-content">
        <el-timeline>
          <el-timeline-item
            timestamp="第 1-2 天"
            placement="top"
            color="#409EFF"
            :hollow="false"
          >
            <h4>完成工程搭建、后台 Layout、嵌套路由与菜单联动。</h4>
          </el-timeline-item>
          
          <el-timeline-item
            timestamp="第 3-4 天"
            placement="top"
            color="#67C23A"
            :hollow="false"
          >
            <h4>完成学生数据表格、分页、CRUD 与表单正则校验。</h4>
          </el-timeline-item>
          
          <el-timeline-item
            timestamp="第 5-6 天"
            placement="top"
            color="#E6A23C"
            :hollow="false"
          >
            <h4>完成树形筛选、头像预览、Axios 封装与交付文档。</h4>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
}

.stat-card >>> .el-card__body {
  padding: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  margin-right: 16px;
}

.stat-icon.blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.green {
  background: linear-gradient(135deg, #67C23A 0%, #85ce61 100%);
}

.stat-icon.orange {
  background: linear-gradient(135deg, #E6A23C 0%, #f5a623 100%);
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

/* 进度卡片 */
.progress-card {
  border-radius: 8px;
}

.card-header {
  padding: 20px 20px 0;
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.timeline-content {
  padding: 0 20px 20px;
}

.timeline-content h4 {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin: 0 0 8px 0;
  line-height: 1.6;
}

.timeline-content .el-timeline-item__timestamp {
  font-size: 12px;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
