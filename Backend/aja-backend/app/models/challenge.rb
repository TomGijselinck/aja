class Challenge < ApplicationRecord
  has_one :sender, class_name: 'User'
  has_one :receiver, class_name: 'User'
end
