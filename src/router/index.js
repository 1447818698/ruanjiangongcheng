import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '数据概览', icon: 'el-icon-s-home' }
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
        meta: { title: '成绩管理', icon: 'el-icon-document' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
