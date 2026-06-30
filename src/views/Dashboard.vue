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
            <div class="stat-value">{{ studentCount }}</div>
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
            <div class="stat-value">{{ classCount }}</div>
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
            <div class="stat-value">{{ pendingCount }}</div>
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
  name: 'Dashboard',
  data() {
    return {
      studentList: []
    }
  },
  computed: {
    studentCount() {
      return this.studentList.length
    },
    classCount() {
      const classes = new Set(this.studentList.map(item => item['class']))
      return classes.size
    },
    pendingCount() {
      return this.studentList.filter(item => item.status === '待审批').length
    }
  },
  mounted() {
    this.loadData()
    window.addEventListener('storage', this.onStorageChange)
    this.$bus.$on('student-data-changed', this.onDataChanged)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.onStorageChange)
    this.$bus.$off('student-data-changed', this.onDataChanged)
  },
  methods: {
    onStorageChange(e) {
      if (e.key === 'studentData') this.loadData()
    },
    onDataChanged() {
      this.loadData()
    },
    loadData() {
      const stored = localStorage.getItem('studentData')
      if (stored) {
        try {
          this.studentList = JSON.parse(stored)
          if (!Array.isArray(this.studentList)) throw new Error('数据格式异常')
        } catch (e) {
          console.error('Dashboard: localStorage 数据损坏:', e)
          this.studentList = []
        }
      }
    }
  }
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
  transition: all 0.3s;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-card >>> .el-card__body {
  padding: 24px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
  margin-right: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.stat-icon.blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.stat-icon.orange {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  font-size: 32px;
  font-weight: bold;
  color: #303133;
  line-height: 1.2;
}

/* 进度卡片 */
.progress-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.progress-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
