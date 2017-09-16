class AddStateToChallenges < ActiveRecord::Migration[5.1]
  def change
    add_column :challenges, :state, :string
  end
end
