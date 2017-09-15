Rails.application.routes.draw do
  get 'user/show'

  get 'user/:id', to: 'user#show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # post 'challenge', to: 'challenge#create'
end
