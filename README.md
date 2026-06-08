# 学生信息管理系统 (Vue Project)

## 项目简介
这是一个基于 Vue 2.x + Element-UI 构建的通用后台管理系统，以学生信息管理系统为案例。系统采用经典的中后台架构设计，包含左侧导航菜单、顶部 Header 和右侧主内容展示区。

## 技术栈
- **核心框架**: Vue 2.6+
- **UI 框架**: Element-UI 2.15+
- **路由管理**: Vue Router 3.x
- **HTTP 客户端**: Axios
- **构建工具**: Vue CLI 5.x

## 功能模块
- ✅ 数据概览 Dashboard
- 🚧 学生管理（开发中）
- 🚧 班级管理（开发中）
- 🚧 成绩管理（开发中）

## 项目结构
```
vue-project/
├── public/              # 静态资源
│   └── index.html
├── src/
│   ├── layout/         # 布局组件
│   │   └── MainLayout.vue
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── views/          # 页面视图
│   │   ├── Dashboard.vue
│   │   ├── StudentManage.vue
│   │   ├── ClassManage.vue
│   │   └── GradeManage.vue
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .gitignore          # Git 忽略配置
├── babel.config.js     # Babel 配置
├── package.json        # 项目依赖
├── vue.config.js       # Vue CLI 配置
└── README.md           # 项目说明
```

## 安装与运行

### 1. 安装依赖
```bash
npm install
```

### 2. 开发环境运行
```bash
npm run serve
```

### 3. 生产环境构建
```bash
npm run build
```

### 4. 代码检查
```bash
npm run lint
```

## 核心特性

### 1. 经典中后台布局
- 左侧可折叠导航菜单
- 顶部 Header（含面包屑导航和用户信息）
- 右侧主内容区域

### 2. Element-UI 完整集成
- Form 表单组件
- Table 表格组件
- Tree 树形控件
- Upload 上传组件

### 3. 路由鉴权
- 嵌套路由配置
- 路由元信息（标题、图标）
- 动态面包屑导航

## 开发规范
- 使用 Vue 2 Composition API 或 Options API
- 遵循 Element-UI 设计规范
- 组件化开发，保持代码复用性
- 统一的代码风格和命名规范

## 后续扩展
- [ ] 登录鉴权功能
- [ ] 学生信息 CRUD 操作
- [ ] 班级管理功能
- [ ] 成绩统计与分析
- [ ] 数据可视化图表
- [ ] 权限管理系统

## License
MIT
