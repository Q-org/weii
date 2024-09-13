# mkcert

```sh
scp D:\Program Files (x86)\Qianxue\qng\conf\cert\mkcert\localhost+6.pem user@server:/C:/Certs/


"d:\Program Files\PuTTY\pscp.exe" "D:\Program Files (x86)\Qianxue\qng\conf\cert\mkcert\localhost+6.pem" administrator@192.168.8.240:/C:/Certs/
"d:\Program Files\PuTTY\pscp.exe" "D:\Program Files (x86)\Qianxue\qng\conf\cert\mkcert\localhost+6-key.pem" administrator@192.168.9.240:/C:/Certs/

```

使用 mkcert 制作本地自签名 SSL 证书非常简单。以下是详细步骤：

1. 安装 mkcert
   首先，根据你的操作系统下载并安装 mkcert。你可以从 mkcert 的 GitHub 页面 下载最新版本。

Windows 安装步骤：

1. 下载 mkcert 可执行文件，例如 mkcert-v1.4.4-windows-amd64.exe。
2. 将下载的文件重命名为 mkcert.exe 并移动到一个在系统 PATH 中的目录，例如 C:\Windows\System32。

3. 安装本地 CA
   在命令提示符或终端中运行以下命令来安装本地 CA（证书颁发机构）：

   ```sh
   mkcert -install
   ```

   这会在你的系统中安装一个本地 CA 证书，使得由 mkcert 生成的证书被系统信任。

4. 生成自签名证书
   使用以下命令生成自签名证书：

   mkcert localhost 127.0.0.1 ::1 192.168.9.240 WIN-HAVIOJH4DTJ server1 kj

   你可以根据需要替换 example.com 和其他域名/IP 地址。命令执行后会生成两个文件：一个是证书文件（例如 example.com+4.pem），另一个是私钥文件（例如 example.com+4-key.pem）。

5. 使用生成的证书
   将生成的证书和私钥文件配置到你的 Web 服务器。例如，如果你使用的是 Nginx，可以在配置文件中添加以下内容：

   ```sh
   server {
   listen 443 ssl;
   server_name example.com;

   ssl_certificate /path/to/example.com+4.pem;
   ssl_certificate_key /path/to/example.com+4-key.pem;

   # 其他配置

   }
   ```

6. 验证证书
   启动你的 Web 服务器并访问配置的域名，确保浏览器显示连接是安全的。

示例
以下是一个完整的示例，展示如何使用 mkcert 生成并配置证书：

```conf
# 安装 mkcert

mkcert -install

# 生成证书

mkcert example.com localhost 127.0.0.1 ::1

# 配置 Nginx

# 在 Nginx 配置文件中添加以下内容

server {
listen 443 ssl;
server_name example.com;

ssl_certificate /path/to/example.com+4.pem;
ssl_certificate_key /path/to/example.com+4-key.pem;

# 其他配置

}
```
