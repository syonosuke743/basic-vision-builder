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

#server.pidを消す処理
ENTRYPOINT ["entrypoint.sh"]

#Nginxが起動するのでポートを空ける必要がなくなる
#EXPOSE 3000 

# Start the main process.
CMD ["sh", "./back/start-server.sh"]