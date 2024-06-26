module Api
  module V1
    class SixhatsController < ApplicationController
      before_action :set_sixhat, only: [:show, :update, :destroy]

      # GET /api/v1/sixhats
      def index
        @sixhats = Sixhat.all
        render json: @sixhats
      end

      # GET /api/v1/sixhats/:id
      def show
        render json: @sixhat
      end

      # POST /api/v1/sixhats
      def create
        @sixhat = Sixhat.new(sixhat_params)

        if @sixhat.save
          render json: @sixhat, status: :created
        else
          Rails.logger.error @sixhat.errors.full_messages.join(", ")
          render json: @sixhat.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/sixhats/:id
      def update
        if @sixhat.update(sixhat_params)
          render json: @sixhat
        else
          render json: @sixhat.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/sixhats/:id
      def destroy
        @sixhat.destroy
        head :no_content
      end

      private

      def set_sixhat
        @sixhat = Sixhat.find(params[:id])
      end

      def sixhat_params
        params.require(:sixhat).permit(:uid, :theme, :red, :white, :black, :green, :yellow, :blue)
      end
    end
  end
end




