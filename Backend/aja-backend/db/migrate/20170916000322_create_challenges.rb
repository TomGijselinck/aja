class CreateChallenges < ActiveRecord::Migration[5.1]
  def change
    create_table :challenges do |t|
      t.string :photo
      t.string :comment
      t.references :sender
      t.references :receiver

      t.timestamps
    end
  end
end
