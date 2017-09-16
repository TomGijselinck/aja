class AddReplyPhotoToChallenge < ActiveRecord::Migration[5.1]
  def change
    add_column :challenges, :reply_photo, :text, limit: 256000
  end
end
