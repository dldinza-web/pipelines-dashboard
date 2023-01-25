# frozen_string_literal: true

module Types
  class PipelineStatusType < Types::BaseObject
    field :id, ID, null: false
    field :passed, Boolean, null: false
    field :project, Types::ProjectType, null: false
    field :reported_time, GraphQL::Types::ISO8601DateTime, null: false
  end
end
