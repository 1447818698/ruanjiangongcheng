<template>
  <div class="grade-manage">
    <div class="page-header">
      <h2>请假审批</h2>
    </div>

    <el-card shadow="hover">
      <div class="stats-bar">
        <el-tag type="warning" size="medium">待审批：{{ pendingCount }}</el-tag>
        <el-tag type="success" size="medium">已通过：{{ approvedCount }}</el-tag>
        <el-tag type="danger" size="medium">已拒绝：{{ rejectedCount }}</el-tag>
      </div>

      <el-table
        :data="pagedData"
        border
        stripe
        style="width: 100%; margin-top: 16px"
        :header-cell-style="{ background: '#f5f7fa', color: '#303133', fontWeight: '600' }"
        empty-text="暂无待审批记录"
      >
        <el-table-column label="序号" type="index" width="55" align="center" :index="indexMethod" />
        <el-table-column prop="id" label="学号" width="110" align="center" />
        <el-table-column prop="name" label="姓名" width="90" align="center" />
        <el-table-column prop="class" label="班级" width="130" align="center" />
        <el-table-column prop="phone" label="手机号" width="130" align="center" />
        <el-table-column prop="status" label="审批状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small" effect="plain">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template slot-scope="scope">
            <div class="action-btns">
              <el-button
                type="success" size="mini" icon="el-icon-check"
                :disabled="scope.row.status === '已通过'"
                @click="handleApprove(scope.row, '已通过')"
              >通过</el-button>
              <el-button
                type="danger" size="mini" icon="el-icon-close"
                :disabled="scope.row.status === '已拒绝'"
                @click="handleApprove(scope.row, '已拒绝')"
              >拒绝</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="studentList.length"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GradeManage',
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      studentList: []
    }
  },
  computed: {
    pendingCount() { return this.studentList.filter(item => item.status === '待审批').length },
    approvedCount() { return this.studentList.filter(item => item.status === '已通过').length },
    rejectedCount() { return this.studentList.filter(item => item.status === '已拒绝').length },
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.studentList.slice(start, start + this.pageSize)
    }
  },
  mounted() {
    this.loadData()
    // 监听 localStorage 变化，实现跨标签页数据同步
    window.addEventListener('storage', this.onStorageChange)
    // 监听同标签页内 EventBus 数据变更事件
    this.$bus.$on('student-data-changed', this.onDataChanged)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.onStorageChange)
    this.$bus.$off('student-data-changed', this.onDataChanged)
  },
  methods: {
    // 其他标签页修改 studentData 时自动刷新
    onStorageChange(e) {
      if (e.key === 'studentData') {
        this.loadData()
      }
    },
    // 同标签页内 StudentManage 修改数据时自动刷新
    onDataChanged() {
      this.loadData()
    },
    // 从 localStorage 读取学生数据（与 StudentManage 共享数据源）
    loadData() {
      const stored = localStorage.getItem('studentData')
      if (stored) {
        try {
          this.studentList = JSON.parse(stored)
          // 防御性校验：确保数据格式正确
          if (!Array.isArray(this.studentList)) throw new Error('数据格式异常')
        } catch (e) {
          console.error('GradeManage: localStorage 数据损坏:', e)
          this.studentList = []
          this.$message.warning('本地存储数据异常，部分功能可能不可用')
        }
      }
    },
    // 审批操作 —— 修改状态并同步写回 localStorage
    handleApprove(row, newStatus) {
      const action = newStatus === '已通过' ? '通过' : '拒绝'
      this.$confirm(`确认${action}学生"${row.name}"的请假申请吗？`, '审批确认', {
        confirmButtonText: `确认${action}`,
        cancelButtonText: '取消',
        type: newStatus === '已通过' ? 'success' : 'warning'
      }).then(() => {
        const idx = this.studentList.findIndex(item => item.id === row.id)
        if (idx !== -1) {
          this.$set(this.studentList[idx], 'status', newStatus)
          // 同步写回 localStorage，使 StudentManage 页面数据同步
          localStorage.setItem('studentData', JSON.stringify(this.studentList))
          this.$bus.$emit('student-data-changed')
          this.$message.success(`已${action}学生"${row.name}"的请假申请`)
        }
      }).catch(() => {})
    },
    getStatusType(status) {
      const map = { '已通过': 'success', '待审批': 'warning', '已拒绝': 'danger' }
      return map[status] || 'info'
    },
    indexMethod(index) { return (this.currentPage - 1) * this.pageSize + index + 1 },
    handleSizeChange(s) { this.pageSize = s; this.currentPage = 1 },
    handleCurrentChange(p) { this.currentPage = p }
  }
}
</script>

<style scoped>
.grade-manage { padding: 0; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 20px; font-weight: 600; color: #303133; margin: 0; }
.grade-manage >>> .el-card { border-radius: 8px; transition: all 0.3s; }
.grade-manage >>> .el-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.grade-manage >>> .el-card__body { padding: 24px; }
.stats-bar { display: flex; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid #ebeef5; }
.action-btns { display: flex; justify-content: center; align-items: center; gap: 8px; }
.action-btns .el-button + .el-button { margin-left: 0; }
.pagination-wrapper { display: flex; justify-content: flex-end; margin-top: 20px; padding-top: 16px; border-top: 1px solid #ebeef5; }
</style>
