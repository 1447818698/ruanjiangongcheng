<template>
  <div class="student-manage">
    <div class="page-header">
      <h2>学生管理</h2>
    </div>

    <div class="content-layout">
      <!-- 左侧树形班级筛选 -->
      <div class="tree-sidebar">
        <el-card shadow="hover" class="tree-card">
          <div class="tree-header">
            <i class="el-icon-s-operation"></i>
            <span>组织架构</span>
          </div>
          <el-tree
            ref="classTree"
            :data="treeData"
            :props="treeProps"
            node-key="value"
            default-expand-all
            highlight-current
            :expand-on-click-node="true"
            @node-click="handleTreeNodeClick"
          />
        </el-card>
      </div>

      <!-- 右侧主体 -->
      <div class="main-area">
        <el-card shadow="hover">
          <!-- 搜索栏子组件 -->
          <student-search-bar
            :search-key.sync="searchKey"
            @add="handleAdd"
            @search="handleSearch"
          />

          <!-- 学生数据表格 -->
          <el-table
            :data="pagedData"
            border
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#f5f7fa', color: '#303133', fontWeight: '600' }"
            empty-text="暂无学生数据"
          >
            <el-table-column type="index" label="序号" width="55" align="center" :index="indexMethod" />
            <el-table-column prop="id" label="学号" width="110" align="center" />
            <el-table-column prop="name" label="姓名" width="90" align="center" />
            <el-table-column label="头像" width="70" align="center">
              <template slot-scope="scope">
                <el-avatar
                  v-if="scope.row.avatar"
                  :src="scope.row.avatar"
                  size="small"
                />
                <el-avatar
                  v-else
                  size="small"
                  icon="el-icon-user-solid"
                  style="background: #C0C4CC"
                />
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="65" align="center">
              <template slot-scope="scope">
                <span :class="scope.row.gender === '男' ? 'gender-male' : 'gender-female'">
                  {{ scope.row.gender }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="class" label="班级" width="130" align="center" />
            <el-table-column prop="phone" label="手机号" width="130" align="center" />
            <el-table-column prop="status" label="审批状态" width="100" align="center">
              <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)" size="small" effect="plain">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center" fixed="right">
              <template slot-scope="scope">
                <div class="action-btns">
                  <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" icon="el-icon-delete" style="color: #F56C6C" @click="handleDelete(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
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
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      :title="isEdit ? '编辑学生' : '新增学生'"
      :visible.sync="dialogVisible"
      width="560px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form ref="studentForm" :model="form" :rules="rules" label-width="90px" size="medium">
        <el-form-item label="学号" prop="id">
          <el-input v-model="form.id" placeholder="请输入7位学号" :disabled="isEdit" maxlength="7" />
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
        <!-- 头像上传 -->
        <el-form-item label="学生头像">
          <el-upload
            class="avatar-upload"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload"
            accept="image/*"
          >
            <el-avatar v-if="form.avatar" :src="form.avatar" size="large" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="upload-tip">点击上传学生头像（仅前端预览）</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import StudentSearchBar from '../components/StudentSearchBar.vue'

const DEFAULT_DATA = [
  { id: '2024001', name: '张三', gender: '男', class: '软件技术2401', phone: '13800010001', status: '已通过', avatar: '' },
  { id: '2024002', name: '李四', gender: '女', class: '软件技术2401', phone: '13800010002', status: '已通过', avatar: '' },
  { id: '2024003', name: '王五', gender: '男', class: '软件技术2402', phone: '13800010003', status: '待审批', avatar: '' },
  { id: '2024004', name: '赵六', gender: '女', class: '软件技术2402', phone: '13800010004', status: '已通过', avatar: '' },
  { id: '2024005', name: '孙七', gender: '男', class: '软件技术2401', phone: '13800010005', status: '已拒绝', avatar: '' },
  { id: '2024006', name: '周八', gender: '女', class: '大数据2401', phone: '13800010006', status: '待审批', avatar: '' },
  { id: '2024007', name: '吴九', gender: '男', class: '大数据2401', phone: '13800010007', status: '已通过', avatar: '' },
  { id: '2024008', name: '郑十', gender: '女', class: '人工智能2401', phone: '13800010008', status: '待审批', avatar: '' },
  { id: '2024009', name: '钱一', gender: '男', class: '人工智能2401', phone: '13800010009', status: '已通过', avatar: '' },
  { id: '2024010', name: '陈二', gender: '女', class: '软件技术2401', phone: '13800010010', status: '已拒绝', avatar: '' },
  { id: '2024011', name: '刘阳', gender: '男', class: '软件技术2402', phone: '13800010011', status: '待审批', avatar: '' },
  { id: '2024012', name: '黄雨', gender: '女', class: '大数据2401', phone: '13800010012', status: '已通过', avatar: '' },
  { id: '2024013', name: '林风', gender: '男', class: '人工智能2401', phone: '13800010013', status: '已通过', avatar: '' },
  { id: '2024014', name: '何霜', gender: '女', class: '软件技术2401', phone: '13800010014', status: '待审批', avatar: '' },
  { id: '2024015', name: '罗雪', gender: '女', class: '软件技术2402', phone: '13800010015', status: '已通过', avatar: '' },
  { id: '2024016', name: '梁宇', gender: '男', class: '大数据2401', phone: '13800010016', status: '已拒绝', avatar: '' },
  { id: '2024017', name: '宋晨', gender: '女', class: '人工智能2401', phone: '13800010017', status: '待审批', avatar: '' },
  { id: '2024018', name: '唐星', gender: '男', class: '软件技术2401', phone: '13800010018', status: '已通过', avatar: '' },
  { id: '2024019', name: '韩月', gender: '女', class: '软件技术2402', phone: '13800010019', status: '已通过', avatar: '' },
  { id: '2024020', name: '冯宇', gender: '男', class: '大数据2401', phone: '13800010020', status: '待审批', avatar: '' },
  { id: '2024021', name: '蒋慧', gender: '女', class: '人工智能2401', phone: '13800010021', status: '已通过', avatar: '' },
  { id: '2024022', name: '沈逸', gender: '男', class: '软件技术2401', phone: '13800010022', status: '已拒绝', avatar: '' }
]

