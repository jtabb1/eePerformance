Rails.application.routes.draw do
  namespace :api do
    resources :todos, only: [:index, :show, :update, :create, :destroy]
    resources :common_todos, only: [:index]
    resources :types, only: [:index]
    resources :users, only: [:show, :create]
    # resources :users, only: [:index, :show, :create, :update, :destroy]
    # Draft below:
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
