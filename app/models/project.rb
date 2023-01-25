class Project < ApplicationRecord
  has_many :pipeline_statuses, dependent: :destroy
end
