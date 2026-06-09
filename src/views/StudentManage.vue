<template>
  <div class="student-manage">
    <div class="page-header">
      <h2>学生管理</h2>
    </div>

    <el-card shadow="hover">
      <!-- 学生数据表格 -->
      <el-table
        :data="pagedData"
        border
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#f5f7fa', color: '#303133', fontWeight: '600' }"
        empty-text="暂无学生数据"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
          :index="indexMethod"
        />
        <el-table-column
          prop="id"
          label="学号"
          width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="center"
        />
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="scope.row.gender === '男' ? 'gender-male' : 'gender-female'">
              {{ scope.row.gender }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          width="140"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="140"
          align="center"
        />
        <el-table-column
          prop="status"
          label="审批状态"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="getStatusType(scope.row.status)"
              size="small"
              effect="plain"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 前端分页组件 -->
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
  name: 'StudentManage',
  data() {
    return {
      // 当前页码
      currentPage: 1,
      // 每页显示条数
      pageSize: 5,
      // 本地 Mock 学生数据（22条）
      studentList: [
        { id: '2024001', name: '张三', gender: '男', class: '软件技术2401', phone: '13800010001', status: '已通过' },
        { id: '2024002', name: '李四', gender: '女', class: '软件技术2401', phone: '13800010002', status: '已通过' },
        { id: '2024003', name: '王五', gender: '男', class: '软件技术2402', phone: '13800010003', status: '待审批' },
        { id: '2024004', name: '赵六', gender: '女', class: '软件技术2402', phone: '13800010004', status: '已通过' },
        { id: '2024005', name: '孙七', gender: '男', class: '软件技术2401', phone: '13800010005', status: '已拒绝' },
        { id: '2024006', name: '周八', gender: '女', class: '大数据2401', phone: '13800010006', status: '待审批' },
        { id: '2024007', name: '吴九', gender: '男', class: '大数据2401', phone: '13800010007', status: '已通过' },
        { id: '2024008', name: '郑十', gender: '女', class: '人工智能2401', phone: '13800010008', status: '待审批' },
        { id: '2024009', name: '钱一', gender: '男', class: '人工智能2401', phone: '13800010009', status: '已通过' },
        { id: '2024010', name: '陈二', gender: '女', class: '软件技术2401', phone: '13800010010', status: '已拒绝' },
        { id: '2024011', name: '刘阳', gender: '男', class: '软件技术2402', phone: '13800010011', status: '待审批' },
        { id: '2024012', name: '黄雨', gender: '女', class: '大数据2401', phone: '13800010012', status: '已通过' },
        { id: '2024013', name: '林风', gender: '男', class: '人工智能2401', phone: '13800010013', status: '已通过' },
        { id: '2024014', name: '何霜', gender: '女', class: '软件技术2401', phone: '13800010014', status: '待审批' },
        { id: '2024015', name: '罗雪', gender: '女', class: '软件技术2402', phone: '13800010015', status: '已通过' },
        { id: '2024016', name: '梁宇', gender: '男', class: '大数据2401', phone: '13800010016', status: '已拒绝' },
        { id: '2024017', name: '宋晨', gender: '女', class: '人工智能2401', phone: '13800010017', status: '待审批' },
        { id: '2024018', name: '唐星', gender: '男', class: '软件技术2401', phone: '13800010018', status: '已通过' },
        { id: '2024019', name: '韩月', gender: '女', class: '软件技术2402', phone: '13800010019', status: '已通过' },
        { id: '2024020', name: '冯宇', gender: '男', class: '大数据2401', phone: '13800010020', status: '待审批' },
        { id: '2024021', name: '蒋慧', gender: '女', class: '人工智能2401', phone: '13800010021', status: '已通过' },
        { id: '2024022', name: '沈逸', gender: '男', class: '软件技术2401', phone: '13800010022', status: '已拒绝' }
      ]
    }
  },
  computed: {
    // 通过 slice 切片实现前端分页
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.studentList.slice(start, end)
    }
  },
  methods: {
    // 序号计算方法（保证跨页序号连续）
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 每页条数切换
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.currentPage = 1
    },
    // 页码切换
    handleCurrentChange(newPage) {
      this.currentPage = newPage
    },
    // 审批状态 → el-tag 颜色映射
    getStatusType(status) {
      const map = {
        '已通过': 'success',
        '待审批': 'warning',
        '已拒绝': 'danger'
      }
      return map[status] || 'info'
    }
  }
}
</script>

<style scoped>
.student-manage {
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

.student-manage >>> .el-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.student-manage >>> .el-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.student-manage >>> .el-card__body {
  padding: 24px;
}

/* 分页容器 */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

/* 性别文字样式 */
.gender-male {
  color: #409EFF;
  font-weight: 500;
}

.gender-female {
  color: #E6A23C;
  font-weight: 500;
}
</style>
