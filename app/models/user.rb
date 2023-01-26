class User < ApplicationRecord
  before_create :set_default_password

  has_many :teams, dependent: :destroy
  has_many :projects, through: :teams

  validates :username, presence: true

  private

  def set_default_password
    return if password.present?

    self.password = Digest::SHA1.hexdigest Settings.users.default_password
  end
end
