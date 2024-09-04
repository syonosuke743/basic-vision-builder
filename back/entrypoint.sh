#!/bin/bash
set -e

rm -f /app/tmp/pids/server.pid

export RAILS_ENV=production

#DB createは初回のみ
#bundle exec rails db:create --trace
bundle exec rails db:migrate

exec "$@"