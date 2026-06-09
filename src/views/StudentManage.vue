<template>
  <div class="student-manage">
    <div class="page-header">
      <h2>学生管理</h2>
    </div>

    <el-card shadow="hover">
      <!-- 顶部操作栏 -->
      <div class="toolbar">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">
          新增学生
        </el-button>
        <div class="toolbar-right">
          <el-input
            v-model="searchKey"
            placeholder="搜索学号或姓名"
            prefix-icon="el-icon-search"
            clearable
            size="medium"
            style="width: 260px"
            @input="handleSearch"
          />
        </div>
      </div>

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
        <el-table-column prop="id" label="学号" width="120" align="center" />
        <el-table-column prop="name" label="姓名" width="100" align="center" />
        <el-table-column prop="gender" label="性别" width="80" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.gender === '男' ? 'gender-male' : 'gender-female'">
              {{ scope.row.gender }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="class" label="班级" width="150" align="center" />
        <el-table-column prop="phone" label="手机号" width="140" align="center" />
        <el-table-column prop="status" label="审批状态" width="110" align="center">
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
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
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
          :total="filteredList.length"
        />
      </div>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑学生' : '新增学生'"
      :visible.sync="dialogVisible"
      width="560px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form
        ref="studentForm"
        :model="form"
        :rules="rules"
        label-width="90px"
        size="medium"
      >
        <el-form-item label="学号" prop="id">
          <el-input
            v-model="form.id"
            placeholder="请输入7位学号"
            :disabled="isEdit"
            maxlength="7"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" maxlength="20" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-select v-model="form.class" placeholder="请选择班级" style="width: 100%">
            <el-option label="软件技术2401" value="软件技术2401" />
            <el-option label="软件技术2402" value="软件技术2402" />
            <el-option label="大数据2401" value="大数据2401" />
            <el-option label="人工智能2401" value="人工智能2401" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入11位手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="审批状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
            <el-option label="已通过" value="已通过" />
            <el-option label="待审批" value="待审批" />
            <el-option label="已拒绝" value="已拒绝" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 默认 Mock 数据
const DEFAULT_DATA = [
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

export default {
  name: 'StudentManage',
  data() {
    // 学号：7位数字
    const validateId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入学号'))
      } else if (!/^\d{7}$/.test(value)) {
        callback(new Error('学号必须为7位数字'))
      } else {
        callback()
      }
    }
    // 手机号：1开头，11位数字
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的11位手机号'))
      } else {
        callback()
      }
    }

    return {
      // 当前页码
      currentPage: 1,
      // 每页显示条数
      pageSize: 5,
      // 搜索关键字
      searchKey: '',
      // 学生数据列表（从 localStorage 加载）
      studentList: [],
      // 弹窗可见性
      dialogVisible: false,
      // 是否为编辑模式
      isEdit: false,
      // 编辑时记录原始学号（用于更新定位）
      editingId: '',
      // 提交按钮 loading
      submitLoading: false,
      // 表单数据
      form: {
        id: '',
        name: '',
        gender: '',
        class: '',
        phone: '',
        status: ''
      },
      // 表单校验规则
      rules: {
        id: [
          { required: true, validator: validateId, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        class: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择审批状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // 搜索过滤后的列表
    filteredList() {
      if (!this.searchKey) return this.studentList
      const key = this.searchKey.toLowerCase()
      return this.studentList.filter(item =>
        item.id.includes(key) || item.name.includes(key)
      )
    },
    // 通过 slice 切片实现前端分页
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredList.slice(start, end)
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // ---- localStorage 持久化 ----
    loadData() {
      const stored = localStorage.getItem('studentData')
      if (stored) {
        try {
          this.studentList = JSON.parse(stored)
        } catch (e) {
          this.studentList = [...DEFAULT_DATA]
        }
      } else {
        this.studentList = [...DEFAULT_DATA]
        this.saveData()
      }
    },
    saveData() {
      localStorage.setItem('studentData', JSON.stringify(this.studentList))
    },

    // ---- 搜索 ----
    handleSearch() {
      this.currentPage = 1
    },

    // ---- 新增 ----
    handleAdd() {
      this.isEdit = false
      this.editingId = ''
      this.form = {
        id: '',
        name: '',
        gender: '',
        class: '',
        phone: '',
        status: ''
      }
      this.dialogVisible = true
      // 清除校验残留
      this.$nextTick(() => {
        this.$refs.studentForm && this.$refs.studentForm.clearValidate()
      })
    },

    // ---- 编辑（数据回显） ----
    handleEdit(row) {
      this.isEdit = true
      this.editingId = row.id
      // 深拷贝回显数据，避免直接引用
      this.form = { ...row }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.studentForm && this.$refs.studentForm.clearValidate()
      })
    },

    // ---- 删除 ----
    handleDelete(row) {
      this.$confirm(
        `确认删除学生"${row.name}"（学号：${row.id}）吗？此操作不可恢复。`,
        '删除确认',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        const index = this.studentList.findIndex(item => item.id === row.id)
        if (index !== -1) {
          this.studentList.splice(index, 1)
          this.saveData()
          this.$message.success('删除成功')
          // 如果当前页数据为空，退回上一页
          if (this.pagedData.length === 0 && this.currentPage > 1) {
            this.currentPage--
          }
        }
      }).catch(() => {})
    },

    // ---- 提交表单（新增/编辑） ----
    handleSubmit() {
      this.$refs.studentForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请检查表单填写是否正确')
          return false
        }

        this.submitLoading = true

        // 模拟异步提交
        setTimeout(() => {
          if (this.isEdit) {
            // 编辑模式：查找并更新
            const index = this.studentList.findIndex(item => item.id === this.editingId)
            if (index !== -1) {
              // 如果学号被修改，检查新的学号是否重复
              if (this.form.id !== this.editingId) {
                const duplicate = this.studentList.find(
                  item => item.id === this.form.id && item.id !== this.editingId
                )
                if (duplicate) {
                  this.$message.error('该学号已存在，请重新输入')
                  this.submitLoading = false
                  return
                }
              }
              this.$set(this.studentList, index, { ...this.form })
              this.$message.success('编辑成功')
            }
          } else {
            // 新增模式：检查学号是否重复
            const duplicate = this.studentList.find(item => item.id === this.form.id)
            if (duplicate) {
              this.$message.error('该学号已存在，请重新输入')
              this.submitLoading = false
              return
            }
            this.studentList.unshift({ ...this.form })
            this.$message.success('新增成功')
          }

          this.saveData()
          this.dialogVisible = false
          this.submitLoading = false
        }, 300)
      })
    },

    // ---- 弹窗关闭时重置 ----
    handleDialogClose() {
      this.$refs.studentForm && this.$refs.studentForm.resetFields()
      this.form = {
        id: '',
        name: '',
        gender: '',
        class: '',
        phone: '',
        status: ''
      }
    },

    // ---- 分页 ----
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.currentPage = 1
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
    },

    // ---- 状态标签颜色 ----
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

/* 顶部操作栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
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

/* 弹窗底部按钮 */
.dialog-footer {
  text-align: right;
}
</style>
