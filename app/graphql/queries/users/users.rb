module Queries
  module Users
    class Users < Queries::BaseQuery
      description "Load multile users"

      type [Types::UserType], null: false

      def resolve
        ::User.all
      end
    end
  end
end
