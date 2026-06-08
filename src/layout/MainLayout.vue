<template>
  <el-container class="main-layout">
    <!-- 左侧导航菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <div class="logo">
        <i class="el-icon-s-grid logo-icon"></i>
        <h3 v-if="!isCollapse">学生管理</h3>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
        unique-opened
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        
        <el-menu-item index="/students">
          <i class="el-icon-user"></i>
          <span slot="title">学生管理</span>
        </el-menu-item>
        
        <el-menu-item index="/grades">
          <i class="el-icon-document"></i>
          <span slot="title">请假审批</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部 Header -->
      <el-header class="header">
        <div class="header-left">
          <i 
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" 
            class="collapse-icon"
            @click="toggleCollapse"
          ></i>
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
              <span class="username">管理员</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 右侧主内容展示区 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    currentTitle() {
      return this.$route.meta.title || '首页'
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('已退出登录')
          // 这里可以添加退出登录逻辑
        }).catch(() => {})
      } else if (command === 'profile') {
        this.$message.info('个人中心功能开发中')
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  height: 100vh;
}

.sidebar {
  background-color: #001529;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1);
  overflow-x: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar >>> .el-menu {
  border-right: none;
}

.sidebar >>> .el-menu-item {
  height: 50px;
  line-height: 50px;
  transition: all 0.3s;
}

.sidebar >>> .el-menu-item:hover {
  background-color: rgba(64, 158, 255, 0.1) !important;
}

.sidebar >>> .el-menu-item.is-active {
  background-color: #409EFF !important;
  color: #fff !important;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.logo-icon {
  font-size: 24px;
  margin-right: 8px;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 64px;
  line-height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-icon {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  color: #515a6e;
  transition: all 0.3s;
}

.collapse-icon:hover {
  color: #409EFF;
  transform: scale(1.1);
}

.breadcrumb {
  line-height: 60px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #606266;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>
