class UserController < ApplicationController
  def show
    user = User.find(params[:id]).to_json
    render json: user
  end
end
