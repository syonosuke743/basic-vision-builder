class Api::V1::SixhatsController < ApplicationController
  before_action :set_sixhat, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:index, :show, :update, :destroy]

  # GET /api/v1/sixhats
  def index
    if current_user
      @sixhats = Sixhat.where(uid: current_user.uid)
      render json: @sixhats
    else
      render json: { error: 'User not authenticated' }, status: :unauthorized
    end
  end

  # GET /api/v1/sixhats/:id
  def show
    authorize_sixhat
    render json: @sixhat
  end

  # POST /api/v1/sixhats
  def create
    if current_user
      @sixhat = Sixhat.new(sixhat_params.merge(uid: current_user.uid))
      if @sixhat.save
        render json: @sixhat, status: :created
      else
        render json: @sixhat.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'User not authenticated' }, status: :unauthorized
    end
  end

  # PATCH/PUT /api/v1/sixhats/:id
  def update
    authorize_sixhat
    if @sixhat.update(sixhat_params)
      render json: @sixhat
    else
      render json: @sixhat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/sixhats/:id
  def destroy
    authorize_sixhat
    @sixhat.destroy
    head :no_content
  end

  private

  def set_sixhat
    @sixhat = Sixhat.find(params[:id])
  end

  def authorize_user
    render json: { error: 'User not authenticated' }, status: :unauthorized unless current_user
  end

  def authorize_sixhat
    render json: { error: 'Not Authorized' }, status: :forbidden unless @sixhat.uid == current_user.uid
  end

  def sixhat_params
    params.require(:sixhat).permit(:theme, :red, :white, :black, :green, :yellow, :blue)
  end
end

