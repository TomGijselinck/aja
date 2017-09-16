Rails.application.routes.draw do

  # User
  get 'user/show'
  get 'user/:id', to: 'user#show'
  post 'user', to: 'user#create'
  get 'user/:id/friends', to: 'user#friends'

  # Challenge
  get 'challenge/:id', to: 'challenge#show'
  get 'challenge', to: 'challenge#show'
  post 'challenge', to: 'challenge#create'
  post 'fullfill_challenge', to: 'challenge#fullfill_challenge'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # post 'challenge', to: 'challenge#create'
end
