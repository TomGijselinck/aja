Rails.application.routes.draw do

  # User
  get 'user/show'
  get 'user/:id', to: 'user#show'
  post 'user', to: 'user#create'
  get 'user/:id/friends', to: 'user#friends'
  post 'user/:id/register_device_token', to: 'user#register_device_token'
  get 'user/:id/challenges', to: 'user#challenges'

  # Challenge
  get 'challenge/:id', to: 'challenge#show'
  get 'challenge', to: 'challenge#show'
  post 'challenge', to: 'challenge#create'
  post 'fullfill_challenge', to: 'challenge#fullfill_challenge'
  post 'challenge/:id/reply', to: 'challenge#reply'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # post 'challenge', to: 'challenge#create'
end
