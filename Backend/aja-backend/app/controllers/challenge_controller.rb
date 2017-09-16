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
    challenge_params = params.require(:challenge).permit(:photo, :reply_photo, :sender_id, :receiver_id, :comment, :state)
    challenge = Challenge.create(challenge_params)
    sender = User.find(challenge_params[:sender_id])
    receiver = User.find(challenge_params[:receiver_id])
    NotificationsSender.send_challenge_create_notification(sender, receiver)
    if challenge
      render json: { head: :ok }
    else
      render json: { head: :bad_request, message: 'Unable to create challenge' }
    end
  end

  def reply
    challenge = Challenge.find(params[:id])
    challenge.reply_photo = params[:reply_photo]
    challenge.save!
    Rails.logger.info(challenge.errors.messages.inspect)
    render json: { head: :ok }
  end

  def fullfill_challenge
    challenge = Challenge.find(params[:challenge_id])
    challenge.state = 'closed'
    challenge.save
    render json: { head: :ok, message: 'Completed challenge successfully!' }
  end
end
