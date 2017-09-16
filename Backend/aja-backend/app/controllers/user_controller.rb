class UserController < ApplicationController
  def show
    user = User.find(params[:id]).to_json
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
    friends = User.find(params[:id]).friends
    render json: friends.to_json(include: [:challenges_received, :challenges_send])
  end

  def register_device_token
    user = User.find(params[:id])
    user.device_token = params[:device_token]
    user.save
    render json: { head: :ok }
  end
end
