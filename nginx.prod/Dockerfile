FROM nginx:latest

# 既存のNginx設定ファイルを削除
RUN rm -f /etc/nginx/conf.d/*

# カスタムのnginx.confをコピー
COPY ./nginx.conf /etc/nginx/nginx.conf

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
