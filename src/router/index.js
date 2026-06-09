import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, title: '登录' }
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '系统首页', icon: 'el-icon-s-home' }
      },
      {
        path: 'students',
        name: 'Students',
        component: () => import('../views/StudentManage.vue'),
        meta: { title: '学生管理', icon: 'el-icon-user' }
      },
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('../views/ClassManage.vue'),
        meta: { title: '班级管理', icon: 'el-icon-collection' }
      },
      {
        path: 'grades',
        name: 'Grades',
        component: () => import('../views/GradeManage.vue'),
        meta: { title: '请假审批', icon: 'el-icon-document' }
      }
    ]
  },
  // 404 页面
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 获取 token
  const token = localStorage.getItem('token')
  
  // 检查是否需要登录验证（遍历匹配的所有路由，包括父路由）
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // 需要登录
    if (token) {
      // 已登录，放行
      next()
    } else {
      // 未登录，跳转到登录页
      next('/login')
    }
  } else {
    // 不需要登录（如登录页）
    if (to.path === '/login' && token) {
      // 已登录用户访问登录页，重定向到首页
      next('/dashboard')
    } else {
      next()
    }
  }
})

export default router
