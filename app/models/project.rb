class Project < ApplicationRecord
  has_many :pipeline_statuses, dependent: :destroy

  has_many :teams, dependent: :destroy
  has_many :users, through: :teams

  validates :name, :url, presence: true
end
