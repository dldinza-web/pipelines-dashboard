module Queries
  module Projects
    class Projects < Queries::BaseQuery
      description 'List of Projects'

      type [Types::ProjectType], null: false

      def resolve
        Project.all
      end
    end
  end
end
