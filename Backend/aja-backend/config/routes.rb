Rails.application.routes.draw do

  # User
  get 'user/show'
  get 'user/:id', to: 'user#show'

  # Challenge
  get 'challenge/:id', to: 'challenge#show'
  get 'challenge', to: 'challenge#show'
  post 'challenge', to: 'challenge#create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # post 'challenge', to: 'challenge#create'
end
