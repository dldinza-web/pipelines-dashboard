module Mutations
  module Projects
    class AddUserToProject < Mutations::BaseMutation
      null false

      argument :project_id, ID, required: true
      argument :username, String, required: true

      field :errors, [String], null: false
      field :project, Types::ProjectType

      def resolve(project_id:, username:)
        user = User.find_by(username:)
        project = begin
          Project.find(project_id)
        rescue StandardError
          nil
        end

        if user.blank?
          return {
            project: nil,
            errors: ['User not found']
          }
        end

        if project.blank?
          return {
            project: nil,
            errors: ['Project not found']
          }
        end

        project.users.push user
        project.save!
        project.reload

        {
          project:,
          errors: []
        }
      end
    end
  end
end
