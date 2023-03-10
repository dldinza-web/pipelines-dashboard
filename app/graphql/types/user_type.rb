# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, Integer, null: false
    field :username, String, null: false
  end
end
