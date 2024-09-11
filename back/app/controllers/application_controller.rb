class ApplicationController < ActionController::API
  def current_user
    @current_user ||= User.find_by(uid: session[:user_uid])
  end
end
