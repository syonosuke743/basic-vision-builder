FROM ruby:3.2.2
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

#databaseの処理
ENTRYPOINT ["entrypoint.sh"]

#Nginxとunixソケット通信するのでポートを空ける必要がなくなる
#EXPOSE 3000 

# 以下の記述があることでnginxから見ることができる
VOLUME /app/public
VOLUME /app/tmp

# Start the main process.
CMD bash -c "rm -f tmp/pids/server.pid && bundle exec puma -C config/puma.rb"