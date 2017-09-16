module NotificationHelper
  require 'httparty'

  FIREBASE_NOTIFICATION_URL = 'https://fcm.googleapis.com/fcm/send'
  FIREBASE_SERVER_API_KEY = ENV['firebase_server_key']

  def send_test_notification
    notification = {}
    notification[:title] = 'Testing cool stuff!'
    notification[:description] = "This is a super awesome push notification"
    device_token = "bogus-token"
    send_notification(notification, device_token)
  end

  def send_notification(headers = {},params = {},notification, device_token)
    headers.merge!(
        {
            "Authorization" => "key=#{FIREBASE_SERVER_API_KEY}",
            "Content-Type"  => "application/json"
        })
    params = notification_params(notification,device_token)
    body = JSON.generate(params)
    HTTParty.post(FIREBASE_NOTIFICATION_URL,
                  :body => body,
                  :headers => headers)
  end

  def notification_params(notification,device_token)
    params = {}
    params[:to] = device_token

    params[:priority] = "high"
    data = {}
    data[:notification_id] = notification[:id]
    data[:title] = notification[:title]
    data[:description] = notification[:description]

    #if you want to send image or app name ###
    # data[:image] = notification[:image]
    # data[:app_name] = notification[:app_name]


    params[:data] = data
    params
  end
end