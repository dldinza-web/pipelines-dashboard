module Mutations
  class DeleteUser < Mutations::BaseMutation
    null false

    argument :id, Integer, required: true

    field :errors, [String], null: false
    field :user, Types::UserType

    def resolve(id:)
      user = begin
        User.find(id)
      rescue StandardError
        nil
      end

      if user
        user.destroy

        {
          user:,
          errors: []
        }
      else
        {
          user: nil,
          errors: ["User not found"]
        }
      end
    end
  end
end
