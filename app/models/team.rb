class Team < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :project, uniqueness: { scope: :user, message: 'and User have been already taken' }
end