export default {
  name: 'StudentManage',
  components: { StudentSearchBar },
  data() {
    const validateId = (rule, value, callback) => {
      if (!value) { callback(new Error('请输入学号')); return }
      if (!/^\d{7}$/.test(value)) { callback(new Error('学号必须为7位数字')); return }
      callback()
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) { callback(new Error('请输入手机号')); return }
      if (!/^1[3-9]\d{9}$/.test(value)) { callback(new Error('请输入正确的11位手机号')); return }
      callback()
    }
    return {
      currentPage: 1,
      pageSize: 5,
      searchKey: '',
      // 树形筛选：当前选中班级（空 = 全部）
      treeFilter: '',
      // 组织架构树数据
      treeData: [
        {
          label: '所有班级',
          value: '',
          children: [
            {
              label: '软件技术系',
              value: 'dept-software',
              children: [
                { label: '软件技术2401', value: '软件技术2401' },
                { label: '软件技术2402', value: '软件技术2402' }
              ]
            },
            {
              label: '大数据系',
              value: 'dept-bigdata',
              children: [
                { label: '大数据2401', value: '大数据2401' }
              ]
            },
            {
              label: '人工智能系',
              value: 'dept-ai',
              children: [
                { label: '人工智能2401', value: '人工智能2401' }
              ]
            }
          ]
        }
      ],
      treeProps: { children: 'children', label: 'label' },
      studentList: [],
      dialogVisible: false,
      isEdit: false,
      editingId: '',
      submitLoading: false,
      form: {
        id: '', name: '', gender: '', class: '', phone: '', status: '', avatar: ''
      },
      rules: {
        id: [{ required: true, validator: validateId, trigger: 'blur' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        class: [{ required: true, message: '请选择班级', trigger: 'change' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        status: [{ required: true, message: '请选择审批状态', trigger: 'change' }]
      }
    }
  },
  computed: {
    filteredList() {
      let list = this.studentList
      // 树形班级筛选
      if (this.treeFilter) {
        list = list.filter(item => item.class === this.treeFilter)
      }
      // 搜索关键字筛选
      if (this.searchKey) {
        const key = this.searchKey.toLowerCase()
        list = list.filter(item => item.id.includes(key) || item.name.includes(key))
      }
      return list
    },
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredList.slice(start, start + this.pageSize)
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
        try { this.studentList = JSON.parse(stored) } catch (e) { this.studentList = [...DEFAULT_DATA] }
      } else {
        this.studentList = [...DEFAULT_DATA]
        this.saveData()
      }
    },
    saveData() {
      localStorage.setItem('studentData', JSON.stringify(this.studentList))
    },

    // ---- 树形节点点击筛选 ----
    handleTreeNodeClick(data) {
      // 叶子节点（班级名）才触发筛选；系节点和根节点仅展开/折叠
      if (!data.children || data.children.length === 0) {
        this.treeFilter = data.value || ''
        this.currentPage = 1
        this.searchKey = ''
      }
    },

    // ---- 头像上传预览 ----
    handleAvatarChange(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.warning('头像图片大小不能超过 2MB!')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.avatar = e.target.result
      }
      reader.readAsDataURL(file.raw)
    },

    // 阻止 el-upload 自动上传，实际在 on-change 处理
    beforeAvatarUpload() {
      return false
    },

    // ---- 搜索 ----
    handleSearch() { this.currentPage = 1 },

    // ---- 新增 ----
    handleAdd() {
      this.isEdit = false; this.editingId = ''
      this.form = { id: '', name: '', gender: '', class: '', phone: '', status: '', avatar: '' }
      this.dialogVisible = true
      this.$nextTick(() => { this.$refs.studentForm && this.$refs.studentForm.clearValidate() })
    },

    // ---- 编辑 ----
    handleEdit(row) {
      this.isEdit = true; this.editingId = row.id
      this.form = { ...row }
      this.dialogVisible = true
      this.$nextTick(() => { this.$refs.studentForm && this.$refs.studentForm.clearValidate() })
    },

    // ---- 删除 ----
    handleDelete(row) {
      this.$confirm(`确认删除学生"${row.name}"（学号：${row.id}）吗？`, '删除确认', {
        confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        const idx = this.studentList.findIndex(item => item.id === row.id)
        if (idx !== -1) {
          this.studentList.splice(idx, 1)
          this.saveData()
          this.$message.success('删除成功')
          if (this.pagedData.length === 0 && this.currentPage > 1) this.currentPage--
        }
      }).catch(() => {})
    },

    // ---- 提交 ----
    handleSubmit() {
      this.$refs.studentForm.validate((valid) => {
        if (!valid) { this.$message.warning('请检查表单填写是否正确'); return }
        this.submitLoading = true
        if (this.isEdit) {
          const idx = this.studentList.findIndex(item => item.id === this.editingId)
          if (idx !== -1) {
            this.$set(this.studentList, idx, { ...this.form })
            this.$message.success('编辑成功')
          }
        } else {
          if (this.studentList.find(item => item.id === this.form.id)) {
            this.$message.error('该学号已存在'); this.submitLoading = false; return
          }
          this.studentList.unshift({ ...this.form })
          this.$message.success('新增成功')
        }
        this.saveData()
        this.dialogVisible = false
        this.submitLoading = false
      })
    },

    // ---- 弹窗关闭重置 ----
    handleDialogClose() {
      this.$refs.studentForm && this.$refs.studentForm.resetFields()
      this.form = { id: '', name: '', gender: '', class: '', phone: '', status: '', avatar: '' }
    },

    // ---- 分页 ----
    indexMethod(index) { return (this.currentPage - 1) * this.pageSize + index + 1 },
    handleSizeChange(s) { this.pageSize = s; this.currentPage = 1 },
    handleCurrentChange(p) { this.currentPage = p },

    // ---- 状态标签 ----
    getStatusType(status) {
      const map = { '已通过': 'success', '待审批': 'warning', '已拒绝': 'danger' }
      return map[status] || 'info'
    }
  }
}
</script>

