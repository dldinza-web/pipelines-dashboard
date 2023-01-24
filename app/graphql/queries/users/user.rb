module Queries
  module Users
    class User < Queries::BaseQuery
      description "Load one user"

      argument  :id, ID, required: true

      type Types::UserType, null: false

      def resolve(id:)
        ::User.find(id)
      end
    end
  end
end
