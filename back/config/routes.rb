Rails.application.routes.draw do

  ##Production healthcheck routes
  get '/healthcheck', to: proc { [200, {}, ['']] }

  #NextAuth routes
  post 'auth/:provider/callback', to:'api/v1/users#create'

  # Sixhats CRUD routes
  namespace :api do
    namespace :v1 do
      resources :sixhats
    end
  end
end


