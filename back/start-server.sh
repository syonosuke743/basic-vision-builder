#!/bin/sh
echo "run start-server.sh" &
rails server

#tcp通信の必要がないため削除
#rails server -p 3000 -b 0.0.0.0