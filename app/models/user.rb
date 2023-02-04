class User < ApplicationRecord
  has_many :teams, dependent: :destroy
  has_many :projects, through: :teams

  validates :username, :password, presence: true
end
