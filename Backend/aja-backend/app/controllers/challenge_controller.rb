class ChallengeController < ApplicationController
  def show
    challenge = Challenge.find(params[:id])
    render json: challenge
  end

  def create
    challenge_params = params.require(:challenge).permit(:photo, :sender_id, :receiver_id, :comment)
    challenge = Challenge.create(challenge_params)
    if challenge
      render json: { head: :ok }
    else
      render json: { head: :bad_request, message: 'Unable to create challenge' }
    end
  end
end
