class UserController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user_params = params.require(:user).permit(:name, :device_token)
    user = User.create(user_params)
    if user
      render json: { head: :ok }
    else
      render json: { head: :bad_request, message: 'Unable to create user' }
    end
  end

  def friends
    user = User.find(params[:id])
    friends = user.friends
    friends.each do |friend| check_for_challenge_expiration(friend) end
    render json: generate_friends_scores_json(friends, user)
  end

  def challenges
    user = User.find(params[:id])
    render json: {
        'challenges_received': user.challenges_received,
        'challenges_send': user.challenges_send
    }
  end

  def register_device_token
    user = User.find(params[:id])
    user.device_token = params[:device_token]
    user.save
    render json: { head: :ok }
  end

  def validate_id
    if User.exists?(params[:id])
      render json: { message: 'Valid user ID!' }, status: 200
    else
      render json: { message: 'Invalid user ID' }, status: 401
    end
  end

  private

    def check_for_challenge_expiration(user)
      user.challenges_received.each do |challenge|
        if (Time.now - challenge.created_at) > 24.hour
          challenge.state = 'failed'
          challenge.save
        end
      end
    end

    def generate_friends_scores_json(friends, user)
      friends_json = []
      friends.each do |friend|
        friend_details = {}
        friend_details[:id] = friend.id
        friend_details[:name] = friend.name
        friend_details[:image_url] = friend.image_url
        friend_details[:score] = friend.score - user.score
        friend_details[:number_of_send_challenges_completed] = friend.challenges_send.where(state: 'closed', receiver_id: user.id).size
        friend_details[:number_of_send_challenges_failed] = friend.challenges_send.where(state: 'failed', receiver_id: user.id).size
        friend_details[:number_of_received_challenges_completed] = friend.challenges_received.where(state: 'closed', sender_id: user.id).size
        friend_details[:number_of_received_challenges_failed] = friend.challenges_received.where(state: 'failed', sender_id: user.id).size
        friends_json.append friend_details
      end
      friends_json
    end
end
