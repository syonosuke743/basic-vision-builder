module Api
  module V1
    class UsersController < ApplicationController

      # createアクションでの認証をスキップ
      skip_before_action :authenticate_request, only: [:create]

      def create
        # 引数の条件に該当するデータがあればそれを返す。なければ新規作成する
        user = User.find_or_create_by(provider: params[:provider], uid: params[:uid], name: params[:name], email: params[:email])
        if user
          head :ok #status code 200を返す
        else
          render json: { error: "ログインに失敗しました" }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end


