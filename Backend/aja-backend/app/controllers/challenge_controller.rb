class ChallengeController < ApplicationController
  def show
    if params.has_key? :user_id
      challenges = Challenge.where(receiver_id: params[:user_id])
    else
      challenges = challenge = Challenge.find(params[:id])
    end
    render json: challenges
  end

  def create
    challenge_params = params.require(:challenge).permit(:photo, :sender_id, :receiver_id, :comment, :state)
    challenge = Challenge.create(challenge_params)
    if challenge
      render json: { head: :ok }
    else
      render json: { head: :bad_request, message: 'Unable to create challenge' }
    end
  end
end
