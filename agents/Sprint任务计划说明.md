gantt
    title 用户管理系统 Sprint 计划（一周）
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    
    section Day 1 - 需求与设计
    需求评审与功能梳理           :done, req1, 2026-05-11, 2h
    数据库表结构设计             :done, db1, after req1, 3h
    API 接口文档编写             :done, api1, after req1, 3h
    前端组件结构规划             :done, fe1, after req1, 2h
    
    section Day 2 - 基础架构
    创建用户表（users）          :active, db2, 2026-05-12, 2h
    创建角色表（roles）          :db3, after db2, 1h
    创建会话表（sessions）       :db4, after db2, 1h
    搭建后端项目框架             :be1, after api1, 4h
    配置数据库连接               :be2, after db2, 1h
    前端项目结构优化             :fe2, after fe1, 3h
    封装 Axios 请求工具          :fe3, after fe2, 2h
    
    section Day 3 - 核心接口
    用户注册接口开发             :be3, 2026-05-13, 3h
    用户登录接口开发             :be4, after be3, 3h
    JWT Token 生成与验证         :be5, after be4, 2h
    获取用户信息接口             :be6, after be5, 2h
    注册页面 UI 完善             :fe4, after fe3, 4h
    登录页面 UI 完善             :fe5, after fe3, 4h
    
    section Day 4 - 认证联调
    注册功能前后端联调           :test1, 2026-05-14, 3h
    登录功能前后端联调           :test2, after test1, 3h
    Token 存储与路由守卫         :fe6, after test2, 2h
    登录状态持久化               :fe7, after fe6, 2h
    注册表单验证优化             :fe8, after test1, 2h
    登录错误处理优化             :fe9, after test2, 2h
    
    section Day 5 - 管理模块
    用户列表查询接口             :be7, 2026-05-15, 3h
    用户信息更新接口             :be8, after be7, 2h
    用户删除接口                 :be9, after be8, 2h
    用户角色分配接口             :be10, after be9, 2h
    用户管理页面 UI 开发         :fe10, after fe7, 6h
    
    section Day 6 - 管理联调
    用户列表功能联调             :test3, 2026-05-16, 3h
    用户编辑功能联调             :test4, after test3, 3h
    用户删除功能联调             :test5, after test4, 2h
    分页功能实现                 :fe11, after test3, 2h
    搜索过滤功能实现             :fe12, after fe11, 2h
    权限控制实现                 :fe13, after fe7, 2h
    
    section Day 7 - 测试优化
    单元测试编写（后端）         :test6, 2026-05-17, 3h
    组件测试编写（前端）         :test7, after test6, 3h
    接口性能优化                 :be11, after test6, 2h
    页面加载优化                 :fe14, after test7, 2h
    Bug 修复与代码审查           :review, after be11, 4h
    Sprint 回顾与文档整理        :doc, after review, 2h