<style scoped>
.student-manage { padding: 0; }
.page-header { margin-bottom: 20px; }
.page-header h2 { font-size: 20px; font-weight: 600; color: #303133; margin: 0; }

/* 左右布局 */
.content-layout { display: flex; gap: 16px; align-items: flex-start; }

/* 左侧树形 */
.tree-sidebar { width: 220px; flex-shrink: 0; }
.tree-card { border-radius: 8px; }
.tree-card >>> .el-card__body { padding: 16px; }
.tree-header { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #ebeef5; }
.tree-header i { margin-right: 6px; color: #409EFF; }
.tree-sidebar >>> .el-tree { margin-top: 4px; }
.tree-sidebar >>> .el-tree-node__content { height: 36px; }
.tree-sidebar >>> .el-tree-node.is-current > .el-tree-node__content { background-color: #ecf5ff; color: #409EFF; font-weight: 500; }

/* 右侧主体 */
.main-area { flex: 1; min-width: 0; }

.main-area >>> .el-card { border-radius: 8px; }
.main-area >>> .el-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.main-area >>> .el-card__body { padding: 24px; }

/* 头像上传 */
.avatar-upload >>> .el-upload { border: 2px dashed #dcdfe6; border-radius: 50%; cursor: pointer; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
.avatar-upload >>> .el-upload:hover { border-color: #409EFF; }
.avatar-uploader-icon { font-size: 28px; color: #8c939d; width: 80px; height: 80px; line-height: 80px; text-align: center; border-radius: 50%; }
.upload-tip { color: #909399; font-size: 12px; margin-top: 6px; }

/* 操作按钮 */
.action-btns { display: flex; justify-content: center; align-items: center; gap: 4px; }
.action-btns .el-button + .el-button { margin-left: 0; }

/* 分页 */
.pagination-wrapper { display: flex; justify-content: flex-end; margin-top: 20px; padding-top: 16px; border-top: 1px solid #ebeef5; }

/* 性别 */
.gender-male { color: #409EFF; font-weight: 500; }
.gender-female { color: #E6A23C; font-weight: 500; }
.dialog-footer { text-align: right; }
</style>
