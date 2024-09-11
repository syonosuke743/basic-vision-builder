class Api::V1::SixhatsController < ApplicationController
  before_action :set_sixhat, only: [:show, :update, :destroy]

  # GET /api/v1/sixhats
  def index
    @sixhats = Sixhat.where(uid: current_user.uid)
    render json: @sixhats
  end

  # GET /api/v1/sixhats/:id
  def show
    if @sixhat.uid == current_user.uid
      render json: @sixhat
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end

  # POST /api/v1/sixhats
  def create
    @sixhat = Sixhat.new(sixhat_params.merge(uid: current_user.uid))

    if @sixhat.save
      render json: @sixhat, status: :created
    else
      Rails.logger.error @sixhat.errors.full_messages.join(", ")
      render json: @sixhat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/sixhats/:id
  def update
    if @sixhat.uid == current_user.uid && @sixhat.update(sixhat_params)
      render json: @sixhat
    else
      render json: @sixhat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/sixhats/:id
  def destroy
    if @sixhat.uid == current_user.uid
      @sixhat.destroy
      head :no_content
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end

  private

  def set_sixhat
    @sixhat = Sixhat.find_by(id: params[:id], uid: current_user.uid)
    if @sixhat.nil?
      render json: { error: "Not found" }, status: :not_found
    end
  end

  def sixhat_params
    params.require(:sixhat).permit(:theme, :red, :white, :black, :green, :yellow, :blue)
  end
end
