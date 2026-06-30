# ==============================================================================
# Dockerfile — Spring Boot 多阶段构建
# ==============================================================================
# 构建方式：
#   本地构建： docker build -t my-springboot-app .
#   CI/CD 中：由 GitHub Actions 调用，配合 workflow 自动执行
#
# 阶段说明：
#   Stage 1 (build)  —— 使用 Maven + JDK 17 编译打包
#   Stage 2 (runtime) —— 使用精简 JRE 镜像运行，减小产物体积
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: 编译构建阶段
# ------------------------------------------------------------------------------
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# 1. 仅复制 pom.xml，利用 Docker 分层缓存机制
#    只要 pom.xml 不变，此层缓存就不会失效，大幅加速重复构建
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# 2. 复制源码并编译打包（跳过测试，测试由 CI 的 test Job 独立覆盖）
COPY src ./src
RUN mvn clean package -DskipTests

# ------------------------------------------------------------------------------
# Stage 2: 运行阶段 —— 使用 alpine 精简版 JDK JRE
# ------------------------------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine

# 镜像元数据标签（OCI 标准）
LABEL \
  org.opencontainers.image.title="Spring Boot Application" \
  org.opencontainers.image.description="基于 Spring Boot 的后端服务" \
  org.opencontainers.image.version="1.0.0" \
  org.opencontainers.image.vendor="Your Company"

WORKDIR /app

# 从 build 阶段复制构建产物
COPY --from=build /app/target/*.jar app.jar

# 安全加固：以非 root 用户运行
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
  && chown -R appuser:appgroup /app
USER appuser

# 健康检查 —— Docker 运行时会定期探测应用存活状态
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# 应用默认端口
EXPOSE 8080

# 启动入口
ENTRYPOINT ["java", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
