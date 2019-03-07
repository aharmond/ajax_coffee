Rails.application.routes.draw do
  root "brands#index"

  get 'brand_form', to: 'brands#form'

  resources :brands do
    resources :blends
  end
end
