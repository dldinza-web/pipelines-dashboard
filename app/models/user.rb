class User < ApplicationRecord
  before_create :set_default_password

  private

  def set_default_password
    return if password.present?

    self.password = Digest::SHA1.hexdigest Settings.users.default_password
  end
end
