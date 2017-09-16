class User < ApplicationRecord
  has_many :friendships
  has_many :friends, through: :friendships
  has_many :challenges_received, class_name: 'Challenge', foreign_key: 'receiver_id'
  has_many :challenges_send, class_name: 'Challenge', foreign_key: 'sender_id'
end
