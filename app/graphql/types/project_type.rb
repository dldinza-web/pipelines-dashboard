# frozen_string_literal: true

module Types
  class ProjectType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :pipeline_statuses, [Types::PipelineStatusType], null: false
    field :url, String, null: false
  end
end
