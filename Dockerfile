# ==============================================================================
# Dockerfile — Vue.js 前端多阶段构建
# ==============================================================================
# 构建方式：
#   本地构建： docker build -t vue-project .
#   CI/CD 中：由 GitHub Actions 调用
#
# 阶段说明：
#   Stage 1 (build)  —— Node.js 安装依赖并构建静态资源
#   Stage 2 (serve)  —— Nginx 运行，提供极致精简的镜像体积
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: 编译构建阶段
# ------------------------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# 1. 仅复制依赖清单，利用 Docker 分层缓存
#    package.json / package-lock.json 未变化时，此层缓存不失效
COPY package.json package-lock.json ./
RUN npm ci

# 2. 复制源码并执行构建
COPY public ./public
COPY src ./src
COPY vue.config.js babel.config.js ./
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: 运行阶段 —— Nginx 静态文件服务器
# ------------------------------------------------------------------------------
FROM nginx:stable-alpine

# 镜像元数据标签（OCI 标准）
LABEL \
  org.opencontainers.image.title="Vue Student Management System" \
  org.opencontainers.image.description="学生信息管理系统 - 基于 Vue.js 的前端应用" \
  org.opencontainers.image.version="1.0.0" \
  org.opencontainers.image.vendor="Student Project"

# 从 build 阶段复制构建产物到 Nginx 默认站点目录
COPY --from=build /app/dist /usr/share/nginx/html

# SPA 路由支持：所有未匹配请求返回 index.html
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files $uri $uri/ /index.html; } \
  # 静态资源缓存策略 \
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ { \
    expires 30d; \
    add_header Cache-Control "public, immutable"; \
  } \
}' > /etc/nginx/conf.d/default.conf

# 安全加固：非 root 用户运行
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

# 暴露端口
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
