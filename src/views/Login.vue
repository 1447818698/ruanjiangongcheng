<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-header">
        <i class="el-icon-s-grid login-icon"></i>
        <h2>学生信息管理系统</h2>
      </div>
      
      <el-form 
        :model="loginForm" 
        :rules="rules" 
        ref="loginFormRef"
        @keyup.enter.native="handleLogin"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            size="medium"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            size="medium"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="medium" 
            style="width: 100%"
            @click="handleLogin"
            :loading="loading"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-tip">
        <p>默认账号：admin / 123456</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.loading = true
          
          // 模拟登录请求
          setTimeout(() => {
            if (this.loginForm.username === 'admin' && this.loginForm.password === '123456') {
              // 登录成功，保存token和用户信息
              localStorage.setItem('token', 'mock-token-' + Date.now())
              localStorage.setItem('userInfo', JSON.stringify({
                username: this.loginForm.username,
                role: 'admin'
              }))
              
              this.$message.success('登录成功')
              this.$router.push('/')
            } else {
              this.$message.error('用户名或密码错误')
            }
            this.loading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-card {
  width: 440px;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-icon {
  font-size: 56px;
  color: #409EFF;
  margin-bottom: 16px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.login-header h2 {
  font-size: 24px;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

.login-tip {
  text-align: center;
  margin-top: 20px;
}

.login-tip p {
  color: #909399;
  font-size: 13px;
  margin: 0;
}
</style>
