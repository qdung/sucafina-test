class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  def verified_request?
    if request.content_type == "application/json"
      true
    else
      super()
    end
  end
end