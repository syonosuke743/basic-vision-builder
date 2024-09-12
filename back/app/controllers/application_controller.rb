# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_request

  def current_user
    @current_user
  end

  private

  def authenticate_request
    uid = request.headers['X-UID'] || params[:uid]
    @current_user = User.find_by(uid: uid)
    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
  end
end








