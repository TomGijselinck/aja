class ChangePhotoTypeToText < ActiveRecord::Migration[5.1]
  def change
    change_column :challenges, :photo, :text, limit: 256000
  end
end
