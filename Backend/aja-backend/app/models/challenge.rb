class Challenge < ApplicationRecord
  belongs_to :sender, class_name: 'User', optional: true
  belongs_to :receiver, class_name: 'User', optional: true
end
