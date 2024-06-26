Rails.application.routes.draw do
  #NextAuth routes
  post 'auth/:provider/callback', to:'api/v1/users#create'

  # Sixhats CRUD routes
  namespace :api do
    namespace :v1 do
      resources :sixhats
    end
  end
end


