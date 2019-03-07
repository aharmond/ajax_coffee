Rails.application.routes.draw do
  root "brands#index"

  resources :brands do
    resources :blends
  end
end
