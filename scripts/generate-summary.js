const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType
} = require('docx')

// 构建文档内容
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: '微软雅黑', size: 22 }
      }
    }
  },
  sections: [
    // ====== 封面 ======
    {
      children: [
        new Paragraph({ spacing: { before: 3600 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '学生信息管理系统', size: 52, bold: true, color: '409EFF' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({ text: '实训小结报告', size: 40, bold: true, color: '303133' })
          ]
        }),
        new Paragraph({ spacing: { before: 600 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '姓    名：杨子正', size: 24, color: '606266' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '学    号：992431304029', size: 24, color: '606266' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '班    级：软件技术2401', size: 24, color: '606266' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '项目仓库：https://gitee.com/yang-zizheng1/vue-project', size: 24, color: '606266' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({ text: '完成日期：2026年6月', size: 24, color: '606266' })
          ]
        })
      ]
    },
    // ====== 正文 ======
    {
      children: [
        // ---- 一、项目概述 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '一、项目概述', size: 32, bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '本项目是一个基于 Vue 2.6 + Element-UI 构建的学生信息管理系统，旨在通过一个完整的前端项目实训，掌握现代前端工程化的核心技术栈。项目涵盖了工程搭建、路由配置、数据管理、组件通信、网络层封装等前端开发的完整流程，最终产出一个具备登录鉴权、学生管理（CRUD）、班级筛选、请假审批、头像上传等功能的单页面应用（SPA）。' })
          ]
        }),

        // ---- 二、技术栈与架构 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '二、技术栈与架构设计', size: 32, bold: true })]
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: '核心技术栈：', bold: true })
          ]
        }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 前端框架：Vue 2.6.14（MVVM 响应式架构）' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• UI 组件库：Element-UI 2.15.14' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 路由管理：Vue Router 3.5.1（嵌套路由 + 路由守卫）' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 网络请求：Axios 1.6.0（请求/响应拦截器封装）' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 数据持久化：LocalStorage（模拟后端数据库）' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 构建工具：Vue CLI 5.0.0' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '• 版本控制：Git + Gitee' })] }),
        new Paragraph({
          spacing: { before: 200, after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '架构设计上采用了"分层解耦"的思路：视图层（Vue 组件）通过 props/$emit 与子组件通信，通过计算属性（computed）驱动数据展示；逻辑层通过 Axios 封装的 utils/request.js 统一管理网络请求，并在 api/ 目录下按模块划分接口；数据层通过 LocalStorage 实现模拟持久化。' })
          ]
        }),

        // ---- 三、完成的功能模块 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '三、完成的功能模块', size: 32, bold: true })]
        }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '1. 系统后台主体布局 — Element-UI 的 el-container 弹性布局，支持侧边栏折叠/展开动画' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '2. 嵌套路由与菜单联动 — 通过 el-menu 的 router 属性实现菜单项与路由自动联动，刷新保持高亮' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '3. 登录鉴权与路由守卫 — router.beforeEach 全局守卫拦截未登录用户，LocalStorage 存储 token' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '4. 学生管理 CRUD — 完整的增删改查操作，含 el-dialog 弹窗表单、7位学号正则校验、11位手机号校验' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '5. 前端分页与搜索 — el-pagination 组件 + slice 分页，学号/姓名模糊搜索（300ms 防抖）' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '6. 组织架构树筛选 — el-tree 组件，点击班级节点过滤学生列表，系节点仅展开不触发筛选' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '7. 头像上传预览 — el-upload + FileReader 实现图片即时预览，含 2MB 文件大小限制' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '8. 请假审批 — GradeManage 页面与 StudentManage 共享 LocalStorage 数据源，支持跨标签页同步' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '9. 父子组件通信 — StudentSearchBar 子组件通过 props 接收 searchKey，通过 $emit 触发搜索/新增事件' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '10. Axios 网络层封装 — 请求拦截器自动注入 Token，响应拦截器统一处理 HTTP 错误和业务状态码' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '11. 生产构建与交付 — npm run build 生成 dist 目录，README 交付文档完善，推送至 Gitee 公开仓库' })] }),

        // ---- 四、实训心得 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '四、实训心得与收获', size: 32, bold: true })]
        }),

        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: '4.1 对 Vue 响应式原理的深入理解', bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '在 Class 4 的编辑回显功能中，我遇到了"直接引用原始数据对象导致表格数据被污染"的问题。通过查阅文档和调试，我意识到 Vue 2 的响应式系统通过 Object.defineProperty 对 data 中的属性进行 getter/setter 劫持。直接赋值 `this.form = row` 会使 form 和 row 指向同一个对象引用，修改表单时就会同步修改原始数组。解决方法是使用展开运算符 `{ ...row }` 进行浅拷贝，并通过 `this.$set` 触发响应式更新。这个 Bug 让我真正理解了"数据驱动视图"不是魔法，而是有严格的使用规则的。' })
          ]
        }),

        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: '4.2 父子组件通信的设计思考', bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '在 Class 5 中将搜索栏抽离为独立组件 StudentSearchBar 时，我面临"组件边界在哪里"的思考。搜索栏既要实时显示输入内容（通过 prop 传递数据），又要在用户停止输入后才触发搜索（防抖逻辑）。最终采用 Vue 2 的 .sync 修饰符实现双向绑定，同时在子组件内部维护防抖定时器。这种"数据由父组件控制，行为由子组件封装"的模式让我对组件的"高内聚、低耦合"有了具象的认识。' })
          ]
        }),

        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: '4.3 前端工程化的体会', bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: 'Class 6 的 Axios 封装和项目打包让我体会到"工程化"不仅是工具的堆砌，更是规范的建立。请求拦截器统一注入 Token、响应拦截器统一处理错误码，这些看似"多此一举"的封装，在实际多人协作或对接后端接口时能避免大量的重复代码。npm run build 产出的 dist 目录让我直观地看到源代码如何被压缩、打包、分片——app.[hash].js 是业务代码，chunk-vendors.[hash].js 是第三方库，这种按需加载的机制对生产环境的性能至关重要。' })
          ]
        }),

        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: '4.4 Git 版本控制与团队协作意识', bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '整个实训过程坚持使用 Git 进行版本管理，每次提交都遵循约定式提交规范（feat:、fix:、docs: 等前缀）。通过分析提交记录可以回溯每个功能的开发过程——从"feat:初始化项目"到"fix:修复树节点筛选 Bug"，一条清晰的演进脉络跃然纸上。推送至 Gitee 公开仓库后，我检查了在线仓库的 README 渲染效果和 commit 历史，意识到"代码写得好"和"文档写得好"同样重要。' })
          ]
        }),

        // ---- 五、项目的不足 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '五、项目的不足与改进方向', size: 32, bold: true })]
        }),
        new Paragraph({
          spacing: { after: 80 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '尽管项目基本功能完整，但仍存在以下不足：' })
          ]
        }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '（1）数据层薄弱：当前使用 LocalStorage 模拟数据库，数据无法跨用户共享，刷新页面后新增/修改的数据仅局限在单机环境。后续若对接后端接口，可移除 DEFAULT_DATA 模拟数据，通过 Axios 封装的 api/ 模块实现真正的 CRUD 操作。' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '（2）缺少状态管理：项目未引入 Vuex，组件间共享数据（如登录用户信息、审批状态）完全依赖 LocalStorage。随着功能扩展，状态流转会变得不可控，引入 Vuex 或 Pinia 进行集中管理是必要的演进方向。' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '（3）前端路由鉴权过于简化：当前仅通过 LocalStorage 是否存在 token 来判断登录状态，未考虑 token 过期、刷新 token 等真实场景。生产环境中应接入 JWT 标准流程，并在响应拦截器中处理 401 状态码自动跳转登录页。' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '（4）测试覆盖缺失：整个项目未编写单元测试或 E2E 测试。Vue Test Utils + Jest 可用于组件测试，Cypress 可用于端到端流程测试，这些是保障项目质量的重要手段。' })] }),
        new Paragraph({ spacing: { after: 60 }, indent: { left: 400 }, children: [new TextRun({ text: '（5）构建体积优化：Element-UI 全量引入导致打包体积较大（chunk-vendors 约 942KB）。可按需引入组件 + 开启 Gzip 压缩来优化首屏加载速度。' })] }),

        // ---- 六、总结 ----
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: '六、总结与展望', size: 32, bold: true })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '通过本次实训，我从"能跑就行"到"怎么写得更好"有了质的转变。一个合格的前端项目不仅要功能可用，更要代码可维护、架构可扩展、文档可交付。Vue 的组件化思想让我学会了拆解复杂 UI 为独立、可复用的模块；Axios 拦截器封装让我理解了"面向切面编程"的优雅；而 Git 和 Gitee 的版本协作更是让我提前感受到了工程化开发的真实节奏。' })
          ]
        }),
        new Paragraph({
          spacing: { after: 120 },
          indent: { firstLine: 480 },
          children: [
            new TextRun({ text: '展望未来，我希望在这个项目的基础上继续完善：接入真实后端 API、引入 Vuex 状态管理、编写单元测试、优化打包体积，甚至尝试用 TypeScript 重构部分逻辑，让它从一个实训项目成长为一个真正可用的后台管理系统。' })
          ]
        })
      ]
    }
  ]
})

// 生成 docx 文件
const outputPath = path.resolve(__dirname, '..', 'public', 'summary.docx')
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer)
  console.log('✅ 文档已生成:', outputPath)
}).catch(err => {
  console.error('❌ 生成失败:', err)
  process.exit(1)
})
