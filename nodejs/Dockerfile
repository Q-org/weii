# 使用 Node.js 官方镜像（基于 Debian 12）
FROM node:current-bookworm

# 设置时区（可选）
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 更新包管理器索引，并安装依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget curl ca-certificates supervisor

# 添加 Redis 官方 APT 源并安装 Redis
COPY redis-7.4.2.tar.gz /tmp/redis-7.4.2.tar.gz

RUN tar xzf /tmp/redis-7.4.2.tar.gz -C /tmp && \
    cd /tmp/redis-7.4.2 && make && make install && \
    rm -rf /tmp/redis*

# 复制 Redis 配置文件（如果有自定义配置）
COPY redis.conf /etc/redis/redis.conf

# 安装 PM2（用于运行 Node.js 应用）
RUN npm install -g pm2

# 创建 Supervisor 配置目录
RUN mkdir -p /etc/supervisor/conf.d

# 复制 Supervisor 配置文件
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 设置工作目录
WORKDIR /app

# # 复制 Node.js 项目代码
# COPY . /app

# 公开 Redis 和 Node.js 端口
EXPOSE 6379 3000

# 启动 Supervisor（同时管理 Redis 和 Node.js）
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
